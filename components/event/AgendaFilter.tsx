"use client";

import { useState } from "react";
import Link from "next/link";
import DayItem from "./DayItem";

type EventItem = {
  id: number;
  date: Date;
    timeStart?: string | null;
  title: string;
  tag?: { name: string; color?: string | null } | null;
};

type AgendaFilterProps = {
  events: EventItem[];
  initialTag?: number | null;
  tags: { id: number; name: string }[];
};

const AgendaFilter: React.FC<AgendaFilterProps> = ({ events, initialTag = null, tags }) => {
  const [activeTag, setActiveTag] = useState<number | null>(initialTag);

  const filtered =
    activeTag === null
      ? events
      : events.filter((e) => e.tag?.name === tags.find((t) => t.id === activeTag)?.name);

  return (
    <>
      {tags.length > 0 && (
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <button
              className={activeTag === null ? "primary" : "secondary"}
              onClick={() => setActiveTag(null)}
              type="button"
            >
              Alle
            </button>
            {tags.map((tag) => (
              <button
                className={activeTag === tag.id ? "primary" : "secondary"}
                key={tag.id}
                onClick={() => setActiveTag(activeTag === tag.id ? null : tag.id)}
                type="button"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="container">
        <div className="row">
          {filtered.map((item) => (
            <Link key={item.id} href={`/agenda/${item.id}`} className="col-xs-12 col-md-6">
              <DayItem date={item.date} tag={item.tag?.name} tagColor={item.tag?.color} timeStart={item.timeStart} title={item.title} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AgendaFilter;
