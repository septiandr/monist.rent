import type { ReactNode } from "react";

interface SplitLayoutProps {
  controls: ReactNode;
  preview: ReactNode;
}

export function SplitLayout({ controls, preview }: SplitLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-0">
      <div className="w-full lg:w-[40%] overflow-y-auto p-4 lg:p-6">
        {controls}
      </div>
      <div className="w-full lg:w-[60%] p-4 lg:p-6">
        {preview}
      </div>
    </div>
  );
}
