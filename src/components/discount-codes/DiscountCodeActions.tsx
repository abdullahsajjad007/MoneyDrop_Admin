import React from "react";
import {Button} from "@/components/ui/button";
import {useDisclosure} from "@/hooks/use-disclosure";
import {EditDiscountCodeDialog} from "./EditDiscountCodeDialog";
import {DiscountCode} from "./columns";
import {toast} from "@/hooks/use-toast";
import {useDeletesDiscountCode} from "@/hooks";
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

interface DiscountCodeActionsProps {
	code: DiscountCode;
}

export function DiscountCodeActions({code}: DiscountCodeActionsProps) {
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const {mutate} = useDeletesDiscountCode();

	const handleDelete = () => {
		try {
			mutate(code.discount_code, {
				onSuccess: () => {
					toast({
						title: "Discount code deleted",
						description: `The discount code ${code.discount_code} has been deleted.`,
					});
					onDeleteClose();
				},
			});
		} catch (error) {
			toast({
				title: "Error",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="default"
				size="sm"
				onClick={onEditOpen}
				className="bg-primary hover:bg-primary-hover"
			>
				Edit
			</Button>
			<Button variant="destructive" size="sm" onClick={onDeleteOpen}>
				Delete
			</Button>

			<EditDiscountCodeDialog
				open={isEditOpen}
				onClose={onEditClose}
				discountCode={code}
			/>

			<AlertDialog open={isDeleteOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Delete</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this discount code?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={onDeleteClose}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500 hover:bg-red-600"
							onClick={() => {
								handleDelete();
							}}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
