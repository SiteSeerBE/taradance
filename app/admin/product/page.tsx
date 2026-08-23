import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LinkButton } from "@/components/buttons";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const ProductAdmin: React.FC = async () => {
  const products = await prisma.product.findMany({
    orderBy: { availableFrom: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      availableFrom: true,
      availableTo: true,
    },
  });

  return (
    <>
      <header className="container-fluid">
        <hgroup>
          <h1>Producten</h1>
          <Breadcrumbs>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/admin">Administratie</Breadcrumb>
            <Breadcrumb>Producten</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
        <LinkButton label="Product toevoegen" href="/admin/product/0" />
      </header>

      <div className="overflow-auto">
        <table className="striped">
          <thead>
            <tr>
              <th>Naam</th>
              <th>Prijs</th>
              <th>Beschikbaar vanaf</th>
              <th>Beschikbaar tot</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {item.price.toLocaleString("nl-BE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
                <td>{item.availableFrom.toLocaleDateString("nl-BE")}</td>
                <td>{item.availableTo.toLocaleDateString("nl-BE")}</td>
                <td style={{ minWidth: "60px" }}>
                  <Link href={`/admin/product/${item.id}`}>
                    <img src="/icons/edit.svg" alt="Bewerken" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductAdmin;
