import Link from "next/link";
import type { Product, UserProduct } from "@prisma/client";

type OrderWithProduct = UserProduct & { product: Product };

const OrderList = ({
  orders,
  showPayLink = false,
}: {
  orders: OrderWithProduct[];
  showPayLink?: boolean;
}) => {
  if (orders.length === 0) {
    return <p>Geen bestellingen</p>;
  }

  return (
    <div className="overflow-auto">
      <table className="striped">
        <thead>
          <tr>
            <th>Les</th>
            <th>Prijs</th>
            <th>Besteld op</th>
            <th>Betaald</th>
            <th>Betaald op</th>
            {showPayLink && <th>&nbsp;</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.product.name}</td>
              <td>
                {(order.price ?? order.product.price).toLocaleString("nl-BE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </td>
              <td>{order.createdAt.toLocaleDateString("nl-BE")}</td>
              <td>
                <input readOnly type="checkbox" checked={order.paid} />
              </td>
              <td>
                {order.paidAt ? order.paidAt.toLocaleDateString("nl-BE") : "-"}
              </td>
              {showPayLink && (
                <td>
                  {!order.paid && (
                    <Link href="/danslessen/bestellen">Betalen</Link>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
