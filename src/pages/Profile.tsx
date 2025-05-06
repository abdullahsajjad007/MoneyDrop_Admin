import React, {useContext, useEffect} from "react";
import Navbar from "@/components/layout/Navbar";
import {Button} from "@/components/ui/button";
import {Phone, Mail, MapPin, Lock, ArrowLeft, Eye, EyeOff} from "lucide-react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
// import {AuthContext} from "@/contexts/AuthContext";
import {useChangePassword} from "@/hooks/auth";
import {useIsMutating} from "@tanstack/react-query";
import {userProps} from "@/interface";
import {DialogTitle} from "@radix-ui/react-dialog";
import {useUpdateUser} from "@/hooks";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {Country, State, City} from "country-state-city";
import {ICountry, IState, ICity} from "country-state-city";
import {AuthContext} from "@/contexts/AuthContext";
import {getStoredUser} from "@/storage";

const Profile = () => {
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const {toast} = useToast();
	const isLoading = useIsMutating();
	const isLoadingProfile = useIsMutating();

	const {mutate: ChangePass} = useChangePassword();
	const {mutate: updateMe} = useUpdateUser();
	// console.log(State.getAllStates())

	// Mock user data
	// const user = {
	//   firstName: "Sam",
	//   lastName: "Daniel",
	//   email: "sam@gmail.com",
	//   phone: "+234 8080006321",
	//   country: "Australia",
	//   registeredOn: "22-03-2023 13:05",
	//   lastLogin: "22-03-2023 13:05",
	//   lastLogout: "22-03-2023 13:05",
	// };

	const {user} = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState<userProps | null>(null);
	const countries = Country.getAllCountries(); // Fetch all countries
	const data = getStoredUser();

	// console.log(data, "users");
	useEffect(() => {
		if (user) {
			setUserDetails(user as userProps);
		}
	}, [user]);
	// console.log(user, "in profile");

	const handlePasswordChange = (e: React.FormEvent) => {
		e.preventDefault();

		const FormData = {old_password: oldPassword, new_password: newPassword};

		ChangePass(FormData, {
			onSuccess: () => {
				setShowPasswordModal(false);
			},
		});
	};

	const handleProfileUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			updateMe(
				{id: user.user_id, formData},
				{
					onSuccess: () => {
						setShowEditModal(false);
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

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		gender: "",
		date_of_birth: "",
		phone_number: "",
		country: "",
		address: "",
	});

	useEffect(() => {
		if (userDetails) {
			setFormData({
				first_name: userDetails.first_name || "",
				last_name: userDetails.last_name || "",
				email: userDetails.email || "",
				gender: userDetails.gender || "",
				date_of_birth: userDetails.date_of_birth || "",
				phone_number: userDetails.phone_number || "",
				country: userDetails.country || "",
				address: userDetails.address || "",
			});
		}
	}, [userDetails]);

	// const handleProfileUpdate = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	toast({
	// 		title: "Profile updated",
	// 		description: "Your profile has been successfully updated.",
	// 	});
	// 	setShowEditModal(false);
	// };

	return (
		<Navbar>
			<div className="max-w-7xl mx-auto p-6 space-y-8">
				{/* Profile Header */}
				<div className="bg-white rounded-lg p-6 shadow-sm">
					<div className="text-center mb-6">
						<h1 className="text-2xl font-semibold">
							User : {userDetails?.role || ""}
						</h1>
					</div>

					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex flex-col md:flex-row md:flex-1 gap-8">
							<div className="flex-shrink-0">
								<div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
									{userDetails?.first_name.charAt(0)}
								</div>
							</div>

							<div className="flex-grow space-y-6">
								<div className="flex flex-col md:flex-row gap-14">
									<div className="flex flex-col space-y-4">
										<div>
											<p className="text-sm text-gray-500">First Name:</p>
											<p className="text-lg font-medium">
												{userDetails?.first_name}
											</p>
										</div>

										<div>
											<p className="text-sm text-gray-500">Last Name:</p>
											<p className="text-lg font-medium">
												{userDetails?.last_name}
											</p>
										</div>
									</div>
								</div>

								<Button
									onClick={() => setShowEditModal(true)}
									className="w-full md:w-auto bg-red-700 hover:bg-red-800"
								>
									Edit personal information
								</Button>
							</div>
						</div>

						<div className="flex flex-col md:flex-1 gap-4">
							<div className="flex gap-2">
								<Phone className="w-5 h-5 text-gray-500" />
								<span>{userDetails?.phone_number}</span>
							</div>
							<div className="flex gap-2">
								<Mail className="w-5 h-5 text-gray-500" />
								<span>{userDetails?.email}</span>
							</div>
							{userDetails?.country && (
								<div className="flex items-center gap-2">
									<MapPin className="w-5 h-5 text-gray-500" />
									<span>{userDetails?.country}</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row md:space-x-4">
					{/* Login Details Section */}
					<div className="bg-white rounded-lg p-6 shadow-sm flex-1 mb-4 md:mb-0">
						<div className="flex items-center gap-2 mb-4">
							<Lock className="w-5 h-5" />
							<h2 className="text-xl font-semibold">Login Details</h2>
						</div>

						<div className="space-y-4">
							<div>
								<p className="text-sm text-gray-500">Email:</p>
								<p className="font-medium">{userDetails?.email}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Password:</p>
								<p className="font-medium">*********</p>
							</div>
							<Button
								variant="secondary"
								onClick={() => setShowPasswordModal(true)}
								className="bg-red-700 text-white hover:bg-red-800"
							>
								Change Password
							</Button>
						</div>
					</div>

					{/* Pinned Information */}
					<div className="bg-white rounded-lg p-6 shadow-sm flex-1">
						<h2 className="text-xl font-semibold mb-4">📌 Pinned</h2>
						<div className="space-y-4">
							<div>
								<p className="text-sm text-gray-500">Registered on:</p>
								<p className="font-medium">
									{userDetails?.account_creation_date}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Last Login:</p>
								<p className="font-medium">{userDetails?.last_login}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Last Logout:</p>
								<p className="font-medium">{userDetails?.last_logout}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Password Change Modal */}
				<Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
					<DialogContent className="sm:max-w-[500px]">
						<div className="space-y-6">
							<h2 className="text-2xl font-semibold">Change password</h2>
							<p className="text-gray-600">
								To ensure maximum security for your account, type in your
								existing password to continue.
							</p>

							<form onSubmit={handlePasswordChange} className="space-y-6">
								<div className="space-y-4">
									<div className="relative">
										<label className="text-sm text-gray-500">
											Existing Password
										</label>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												className="w-full pr-10"
												placeholder="Enter your current password"
												id="oldPassword"
												value={oldPassword}
												onChange={e => setOldPassword(e.target.value)}
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2"
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4 text-gray-500" />
												) : (
													<Eye className="h-4 w-4 text-gray-500" />
												)}
											</button>
										</div>
									</div>

									<div className="relative">
										<label className="text-sm text-gray-500">
											New Password
										</label>
										<div className="relative">
											<Input
												type={showNewPassword ? "text" : "password"}
												className="w-full pr-10"
												placeholder="Enter your new password"
												id="newPassword"
												value={newPassword}
												onChange={e => setNewPassword(e.target.value)}
											/>
											<button
												type="button"
												onClick={() => setShowNewPassword(!showNewPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2"
											>
												{showNewPassword ? (
													<EyeOff className="h-4 w-4 text-gray-500" />
												) : (
													<Eye className="h-4 w-4 text-gray-500" />
												)}
											</button>
										</div>
									</div>

									<div className="space-y-2">
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
												✓
											</span>
											<span>At least one lowercase letter</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
												✓
											</span>
											<span>At least one uppercase character</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
												✓
											</span>
											<span>Minimum of 8 characters</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
												✓
											</span>
											<span>Must contain a number or special character</span>
										</div>
									</div>
								</div>

								<div className="flex justify-between">
									{/* <Button
										type="button"
										variant="outline"
										onClick={() => setShowPasswordModal(false)}
										className="flex items-center gap-2"
									>
										<ArrowLeft className="w-4 h-4" /> Back
									</Button> */}
									<Button
										loading={isLoading > 0}
										type="submit"
										className="bg-red-700 hover:bg-red-800"
									>
										Confirm New Password
									</Button>
								</div>
							</form>
						</div>
					</DialogContent>
				</Dialog>

				{/* Edit Profile Modal */}
				<Dialog open={showEditModal} onOpenChange={setShowEditModal}>
					<DialogContent className="sm:max-w-[600px]">
						<div className="space-y-6">
							<h2 className="text-2xl font-semibold">
								Edit your personal information
							</h2>

							<form onSubmit={handleProfileUpdate} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm text-gray-500">First Name</label>
										<Input
											value={formData.first_name}
											onChange={e =>
												setFormData({...formData, first_name: e.target.value})
											}
											placeholder="Enter first name"
										/>
									</div>

									<div className="space-y-2">
										<label className="text-sm text-gray-500">Last Name</label>
										<Input
											value={formData.last_name}
											onChange={e =>
												setFormData({...formData, last_name: e.target.value})
											}
											placeholder="Enter last name"
										/>
									</div>

									<div className="space-y-2">
										<label className="text-sm text-gray-500">Email</label>
										<Input
											defaultValue={formData?.email}
											readOnly
											type="email"
											placeholder="Enter email"
										/>
									</div>

									<div className="space-y-2">
										<label className="text-sm text-gray-500">
											Phone Number
										</label>
										<Input
											value={formData.phone_number}
											onChange={e =>
												setFormData({...formData, phone_number: e.target.value})
											}
											placeholder="Enter phone number"
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
										<label className="text-sm text-gray-500">Address</label>
										<Input
											value={formData.address}
											onChange={e =>
												setFormData({...formData, address: e.target.value})
											}
											placeholder="Enter address"
										/>
									</div>

									<div className="space-y-2">
										<label className="text-sm text-gray-500">DOB</label>
										<Input
											type="date"
											value={formData.date_of_birth}
											onChange={e =>
												setFormData({
													...formData,
													date_of_birth: e.target.value,
												})
											}
										/>
									</div>

									{/* <div className="space-y-2">
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
									</div> */}

									<div className="space-y-2">
										<label className="text-sm text-gray-500">Country</label>

										{/* Ternary for readonly Input or Select */}
										{formData?.country ? (
											<Input
												defaultValue={formData.country} // Show current country in readonly input
												readOnly
												placeholder="Selected Country"
											/>
										) : (
											<Select
												defaultValue={formData.country || ""} // Default to previously selected country
												onValueChange={
													value => setFormData({...formData, country: value}) // Update formData when country changes
												}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select country" />
												</SelectTrigger>
												<SelectContent>
													{/* Map countries to SelectItem */}
													{countries.map(country => (
														<SelectItem
															key={country.isoCode}
															value={country.name}
														>
															{country.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									</div>
								</div>

								<div className="flex justify-between">
									{/* <Button
										type="button"
										variant="outline"
										onClick={() => setShowEditModal(false)}
										className="flex items-center gap-2"
									>
										<ArrowLeft className="w-4 h-4" /> Back
									</Button> */}
									<Button
										type="submit"
										loading={isLoadingProfile > 0}
										className="bg-gray-800 hover:bg-gray-900"
									>
										Update
									</Button>
								</div>
							</form>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</Navbar>
	);
};

export default Profile;
