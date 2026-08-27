"use client";

import type { Desk, Chair } from "@/types";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { desks } from "@/data/desks";
import { OptionCard } from "@/components/ui/OptionCard";

export function DeskTab() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectDesk = useWorkspaceStore((state) => state.selectDesk);

  return (
    <div className="flex flex-col gap-3">
      {desks.map((desk) => (
        <OptionCard
          key={desk.id}
          item={desk}
          isSelected={selectedDesk?.id === desk.id}
          onSelect={selectDesk as (item: Desk | Chair) => void}
        />
      ))}
    </div>
  );
}
