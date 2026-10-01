"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { accessories } from "@/data/accessories";
import { AccessoryToggle } from "@/components/ui/AccessoryToggle";

export function AccessoryTab() {
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const toggleAccessory = useWorkspaceStore((state) => state.toggleAccessory);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between pb-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Workspace Add-ons & Tech
        </p>
        <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
          {selectedAccessories.length} terpilih
        </span>
      </div>

      {accessories.map((accessory) => {
        const isSelected = selectedAccessories.some(
          (a) => a.id === accessory.id
        );

        return (
          <AccessoryToggle
            key={accessory.id}
            accessory={accessory}
            isSelected={isSelected}
            isDisabled={false}
            onToggle={toggleAccessory}
          />
        );
      })}
    </div>
  );
}
