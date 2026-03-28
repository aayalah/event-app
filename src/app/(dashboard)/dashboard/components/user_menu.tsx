"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/lib/queries/login";
import { useCurrentUser } from "@/lib/queries/users";

const getInitials = (fullName: string): string => {
    const words = fullName.trim().split(/\s+/);
    const first = words[0]?.[0] ?? '';
    const last = words.length > 1 ? words[words.length - 1][0] : '';
    return (first + last).toUpperCase();
};

const UserMenu = () => {
    const { data: user } = useCurrentUser();
    const { mutate: logout } = useLogout();

    const initials = user?.full_name ? getInitials(user.full_name) : '...';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">{initials}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => logout()}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
