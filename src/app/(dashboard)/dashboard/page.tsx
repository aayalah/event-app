// src/app/(dashboard)/page.tsx
"use client";
import { useState, useEffect } from 'react';
import EventCard from "./components/event_card";
import FilterBar from "./components/filter_bar";
import { useCurrentUser } from "@/lib/queries/users";
import { useLocationSearch } from "@/lib/queries/events";

type LocationSelection = { label: string; lat: number; lon: number; };
type LocationSearch = {
    lat: number;
    lon: number;
    radius: number;
};

const DashboardPage = () => {
  
  const {data: user, isLoading} = useCurrentUser();
  const [location, setLocation] = useState<LocationSelection | null>(null);

  const { data: events, isLoading: eventsLoading } = 
    useLocationSearch(
      location ? {
          lat: location.lat,
          lon: location.lon,
          radius: 10000,
      }: undefined
    );
  
  console.log(events);
  console.log(eventsLoading);

  const onLocationSelected = (location: LocationSelection | null) => {
    setLocation(location);
    if(!location){
      return;
    }
    
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
        <FilterBar onLocationSelected={onLocationSelected}/>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) =>  <EventCard key={event.id} title={event.name} categories={event.categories} date="2025-01-01" venue={event.venueName} city={event.venueCityName} />)}
      </div>
    </div>
  );
}

export default DashboardPage;