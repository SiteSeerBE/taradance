import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import ProductFilter from "@/components/admin/ProductFilter";
import { RoleType } from "@prisma/client";

type SearchParams = Promise<{ productId?: string }>;

const DansersAdmin = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { productId } = await searchParams;
  const selectedProductId = productId
    ? Number.parseInt(productId, 10)
    : undefined;

  const products = await prisma.product.findMany({
    orderBy: { availableFrom: "desc" },
    select: { id: true, name: true },
  });

  const dansers = await prisma.user.findMany({
    where: { role: RoleType.DANSER },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    include: {
      userProductsFor: {
        where: selectedProductId ? { productId: selectedProductId } : undefined,
        orderBy: { createdAt: "desc" },
        include: { product: true },
      },
    },
  });

  // When filtering by a specific lesson, only show dansers who actually have an order for it.
  const visibleDansers = selectedProductId
    ? dansers.filter((danser) => danser.userProductsFor.length > 0)
    : dansers;

  return (
    <>
      <header className="container-fluid">
        <hgroup>
          <h1>Dansers</h1>
          <Breadcrumbs>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/admin">Administratie</Breadcrumb>
            <Breadcrumb>Dansers</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
        <ProductFilter
          products={products}
          selectedProductId={selectedProductId}
        />
      </header>

      <div className="overflow-auto">
        <table className="striped">
          <thead>
            <tr>
              <th>Voornaam</th>
              <th>Achternaam</th>
              <th>E-mail</th>
              <th>Les</th>
              <th>Prijs</th>
              <th>Besteld op</th>
              <th>Betaald</th>
              <th>Betaald op</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {visibleDansers.map((danser) =>
              danser.userProductsFor.length === 0 ? (
                <tr key={danser.id}>
                  <td>{danser.firstName}</td>
                  <td>{danser.lastName}</td>
                  <td>{danser.email}</td>
                  <td colSpan={4}>Geen bestellingen</td>
                  <td style={{ minWidth: "60px" }}>
                    <Link href={`/admin/gebruikers/${danser.id}`}>Bekijk</Link>
                  </td>
                </tr>
              ) : (
                danser.userProductsFor.map((userProduct, index) => (
                  <tr key={userProduct.id}>
                    <td>{index === 0 ? danser.firstName : ""}</td>
                    <td>{index === 0 ? danser.lastName : ""}</td>
                    <td>{index === 0 ? danser.email : ""}</td>
                    <td>{userProduct.product.name}</td>
                    <td>
                      {(
                        userProduct.price ?? userProduct.product.price
                      ).toLocaleString("nl-BE", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </td>
                    <td>{userProduct.createdAt.toLocaleDateString("nl-BE")}</td>
                    <td>
                      <input
                        readOnly
                        type="checkbox"
                        checked={userProduct.paid}
                      />
                    </td>
                    <td>
                      {userProduct.paidAt
                        ? userProduct.paidAt.toLocaleDateString("nl-BE")
                        : "-"}
                    </td>
                    <td style={{ minWidth: "60px" }}>
                      {index === 0 && (
                        <Link href={`/admin/gebruikers/${danser.id}`}>
                          Bekijk
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DansersAdmin;
