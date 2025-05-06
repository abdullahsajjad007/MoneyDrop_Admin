import React, {useEffect, useState} from "react";
import Navbar from "@/components/layout/Navbar";
import {DataTable} from "@/components/shared/DataTable";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {columns, User} from "@/components/users/columns";
import {useGetAllUsers} from "@/hooks";

const Users = () => {
	const {data} = useGetAllUsers();
	const [users, setUsers] = useState(data || []);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredData = React.useMemo(
		() =>
			data?.filter((user: User) =>
				`${user.first_name} ${user.last_name}`
					.toLowerCase()
					?.includes(searchQuery.toLowerCase())
			) || [],
		[data, searchQuery]
	);

	useEffect(() => {
		if (data) {
			setUsers(data);
		}
	}, []);

	return (
		<Navbar>
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Users</h1>

				{/* Search Bar */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
					<Input
						type="search"
						placeholder="Search for Users by name"
						className="pl-10 w-full"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* Table */}
				{users && <DataTable columns={columns} data={filteredData} />}
			</div>
		</Navbar>
	);
};

export default Users;
