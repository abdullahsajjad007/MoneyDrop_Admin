import React, {useContext} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
	Home,
	Bell,
	CreditCard,
	Tag,
	Users,
	Upload,
	Settings,
	UserCircle,
	LogOut,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {AuthContext} from "@/contexts/AuthContext";

interface SidebarProps {
	open: boolean;
	onClose: () => void;
}

const navItems = [
	{icon: Home, label: "Dashboard", href: "/dashboard"},
	{icon: Bell, label: "Notifications", href: "/notifications"},
	{icon: CreditCard, label: "Payments", href: "/payments"},
	{icon: Tag, label: "Discount codes", href: "/discount-codes"},
	{icon: Users, label: "Users", href: "/users"},
	{icon: Upload, label: "Sticker Submission", href: "/sticker-submission"},
	{icon: Settings, label: "Fees Settings", href: "/fees-settings"},
	{icon: UserCircle, label: "Profile", href: "/profile"},
	{icon: LogOut, label: "Logout", href: "/", action: "logout"},
];

const Sidebar = ({open, onClose}: SidebarProps) => {
	const location = useLocation();
	const {user, logout} = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		window.location.href = "/signin";
	};

	return (
		<>
			{/* Overlay */}
			{open && (
				<div
					className="fixed inset-0 bg-black/50 md:hidden z-40"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed md:static inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-200 ease-in-out lg:transform-none",
					!open && "-translate-x-full"
				)}
				style={{overflowY: "auto"}}
			>
				{/* Logo */}
				<div className="h-16 flex items-center px-6 bg-primary-hover">
					<h1 className="text-xl font-bold text-white">Money Drop</h1>
				</div>

				{/* Navigation */}

				<nav className="p-4 space-y-2">
					{navItems.map(item => (
						<Link
							key={item.href}
							to={item.href}
							className={cn(
								"flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
								location.pathname === item.href
									? "bg-primary-hover text-white"
									: "text-gray-300 hover:bg-primary-hover hover:text-white"
							)}
							onClick={() => {
								if (item.action === "logout") {
									handleLogout();
								}
								onClose();
							}}
						>
							<item.icon className="h-5 w-5" />
							<span>{item.label}</span>
						</Link>
					))}
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
