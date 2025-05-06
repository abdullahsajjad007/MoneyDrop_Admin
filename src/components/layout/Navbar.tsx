import React, {useContext, useState} from "react";
import {Menu, Search, User} from "lucide-react";
import {NavbarProps} from "@/types/navigation";
import Sidebar from "./Sidebar";
import {Button} from "../ui/button";
import {useIsMobile} from "@/hooks/use-mobile";
import {Input} from "../ui/input";
import {Avatar, AvatarFallback} from "../ui/avatar";
import {AuthContext} from "@/contexts/AuthContext";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useNavigate} from "react-router-dom";

const Navbar = ({children}: NavbarProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const isMobile = useIsMobile();
	const {user, logout} = useContext(AuthContext);
	const isTablet = useIsMobile();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		window.location.href = "/signin";
	};

	return (
		<div className="min-h-screen bg-secondary">
			<div className="flex h-screen">
				{/* Sidebar */}
				<Sidebar
					open={!isMobile || sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				{/* Main content */}
				<div className="flex-1 flex flex-col min-h-screen">
					{/* Top bar */}
					<header className="h-16 flex items-center justify-between px-4 bg-white border-b">
						<div className="flex items-center flex-1 gap-4">
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								onClick={() => setSidebarOpen(true)}
							>
								<Menu className="h-6 w-6" />
							</Button>
							<div className="">
								<h1 className="text-xl font-semibold">Money Drop</h1>
							</div>
							<div className="hidden lg:flex lg:flex-1 max-w-xl">
								{/* <div className="relative w-full">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<Input
										type="search"
										placeholder="Search..."
										className="w-full pl-10"
									/>
								</div> */}
							</div>
						</div>

						{/* User Profile */}
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium hidden sm:block">
								{user?.email}
							</span>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className="cursor-pointer">
										<AvatarFallback>
											<User className="h-5 w-5" />
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="bg-white">
									<DropdownMenuItem onClick={handleLogout}>
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</header>

					{/* Mobile Search Bar */}
					{/* <div className="lg:hidden p-4 bg-white border-b">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								type="search"
								placeholder="Search..."
								className="w-full pl-10"
							/>
						</div>
					</div> */}

					{/* Page content */}
					<main className="flex-1 p-4 overflow-auto">{children}</main>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
