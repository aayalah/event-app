// src/app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b bg-background p-4 flex justify-between items-center">
          <h1 className="text-xl font-medium">EventHub</h1>
          <Button variant="outline" size="sm">
            Du
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;