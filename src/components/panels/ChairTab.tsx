"use client";

import type { Desk, Chair } from "@/types";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { chairs } from "@/data/chairs";
import { OptionCard } from "@/components/ui/OptionCard";

export function ChairTab() {
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectChair = useWorkspaceStore((state) => state.selectChair);

  return (
    <div className="flex flex-col gap-3">
      {chairs.map((chair) => (
        <OptionCard
          key={chair.id}
          item={chair}
          isSelected={selectedChair?.id === chair.id}
          onSelect={selectChair as (item: Desk | Chair) => void}
        />
      ))}
    </div>
  );
}
