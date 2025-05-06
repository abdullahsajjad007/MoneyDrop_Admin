import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {User} from "./columns";
import {useState} from "react";
import {toast} from "@/hooks/use-toast";
import {useIsMutating} from "@tanstack/react-query";
import {useUpdateUser} from "@/hooks";

interface UserProfileEditProps {
	user: User;
	isOpen: boolean;
	onClose: () => void;
}

const UserProfileEdit = ({user, isOpen, onClose}: UserProfileEditProps) => {
	const [formData, setFormData] = useState({
		first_name: user.first_name || "",
		last_name: user.last_name || "",
		email: user.email || "",
		gender: "Male",
		dob: user.date_of_birth || "",
		country: "",
		address: "",
	});

	const isLoading = useIsMutating();
	const {mutate} = useUpdateUser();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			mutate(
				{id: user.user_id, formData},
				{
					onSuccess: () => {
						onClose();
					},
				}
			);
		} catch (error) {
			toast({
				title: "Error",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle className="text-xl">Edit User Profile</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm text-gray-500">First Name</label>
							<Input
								value={formData.first_name}
								onChange={e =>
									setFormData({...formData, first_name: e.target.value})
								}
								placeholder="First Name"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm text-gray-500">Last Name</label>
							<Input
								value={formData.last_name}
								onChange={e =>
									setFormData({...formData, last_name: e.target.value})
								}
								placeholder="Last Name"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm text-gray-500">Email</label>
							<Input
								type="email"
								value={formData.email}
								onChange={e =>
									setFormData({...formData, email: e.target.value})
								}
								placeholder="sam@gmail.com"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm text-gray-500">Gender</label>
							<Select
								value={formData.gender}
								onValueChange={value =>
									setFormData({...formData, gender: value})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Male">Male</SelectItem>
									<SelectItem value="Female">Female</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label className="text-sm text-gray-500">DOB</label>
							<Input
								type="date"
								value={formData.dob}
								onChange={e => setFormData({...formData, dob: e.target.value})}
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm text-gray-500">Country</label>
							<Select
								value={formData.country}
								onValueChange={value =>
									setFormData({...formData, country: value})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="australia">Australia</SelectItem>
									<SelectItem value="usa">USA</SelectItem>
									<SelectItem value="uk">UK</SelectItem>
									<SelectItem value="nigeria">Nigeria</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm text-gray-500">Address</label>
						<Input
							value={formData.address}
							onChange={e =>
								setFormData({...formData, address: e.target.value})
							}
							placeholder="Enter Address"
						/>
					</div>

					<div className="mt-6">
						<label className="text-sm text-gray-500">
							Upload Profile Picture (Optional)
						</label>
						<div className="mt-2 flex items-center justify-between border rounded-md p-2">
							<Button
								type="button"
								variant="secondary"
								className="bg-green-950 text-white hover:bg-green-900"
							>
								Choose File
							</Button>
							<span className="text-sm text-gray-500">No file chosen</span>
						</div>
					</div>

					<div className="flex justify-start gap-4 mt-8">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							type="submit"
							loading={isLoading > 0}
							className="bg-green-950 text-white hover:bg-green-900"
						>
							Submit
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UserProfileEdit;
