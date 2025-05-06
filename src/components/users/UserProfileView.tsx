import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {User} from "./columns";
import {Phone, Mail} from "lucide-react";
import {Badge} from "../ui/badge";

interface UserProfileViewProps {
	user: User;
	isOpen: boolean;
	onClose: () => void;
}

const UserProfileView = ({user, isOpen, onClose}: UserProfileViewProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle className="text-xl">User Profile</DialogTitle>
				</DialogHeader>

				<div className="mt-6">
					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex-shrink-0">
							{/* {user.profile_image_url ? (
								<img
									src={user?.profile_image_url}
									alt={`${user?.first_name} ${user?.last_name}`}
									className="w-24 h-24 rounded-full object-cover"
								/>
							) : ( */}
							<div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl">
								{user?.first_name.charAt(0).toUpperCase()}
							</div>
							{/* )} */}
						</div>

						<div className="flex space-y-6 gap-8">
							<div className="flex flex-col">
								<div className="flex flex-col">
									<p className="text-sm text-gray-500">First Name:</p>
									<p className="text-lg font-medium">
										{user?.first_name.split(" ")[0]}
									</p>
								</div>

								<div className="flex flex-col">
									<p className="text-sm text-gray-500">Last Name:</p>
									<p className="text-lg font-medium">{user?.last_name}</p>
								</div>
							</div>
							<div className="flex">
								<div className="flex flex-col gap-4">
									<div className="flex gap-2">
										<Phone className="w-5 h-5 text-gray-500" />
										<span>{user?.phone_number || ""}</span>
									</div>
									<div className="flex gap-2">
										<Mail className="w-5 h-5 text-gray-500" />
										<span>{user?.email}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
						<div>
							<p className="text-sm text-gray-500">Stickers Found</p>
							<p className="text-lg font-medium">{user?.stickers_found}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Role</p>
							<p className="text-lg font-medium">{user?.role}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Created</p>
							<p className="text-lg font-medium">
								{user?.account_creation_date}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Last Login</p>
							<p className="text-lg font-medium">{user?.last_login}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Last Logout</p>
							<p className="text-lg font-medium">{user?.last_logout}</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
						<div>
							<p className="text-sm text-gray-500">Gender</p>
							<p className="text-lg font-medium">{user?.gender}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">DOB</p>
							<p className="text-lg font-medium">{user?.date_of_birth}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Country</p>
							<p className="text-lg font-medium">{user?.country || ""}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Deactivated</p>
							<Badge
								className={
									user?.deactivated
										? "bg-red-100 text-red-800"
										: "bg-green-100 text-green-800"
								}
							>
								{user?.deactivated ? "Deactivated" : "Active"}
							</Badge>
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-4 mt-8">
					<Button
						variant="secondary"
						className="bg-gray-800 text-white hover:bg-gray-900"
						onClick={onClose}
					>
						Close
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UserProfileView;
