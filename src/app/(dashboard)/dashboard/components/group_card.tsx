import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

type GroupCardProps = {
    title: string
    categories: string[]
    city: string
    country: string
}

const GroupCard = ({title, categories, city, country}: GroupCardProps) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                {categories.length > 0 && <Badge variant="outline">{categories[0]}</Badge>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{city}, {country}</span>
                </div>
            </CardContent>
        </Card>
    ) 
}

export default GroupCard;
