import { ChevronsUpDown } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const user = {
	name: "shadcn",
	email: "m@example.com",
	image: "https://avatars.githubusercontent.com/u/69845074",
};

export const SidebarUserProfile = () => {

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size={"lg"}>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.image!} alt={user.name!} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<h1 className="truncate font-semibold">{user.name}</h1>
								<h1 className="truncate text-xs">{user.email}</h1>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="rounded-lg" side={"top"} sideOffset={4} align="end">
						<DropdownMenuItem>Log Out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};