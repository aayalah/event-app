import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"

type LocationSelection = { label: string; lat: number; lon: number };
type FilterBarProps = {
  onLocationSelected?: (loc: LocationSelection) => void;
};

const NOMINATIM_URL = 
    "https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=1&q=";

const FilterBar = ({ onLocationSelected }: FilterBarProps) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<LocationSelection[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<LocationSelection | null>(null);


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
                }>;

                setSuggestions(
                    data.map((item) => ({
                        label: item.display_name,
                        lat: Number(item.lat),
                        lon: Number(item.lon),
                    }))
                );

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
            (pos) => {
                const loc: LocationSelection = {
                    label: "Current Location",
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                };
                handleSelect(loc);
            },
            (err) => {
                console.warn("Geolocation error:", err);
            }
        );
    };

    return (
        <div className="flex flex-row gap-4">
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
            <div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-180px">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default FilterBar;