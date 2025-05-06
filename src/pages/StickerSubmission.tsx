import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DataTable} from "@/components/shared/DataTable";
import {columns} from "@/components/sticker-submission/columns";
import {mockData} from "@/components/sticker-submission/data";
import Navbar from "@/components/layout/Navbar";
import {useGetAllStickerSubmission} from "@/hooks";

const StickerSubmission = () => {
	const {data} = useGetAllStickerSubmission();

	const StickerData = data;

	// Filtered Statuses
	const Approved = StickerData?.filter(item => item.status === "approved");
	const Rejected = StickerData?.filter(item => item.status === "rejected");
	const Pending = StickerData?.filter(item => item.status === "pending");

	return (
		<Navbar>
			<div className="container mx-auto py-10">
				<h1 className="text-2xl font-semibold mb-6">Sticker Submissions</h1>

				<Tabs defaultValue="pending" className="w-full">
					<TabsList>
						<TabsTrigger value="pending">Recent</TabsTrigger>
						<TabsTrigger value="approved">Approved</TabsTrigger>
						<TabsTrigger value="rejected">Rejected</TabsTrigger>
					</TabsList>

					<TabsContent value="pending">
						{StickerData && (
							<DataTable
								columns={columns}
								data={StickerData?.filter(item => item.status === "pending")}
							/>
						)}
					</TabsContent>

					<TabsContent value="approved">
						{StickerData && (
							<DataTable
								columns={columns}
								data={StickerData?.filter(item => item.status === "approved")}
							/>
						)}
					</TabsContent>

					<TabsContent value="rejected">
						{StickerData && (
							<DataTable
								columns={columns}
								data={StickerData?.filter(item => item.status === "rejected")}
							/>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</Navbar>
	);
};

export default StickerSubmission;
