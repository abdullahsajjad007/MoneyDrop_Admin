import React from "react";
import {Button} from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {User} from "./columns";
import {useToast} from "@/components/ui/use-toast";
import UserProfileView from "./UserProfileView";
import UserProfileEdit from "./UserProfileEdit";
import {useDeactivateUser, useDeletesUser, useReactivateUser} from "@/hooks";

interface UserActionsCellProps {
	user: User;
}

export const UserActionsCell = ({user}: UserActionsCellProps) => {
	const [showDeactivateDialog, setShowDeactivateDialog] = React.useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
	const [showViewModal, setShowViewModal] = React.useState(false);
	const [showEditModal, setShowEditModal] = React.useState(false);
	const {toast} = useToast();

	const {mutate} = useDeactivateUser();
	const {mutate: reactivate} = useReactivateUser();
	const {mutate: deleteUser} = useDeletesUser();

	const handleDeactivate = () => {
		try {
			const action = user.deactivated ? reactivate : mutate;
			action(user.user_id, {
				onSuccess: () => {
					toast({
						title: user.deactivated ? "User reactivated" : "User deactivated",
						description: `User has been ${
							user.deactivated ? "reactivated" : "deactivated"
						}.`,
					});
					setShowDeactivateDialog(false);
				},
			});
		} catch (error) {
			toast({
				title: "Error",
				variant: "destructive",
			});
		}
	};

	const handleDelete = () => {
		try {
			deleteUser(user.user_id, {
				onSuccess: () => {
					toast({
						title: "User deleted",
						description: `${user.first_name} ${user.last_name} has been deleted sucessfully.`,
					});
					setShowDeleteDialog(false);
				},
			});
		} catch (error) {
			toast({
				title: "Error",
				variant: "destructive",
			});
		}
	};

	// const handleDelete = () => {
	// 	try {
	// 		deleteUser(user.user_id, {
	// 			onSuccess: () => {
	//         toast({
	//           title: "User deleted",
	//           description: `${user.user_name} has been deleted.`,
	// 				});
	//         setShowDeleteDialog(false);
	// 			},
	// 		});
	// 	} catch (error) {
	// 		toast({
	// 			title: "Error",
	// 			variant: "destructive",
	// 		});
	// 	}
	// };

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="secondary"
				size="sm"
				className="bg-gray-300 text-white hover:bg-gray-500"
				onClick={() => setShowViewModal(true)}
			>
				View
			</Button>

			{/* Admin are not expected to edit user personal detials, than to just activate and deactivate them */}
			{/* <Button
				variant="secondary"
				size="sm"
				className="bg-green-600 text-white hover:bg-green-700"
				onClick={() => setShowEditModal(true)}
			>
				Edit
			</Button> */}

			<Button
				variant="secondary"
				size="sm"
				className={`text-white hover:bg-gray-700 ${
					user.deactivated ? "bg-green-600" : "bg-gray-600"
				}`}
				onClick={() => setShowDeactivateDialog(true)}
			>
				{user.deactivated ? "Reactivate" : "Deactivate"}
			</Button>

			<Button
				variant="destructive"
				size="sm"
				onClick={() => setShowDeleteDialog(true)}
			>
				Delete
			</Button>

			{/* View Modal */}
			<UserProfileView
				user={user}
				isOpen={showViewModal}
				onClose={() => setShowViewModal(false)}
			/>

			{/* Edit Modal */}
			<UserProfileEdit
				user={user}
				isOpen={showEditModal}
				onClose={() => setShowEditModal(false)}
			/>

			{/* Deactivate Dialog */}
			<AlertDialog
				open={showDeactivateDialog}
				onOpenChange={setShowDeactivateDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{user.deactivated ? "Reactivate" : "Deactivate"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							Username {user.user_name}
							<div className="mt-4">
								Are you sure you want to{" "}
								{user.deactivated ? "reactivate" : "deactivate"} this user?
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Back</AlertDialogCancel>
						<AlertDialogAction
							className={
								user.deactivated
									? "bg-green-600 hover:bg-green-700"
									: "bg-gray-600 hover:bg-gray-700"
							}
							onClick={handleDeactivate}
						>
							{user.deactivated ? "Reactivate" : "Deactivate"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Delete Dialog */}
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete</AlertDialogTitle>
						<AlertDialogDescription>
							{user.first_name} {user.last_name}
							<div className="mt-4">
								Are you sure you want to delete this user?
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Back</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500 hover:bg-red-600"
							onClick={handleDelete}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
