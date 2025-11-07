// src/app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/20 p-6 hidden md:block">
        <h2 className="text-lg font-semibold mb-6">My App</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block text-sm hover:text-primary">
            Overview
          </a>
          <a href="/dashboard/events" className="block text-sm hover:text-primary">
            Events
          </a>
          <a href="/dashboard/vendors" className="block text-sm hover:text-primary">
            Vendors
          </a>
          <a href="/dashboard/guests" className="block text-sm hover:text-primary">
            Guests
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b bg-background p-4 flex justify-between items-center">
          <h1 className="text-xl font-medium">Dashboard</h1>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}