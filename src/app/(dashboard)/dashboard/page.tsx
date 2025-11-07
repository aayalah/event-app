// src/app/(dashboard)/page.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

const DashboardPage = () => {
  return (
    <div className="m-6">
      <div className="p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back, Demo User! </h1>
          <p className="text-muted-foreground">
            Discover events and groups tailored to for you
          </p>
        </header>
      </div>
      <div className="p-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid max-w-[135px] grid-cols-2">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          <TabsContent value="events">
            <p>Events</p>
          </TabsContent>
          <TabsContent value="groups">
            <p>Groups</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DashboardPage;