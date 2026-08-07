"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { UserProduct, Product, User } from "@prisma/client";

type OrderWithProduct = UserProduct & {
  product: Partial<Product>;
};

const OrderAsignList = ({
  currentOrder,
  childAccounts,
}: {
  currentOrder: OrderWithProduct[];
  childAccounts: User[];
}) => {
  const [order, setOrder] = useState(currentOrder);
  const [assignments, setAssignments] = useState<Record<number, string>>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (childAccounts.length > 0) {
      const initialAssignments: Record<number, string> = {};
      order.forEach((item) => {
        // Keep a previously saved assignment (e.g. after a cancelled Mollie
        // payment brings the user back here) instead of resetting it.
        initialAssignments[item.id] = item.payedForUserId || childAccounts[0].id;
      });
      setAssignments(initialAssignments);
    }
  }, []);

  const isDoubleEntry = (userProductId: number) => {
    const userProduct = order.find((item) => item.id === userProductId);
    if (!userProduct) return false;

    const assignedUserId = assignments[userProductId];
    if (!assignedUserId) return false;

    const count = order.filter(
      (item) =>
        item.productId === userProduct.productId &&
        assignments[item.id] === assignedUserId,
    ).length;
    return count > 1;
  };

  const handleAssignmentChange = (userProductId: number, userId: string) => {
    setAssignments((prev) => ({
      ...prev,
      [userProductId]: userId,
    }));
  };

  const handleRemove = async (ids: number[]) => {
    toast
      .promise(axios.delete("/api/danser/cart", { data: { ids } }), {
        loading: "Verwijderen...",
        success: "Verwijderd!",
        error: "Er is iets misgegaan.",
      })
      .then(() => {
        setOrder(order.filter((item) => !ids.includes(item.id)));
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
  };

  const handleCheckout = async () => {
    if (order.some((item) => !assignments[item.id])) {
      toast.error("Wijs elke deelnemer toe voor je verder gaat.");
      return;
    }
    if (order.some((item) => isDoubleEntry(item.id))) {
      toast.error("Er zijn dubbele inschrijvingen. Wijzig deze eerst.");
      return;
    }
    setIsCheckingOut(true);
    try {
      const { data } = await axios.post("/api/danser/checkout", {
        assignments,
      });
      // A gratis order (only free products) has nothing to pay via Mollie.
      window.location.href = data.checkoutUrl || "/danslessen/bestellen/stap-3";
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("Er is iets misgegaan bij het starten van de betaling.");
      setIsCheckingOut(false);
    }
  };

  if (order.length === 0) {
    router.refresh();
  }
  return (
    <article>
      <header>
        <hgroup>
          <h1>Bestellen</h1>
          <p>Bestel in 3 stappen.</p>
        </hgroup>
      </header>
      <table className="table striped">
        <thead>
          <tr>
            <th>Deelnemer</th>
            <th>Activiteit</th>
            <th className="right">Prijs</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item) => (
            <tr key={item.id}>
              <td>
                <select
                  aria-invalid={isDoubleEntry(item.id)}
                  className="mt1"
                  onChange={(e) =>
                    handleAssignmentChange(item.id, e.target.value)
                  }
                  value={assignments[item.id] || ""}
                >
                  <option value="">-- Selecteer --</option>
                  {childAccounts.map((child) => (
                    <option
                      key={child.id}
                      selected={assignments[item.id] === child.id}
                      value={child.id}
                    >
                      {child.firstName} {child.lastName}
                    </option>
                  ))}
                </select>
                <small>
                  {isDoubleEntry(item.id) &&
                    "Dubbele inschrijving! Wijzig naam of verwijder lijn."}
                </small>
              </td>
              <td>
                <b>{item.product.name}</b>
              </td>
              <td className="right">€&nbsp;{item.product.price}</td>
              <td>
                <button onClick={() => handleRemove([item.id])}>
                  <img src="/icons/bin.svg" alt="Verwijderen" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="grid">
        <p className="mt1">
          <b>
            Totaal: €&nbsp;
            {order.reduce(
              (total, item) => total + (item.product.price || 0),
              0,
            )}
          </b>
        </p>
        <div>&nbsp;</div>
        <button
          className="secondary"
          onClick={() => handleRemove(order.map((item) => item.id))}
        >
          Verwijder alles
        </button>
        <button
          aria-busy={isCheckingOut}
          disabled={isCheckingOut}
          onClick={handleCheckout}
        >
          STAP 3
        </button>
      </footer>
    </article>
  );
};

export default OrderAsignList;
