import Link from "next/link";
import { getLogtoId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import OrderList from "@/components/product/OrderList";

const MijnLessen = async () => {
  const logtoId = await getLogtoId();
  if (!logtoId) {
    return (
      <div className="container mt1">
        <article>
          <header>
            <hgroup>
              <h1>Mijn lessen</h1>
            </hgroup>
          </header>
          <p>
            U moet ingelogd zijn om deze pagina te bekijken.{" "}
            <Link href="/dashboard">Naar aanmeldpagina</Link>.
          </p>
        </article>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { logtoId },
    include: {
      userProductsFor: {
        orderBy: { createdAt: "desc" },
        include: { product: true },
      },
    },
  });

  return (
    <>
      <header className="container">
        <hgroup>
          <h1>Mijn lessen</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/danser">Danser</Breadcrumb>
            <Breadcrumb>Mijn lessen</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
      </header>
      <div className="container">
        <OrderList orders={user?.userProductsFor || []} showPayLink />
      </div>
    </>
  );
};

export default MijnLessen;
