"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";

interface ProductTableProps {
    products: ({ id: number; price: number } & Partial<Product>)[];
    orderForUsers: { id: string; firstName: string | null; lastName: string | null }[];
}

const ProductTable = ({ products, orderForUsers }: ProductTableProps) => {
    const router = useRouter();
    const [quantities, setQuantities] = useState<Map<number, number>>(new Map());
    const [isLoading, setIsLoading] = useState(false);
    const maxQuantity = Math.max(orderForUsers.length, 1);

    const updateQuantity = (productId: number, newQuantity: number) => {
        const newQuantities = new Map(quantities);
        if (newQuantity === 0) {
            newQuantities.delete(productId);
        } else {
            newQuantities.set(productId, newQuantity);
        }
        setQuantities(newQuantities);
    };

    const calculateTotal = () => {
        let total = 0;
        products.forEach((product) => {
            const quantity = quantities.get(product.id) || 0;
            total += product.price * quantity;
        });
        return total.toFixed(2);
    };

    const addToCart = async () => {
        setIsLoading(true);
        const items = Array.from(quantities.entries()).map(([productId, quantity]) => ({
            productId,
            quantity,
        }));

        try {
            await axios.post("/api/danser/cart", items);
            router.refresh();
        } catch (error) {
            console.error("Error adding to cart:", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <>
            <div className="container mt1">
                <article>
                    <header>
                        <hgroup>
                            <h1>Bestellen</h1>
                            <p>Jij kan bestellen voor:</p>
                        </hgroup>
                        <ul>
                            {orderForUsers.map((user) => (
                                <li key={user.id}>
                                    {user.firstName} {user.lastName}
                                </li>
                            ))}
                        </ul>
                    </header>
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>Aantal</th>
                                <th>Activiteit</th>
                                <th className="right">Prijs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                const quantity = quantities.get(product.id) || 0;
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <select
                                                className="mt1"
                                                onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                                style={{ minWidth: "5em" }}
                                                value={quantity}
                                            >
                                                {Array.from({ length: maxQuantity + 1 }, (_, n) => n).map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <b>{product.name}</b>
                                            <p>{product.description}</p>
                                        </td>
                                        <td className="right">€&nbsp;{product.price.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <footer className="grid">
                        <p><b>Totaal: €&nbsp;{calculateTotal()}</b></p><div>&nbsp;</div>
                        <button aria-busy={isLoading} disabled={isLoading || quantities.size === 0} onClick={() => addToCart()}>STAP 2</button>
                    </footer>
                </article>
            </div>
        </>
    );
};

export default ProductTable;