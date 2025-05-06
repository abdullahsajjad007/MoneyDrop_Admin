import {ColumnDef} from "@tanstack/react-table";
import {DiscountCodeActions} from "./DiscountCodeActions";

export type DiscountCode = {
	id: string;
	discount_code: string;
	expiration_date: string;
	percentage: string;
	flat_fee: string;
};

export const columns: ColumnDef<DiscountCode>[] = [
	{
		accessorKey: "discount_code",
		header: "Discount Code",
	},
	{
		accessorKey: "expiration_date",
		header: "Expiration Date",
	},
	{
		accessorKey: "percentage",
		header: "Percentage",
	},
	{
		accessorKey: "flat_fee",
		header: "Flat Fee",
	},
	{
		id: "actions",
		cell: ({row}) => <DiscountCodeActions code={row.original} />,
	},
];
