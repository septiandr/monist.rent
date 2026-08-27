"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { accessories } from "@/data/accessories";
import { AccessoryToggle } from "@/components/ui/AccessoryToggle";

const MONITOR_IDS = ["acc-ultrawide-monitor", "acc-dual-monitor"];

export function AccessoryTab() {
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
  const toggleAccessory = useWorkspaceStore((state) => state.toggleAccessory);

  const selectedMonitorId = selectedAccessories.find((a) =>
    MONITOR_IDS.includes(a.id)
  )?.id;

  return (
    <div className="flex flex-col gap-3">
      {accessories.map((accessory) => {
        const isSelected = selectedAccessories.some(
          (a) => a.id === accessory.id
        );
        const isMonitor = MONITOR_IDS.includes(accessory.id);
        const isDisabled =
          isMonitor && selectedMonitorId !== undefined && selectedMonitorId !== accessory.id;

        return (
          <AccessoryToggle
            key={accessory.id}
            accessory={accessory}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onToggle={toggleAccessory}
          />
        );
      })}
    </div>
  );
}
