import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {StickerActionsCell} from "./StickerActionsCell";
import {geocode} from "@/utils/geocode"; // Assuming you have a geocode utility function
import GeocodeCell from "@/utils/GeocodeCell";

export type Sticker = {
	submission_id: string;
	sticker_image_Url: string;
	sticker_id: string;
	first_name: string;
	last_name: string;
	user_email: string;
	status: "pending" | "approved" | "rejected";
	submission_date: string;
	location: {
		latitude: number;
		longitude: number;
	};
	phone_number: string;
	user_id: string;
};

export const columns: ColumnDef<Sticker>[] = [
	{
		accessorKey: "sticker_id",
		header: "Sticker ID",
	},
	{
		accessorKey: "first_name",
		header: "First Name",
	},
	{
		accessorKey: "last_name",
		header: "Last Name",
	},
	{
		accessorKey: "user_email",
		header: "Email",
	},
	{
		accessorKey: "submission_date",
		header: "Found Date",
	},
	// {
	// 	accessorKey: "location",
	// 	header: "Found Location",
	// 	cell: async ({row}) => {
	// 		const {latitude, longitude} = row.original.location;
	// 		if (latitude == null || longitude == null) {
	// 			return "Location not available";
	// 		}
	// 		const address = await geocode(latitude, longitude);
	// 		return address ? address : `Lat: ${latitude}, Long: ${longitude}`;
	// 	},
	// },
	{
		accessorKey: "location",
		header: "Found Location",
		cell: ({row}) => {
			const {latitude, longitude} = row.original.location;
			if (latitude == null || longitude == null) {
				return "Location not available";
			}
			return <GeocodeCell latitude={latitude} longitude={longitude} />;
		},
	},

	{
		accessorKey: "status",
		header: "Status",
		cell: ({row}) => {
			const status = row.getValue("status") as string;
			return (
				<Badge
					className={
						status === "approved"
							? "bg-green-100 text-green-800"
							: status === "rejected"
							? "bg-red-100 text-red-800"
							: "bg-yellow-100 text-yellow-800"
					}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			);
		},
	},
	{
		id: "actions",
		cell: ({row}) => <StickerActionsCell sticker={row.original} />,
	},
];
