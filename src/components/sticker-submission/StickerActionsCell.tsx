import React from "react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Sticker} from "./columns";
import {useApproveSubmission, useRejectSubmission} from "@/hooks";
import locImage from "../../assets/og-image.png";
import {useIsMutating} from "@tanstack/react-query";
import GeocodeCell from "@/utils/GeocodeCell";

interface StickerActionsCellProps {
	sticker: Sticker;
}

export const StickerActionsCell = ({sticker}: StickerActionsCellProps) => {
	const [showViewModal, setShowViewModal] = React.useState(false);
	const [showApproveDialog, setShowApproveDialog] = React.useState(false);
	const [showRejectDialog, setShowRejectDialog] = React.useState(false);
	const {toast} = useToast();
	const {mutate} = useApproveSubmission();
	const {mutate: rejectSubmission} = useRejectSubmission();

	const handleApprove = () => {
		try {
			mutate(
				{submission_id: sticker.submission_id},
				{
					onSuccess: () => {
						toast({
							title: "Sticker approved",
							description: `Sticker for ${sticker.first_name} ${sticker.last_name} has been approved successfully`,
							variant: "default",
						});
						setShowApproveDialog(false);
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

	const handleReject = () => {
		try {
			rejectSubmission(
				{submission_id: sticker.submission_id},
				{
					onSuccess: () => {
						toast({
							title: "Sticker Rejected",
							description: `Sticker for ${sticker.first_name} ${sticker.last_name} has beenrejected successfully`,
							variant: "default",
						});
						setShowRejectDialog(false);
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
		<div className="flex items-center gap-2">
			{sticker && (
				<Button
					variant="secondary"
					size="sm"
					onClick={() => setShowViewModal(true)}
				>
					View
				</Button>
			)}

			{sticker.status === "pending" && (
				<>
					<Button
						variant="secondary"
						size="sm"
						className="bg-green-600 text-white hover:bg-green-700"
						onClick={() => setShowApproveDialog(true)}
					>
						Approve
					</Button>

					<Button
						variant="destructive"
						size="sm"
						onClick={() => setShowRejectDialog(true)}
					>
						Reject
					</Button>
				</>
			)}

			{/* View Modal */}
			<Dialog open={showViewModal} onOpenChange={setShowViewModal}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>View Sticker Submission</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<img
							src={sticker.sticker_image_Url || locImage}
							// src={sticker.sticker_image_Url}
							alt="Sticker"
							className="w-full h-48 object-cover rounded-lg"
						/>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="font-medium">Sticker ID</p>
								<p>{sticker.sticker_id}</p>
							</div>
							<div>
								<p className="font-medium">Status</p>
								<p>{sticker.status}</p>
							</div>
							<div>
								<p className="font-medium">Name</p>
								<p>{`${sticker.first_name} ${sticker.last_name}`}</p>
							</div>

							<div>
								<p className="font-medium">Found Date</p>
								<p>{sticker.submission_date}</p>
							</div>
							<div>
								<p className="font-medium">Found Location</p>
								{sticker.location.latitude == null ||
								sticker.location.longitude == null ? (
									<p>Location not available</p>
								) : (
									<GeocodeCell
										latitude={sticker.location.latitude}
										longitude={sticker.location.longitude}
									/>
								)}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Approve Dialog */}
			<AlertDialog open={showApproveDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Approve</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to approve this Sticker submission?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setShowApproveDialog(false)}>
							Back
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-green-600 hover:bg-green-700"
							onClick={handleApprove}
						>
							Approve
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Reject Dialog */}
			<AlertDialog open={showRejectDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Reject</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to reject this Sticker submission?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setShowRejectDialog(false)}>
							Back
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500 hover:bg-red-600"
							onClick={handleReject}
						>
							Reject
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
