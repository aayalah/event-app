// src/app/(dashboard)/page.tsx
"use client";
import { useState } from 'react';
import { format } from 'date-fns';
import EventCard from "./components/event_card";
import GroupCard from './components/group_card';
import FilterBar from "./components/filter_bar";
import { useCurrentUser } from "@/lib/queries/users";
import { useLocationSearch } from "@/lib/queries/events";
import { useLocationSearch as useGroupLocationSearch } from "@/lib/queries/groups";

type LocationSelection = { label: string; lat: number; lon: number; city: string | null; country: string | null };

const DashboardPage = () => {

  const {data: user, isLoading} = useCurrentUser();
  const [location, setLocation] = useState<LocationSelection | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [contentType, setContentType] = useState<"events" | "groups">("events");

  const { data: events } = useLocationSearch(
    location && contentType == "events" ? {
        lat: location.lat,
        lon: location.lon,
        radius: 10000,
        date: date ? format(date, 'yyyy-MM-dd') : undefined,
        category: category ?? undefined,
    } : undefined
  );

  const { data: groups } = useGroupLocationSearch(
    location && location.city && location.country  && contentType == "groups" ? {
      city: location.city,
      country: location.country,
      category: category ?? undefined,
    } : undefined
  );

  const onLocationSelected = (location: LocationSelection | null) => {
    setLocation(location);
  }

  if (isLoading || !user) {
    return (
      <div className="m-6">
        <div className="p-8">Loading…</div>
      </div>
    );
  }


  return (
    <div className="m-6">
      <div className="p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.full_name}! </h1>
          <p className="text-muted-foreground">
            Discover events and groups tailored for you
          </p>
        </header>
      </div>
      <div className="p-8 space-y-6">
        <FilterBar onLocationSelected={onLocationSelected} onDateSelected={setDate} onCategorySelected={setCategory} onContentTypeSelected={setContentType} defaultContentType={contentType}/>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentType === "events" && events?.map((event) =>  <EventCard key={event.id} title={event.name} categories={event.categories} date={event.startDate} venue={event.venueName} city={event.venueCityName} />)}
        {contentType === "groups" && groups?.map((group) => group.city && group.country &&  <GroupCard key={group.id} title={group.name} categories={group.categories} city={group.city} country={group.country} />)}
      </div>
    </div>
  );
}

export default DashboardPage;