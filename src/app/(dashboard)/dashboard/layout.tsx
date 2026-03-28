// src/app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import UserMenu from "./components/user_menu";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b bg-background p-4 flex justify-between items-center">
          <h1 className="text-xl font-medium">EventHub</h1>
          <UserMenu />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;