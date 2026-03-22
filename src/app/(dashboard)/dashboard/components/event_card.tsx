import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";

type EventCardProps = {
    title: string
    categories: string[]
    date: string
    venue: string
    city: string
}

const EventCard = ({title, categories, date, venue, city}: EventCardProps) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                {categories.length > 0 && <Badge variant="outline">{categories[0]}</Badge>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{date ? format(parseISO(date.slice(0, 10)), 'MM/dd/yyyy') : "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{venue}, {city}</span>
                </div>
            </CardContent>
        </Card>
    ) 
}

export default EventCard;