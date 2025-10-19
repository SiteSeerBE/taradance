"use client";

import React, { useState } from "react";

type Props = {
  id: number;
  initial: number;
};

export default function MenuOrderSelect({ id, initial }: Props) {
  const [value, setValue] = useState<number>(initial);
  const [saving, setSaving] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newOrder = Number(e.target.value);
    setValue(newOrder);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/menu/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, order: newOrder }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to update menu order:", text);
      }
    } catch (err) {
      console.error("Failed to update menu order:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select value={value} onChange={handleChange} disabled={saving}>
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
}
