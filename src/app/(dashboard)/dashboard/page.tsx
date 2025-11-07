// src/app/(dashboard)/page.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here’s an overview of your activity.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-2">Upcoming Events</h2>
          <p className="text-sm text-muted-foreground mb-4">You have 3 events this week.</p>
          <Button variant="default">View All</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-2">Vendors</h2>
          <p className="text-sm text-muted-foreground mb-4">
            5 vendors have responded to your latest bids.
          </p>
          <Button variant="outline">Manage</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-2">Guests</h2>
          <p className="text-sm text-muted-foreground mb-4">
            10 confirmed, 2 awaiting responses.
          </p>
          <Button variant="default">View Guests</Button>
        </Card>
      </section>
    </div>
  );
}