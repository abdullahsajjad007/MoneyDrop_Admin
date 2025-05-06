import React, {useState} from "react";
import {DataTable} from "@/components/shared/DataTable";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import {ColumnDef} from "@tanstack/react-table";
import {useGetAllPayments} from "@/hooks";
import GeocodeCell from "@/utils/GeocodeCell";

type Payment = {
	payment_id: string;
	first_name: string;
	last_name: string;
	timestamp: string;
	amount: number;
	location: {
		latitude: number | null;
		longitude: number | null;
	};
};

const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "payment_id",
		header: "Payment ID",
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
		accessorKey: "timestamp",
		header: "Payment Date",
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({row}) => {
			const amount = row.getValue("amount") as number | undefined;
			return <span>{amount ? amount.toLocaleString() : "N/A"}</span>;
		},
	},
	{
		accessorKey: "location",
		header: "Sticker Location",
		cell: ({row}) => {
			const {latitude, longitude} = row.original.location;
			if (latitude == null || longitude == null) {
				return "Location not available";
			}
			return <GeocodeCell latitude={latitude} longitude={longitude} />;
		},
	},
];

const Payments = () => {
	const {data} = useGetAllPayments();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredData =
		data?.filter((payment: Payment) =>
			`${payment.first_name} ${payment.last_name}`
				.toLowerCase()
				?.includes(searchQuery.toLowerCase())
		) || [];

	return (
		<Navbar>
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Payments</h1>

				{/* Search Bar */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
					<Input
						type="search"
						placeholder="Search for payments by name"
						className="pl-10 w-full"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* Table */}
				{data && <DataTable columns={columns} data={filteredData} />}
			</div>
		</Navbar>
	);
};

export default Payments;
