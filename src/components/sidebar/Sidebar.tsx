"use client"

import { ChevronsLeft, ChevronsRight, Home, Settings2, ShieldCheck, ShieldUser, Users} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,  SidebarGroupLabel,  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { Separator } from "../ui/separator";
import { SidebarUserProfile } from "./user-profile";


const items = [
	{
		title: "Dashboard",
		url: "#",
		icon: Home,
	},
	{
		title: "Users",
		url: "/dashboard/users",
		icon: Users,
	},
	{
		title: "Roles",
		url: "#",
		icon: ShieldUser,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings2,
	},
];

export const AppSidebar = () => {
	const { state, toggleSidebar } = useSidebar();

	return (
		<Sidebar collapsible="icon" variant="sidebar">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center justify-between pl-1">
						<ShieldCheck className="h-10 w-10"/>
						<h1 className="truncate font-semibold text-2xl">Admin</h1>
						<div className="pr-2 hover:cursor-pointer">
							{state === "expanded" ? (
								<ChevronsLeft onClick={toggleSidebar} size={25} />
							) : (
								<ChevronsRight onClick={toggleSidebar} size={25} />
							)}
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild tooltip={item.title}>
										<a href={item.url}>
											<item.icon />
											<span className="text-base font-medium">{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarUserProfile />
			</SidebarFooter>
		</Sidebar>
	);
};