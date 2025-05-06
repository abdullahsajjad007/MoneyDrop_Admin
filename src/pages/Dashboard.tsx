import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import StatsCards from "@/components/dashboard/StatsCards";
import MapComponent from "@/components/dashboard/MapComponent";
import AddStickerModal from "@/components/dashboard/AddStickerModal";
import RemoveStickerModal from "@/components/dashboard/RemoveStickerModal";

const Dashboard = () => {
	// const {data: AllStickers} = useGetAllStickerSubmission();

	// const StickerData = AllStickers;
	// console.log(StickerData, "all Data");

	return (
		<Navbar>
			<div className="container mx-auto max-w-7xl py-8">
				<h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

				<StatsCards />
				<MapComponent />
			</div>
		</Navbar>
	);
};

export default Dashboard;
