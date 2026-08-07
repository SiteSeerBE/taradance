import Link from "next/link";
import { getLogtoId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import type { UserProduct, Product } from "@prisma/client";

import ProductTable from "@/components/product/ProductTable";
import OrderAsignList from "@/components/product/OrderAsignList";

type OrderWithProduct = UserProduct & {
  product: Partial<Product>;
};

const Bestellen = async () => {
  const logtoId = await getLogtoId();
  if (!logtoId) {
    return (
      <div className="container mt1">
        <article>
          <header>
            <hgroup>
              <h1>Bestellen</h1>
              <p>Bestel in 3 stappen.</p>
            </hgroup>
          </header>
          <p>
            U moet ingelogd zijn om lessen te bestellen.{" "}
            <Link href="/dashboard">Naar aanmeldpagina</Link>.
          </p>
        </article>
      </div>
    );
  }
  // user is logged in
  const currentOrder = await prisma.userProduct.findMany({
    include: {
      product: {
        select: {
          price: true,
          name: true,
          description: true,
        },
      },
    },
    where: {
      user: { logtoId },
      paid: false,
    },
  });
  if (currentOrder.length == 0) {
    return <OrderStepOne />;
  }
  return <OrderStepTwo currentOrder={currentOrder} logtoId={logtoId} />;
};

const OrderStepOne = async () => {
  const availableProducts = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
    where: {
      availableFrom: {
        lte: new Date(),
      },
      availableTo: {
        gte: new Date(),
      },
    },
  });

  return <ProductTable products={availableProducts} />;
};

const OrderStepTwo = async ({
  currentOrder,
  logtoId,
}: {
  currentOrder: OrderWithProduct[];
  logtoId: string;
}) => {
  const childAccounts = await prisma.user.findMany({
    where: {
      OR: [{ parentAccount: { logtoId } }, { logtoId }],
    },
    orderBy: {
      parentAccountId: "desc",
    },
  });
  return (
    <div className="container mt1">
      <OrderAsignList
        currentOrder={currentOrder}
        childAccounts={childAccounts}
      />
    </div>
  );
};

export default Bestellen;
