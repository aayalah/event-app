import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, MapPin, CalendarIcon, X } from "lucide-react"
import { format } from "date-fns";
import { useCategories } from "@/lib/queries/categories";

type LocationSelection = { label: string; lat: number; lon: number, city: string | null, country: string | null };
type FilterBarProps = {
  onLocationSelected?: (loc: LocationSelection) => void;
  onDateSelected?: (date: Date | null) => void;
  onCategorySelected?: (category: string | null) => void;
  onContentTypeSelected?: (type: "events" | "groups") => void;
  defaultContentType: string;
};

const NOMINATIM_URL =
    "https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=1&q=";


type Place = {
    city: string | null;
    country: string | null;
}

const latLonToCityCountry = async (lat: number, lon: number): Promise<Place> => {

    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.set("addressdetails", "1");

    const res = await fetch(url.toString(), {
        headers: {
            Accept: "application/json",
        },
    });

    if (!res.ok) throw new Error("Reverse geocoding failed");
    
    const data = await res.json();

    const a = data.address ?? {};

    const city = 
        a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? null;

    const country  = a.country ?? null;

    return { city, country };
}

const FilterBar = ({ onLocationSelected, onDateSelected, onCategorySelected, onContentTypeSelected, defaultContentType }: FilterBarProps) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<LocationSelection[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<LocationSelection | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const { data: categories } = useCategories();

    const [contentType, setContentType] = useState<"events" | "groups">(defaultContentType as ("events" | "groups"));

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const timer = window.setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(NOMINATIM_URL + encodeURIComponent(query));
                const data = (await res.json()) as Array<{
                    display_name: string;
                    lat: string;
                    lon: string;
                    city?: string;
                    country?: string;
                    address?: { city?: string, country?: string, town?: string, village?: string, municipality?: string, county?: string };
                }>;

                setSuggestions(
                    data.map((item) => ({
                        label: item.display_name,
                        lat: Number(item.lat),
                        lon: Number(item.lon),
                        city:  item.address?.city ?? item.address?.town ?? item.address?.village ?? item.address?.municipality ?? item.address?.county ?? null,
                        country: item?.address?.country || null,
                    }))
                );

            } catch {
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => window.clearTimeout(timer);
    }, [query]);

    const handleSelect = (loc: LocationSelection) => {
        setSelected(loc);
        setQuery(loc.label);
        setSuggestions([]);
        onLocationSelected?.(loc);
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const place = await latLonToCityCountry(pos.coords.latitude, pos.coords.longitude);

                    const loc: LocationSelection = {
                        label: "Current Location",
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                        city: place.city,
                        country: place.country,
                    };
                    handleSelect(loc);

                } catch {
                    const loc: LocationSelection = {
                        label: "Current Location",
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                        city: null,
                        country: null,
                    };
                    handleSelect(loc);
                }

            },
            (err) => {
                console.warn("Geolocation error:", err);
            }
        );
    };

    const handleDateSelect = (selected: Date | undefined) => {
        const value = selected ?? null;
        setDate(value);
        setCalendarOpen(false);
        onDateSelected?.(value);
    };

    const handleClearDate = () => {
        setDate(null);
        onDateSelected?.(null);
    };

    const handleContentTypeChange = (value: string) => {
        if (!value) return;
        const next = value as "events" | "groups";
        setContentType(next);
        onContentTypeSelected?.(next);
    }

    return (
        <div className="flex flex-row gap-4 items-start">
            <div>
                <ToggleGroup
                    type="single"
                    value={contentType}
                    onValueChange={handleContentTypeChange}
                    className="justify-start"
                >
                    <ToggleGroupItem value="events" aria-label="Show events">Events</ToggleGroupItem>
                    <ToggleGroupItem value="groups" aria-label="Show groups">Groups</ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="space-y-2">
                <div className="flex gap-2 items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for a location"
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline" size="icon" onClick={handleCurrentLocation}>
                        <MapPin className="h-4 w-4" />
                    </Button>
                </div>

                {loading && <div className="text-sm text-muted-foreground">Loading…</div>}

                {suggestions.length > 0 && (
                    <ul className="rounded-md border bg-background shadow-sm">
                        {suggestions.map((loc) => (
                            <li
                                key={`${loc.lat}-${loc.lon}`}
                                className="cursor-pointer px-3 py-2 hover:bg-accent/50"
                                onClick={() => handleSelect(loc)}
                            >
                                {loc.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex gap-2 items-center">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[160px] justify-start gap-2 text-left font-normal">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            {date ? format(date, "MMM d, yyyy") : <span className="text-muted-foreground">Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={date ?? undefined}
                            onSelect={handleDateSelect}
                        />
                    </PopoverContent>
                </Popover>
                {date && (
                    <Button variant="ghost" size="icon" onClick={handleClearDate}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div>
                <Select defaultValue="all" onValueChange={(val) => onCategorySelected?.(val === "all" ? null : val)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories?.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default FilterBar;
