import {ColumnDef} from "@tanstack/react-table";
import {UserActionsCell} from "./UserActionsCell";

// export type User = {
//   id: string;
//   username: string;
//   fullName: string;
//   email: string;
//   stickersFound: number;
//   status: "active" | "inactive";
// };
// import { User } from "./User";

export type User = {
	country: string;
	account_creation_date: string;
	date_of_birth: string;
	deactivated: boolean;
	email: string;
	first_name: string;
	gender: string;
	last_login: string | null;
	last_logout: string | null;
	last_name: string;
	notifications: Array<{message: string; timestamp: string} | string>;
	phone_number: string;
	profile_image_url: string;
	role: string;
	stickers_found: number;
	user_id: string;
	user_name: string;
};

export const columns: ColumnDef<User>[] = [
	{
		id: "user_name",
		accessorKey: "user_name",
		header: "Username",
	},
	{
		id: "first_name",
		accessorKey: "first_name",
		header: "First Name",
	},
	{
		id: "last_name",
		accessorKey: "last_name",
		header: "Last Name",
	},
	{
		id: "email",
		accessorKey: "email",
		header: "Email",
	},
	{
		id: "stickers_found",
		accessorKey: "stickers_found",
		header: "No Of Stickers Found",
	},
	{
		id: "actions",
		cell: ({row}) => <UserActionsCell user={row.original} />,
	},
];
