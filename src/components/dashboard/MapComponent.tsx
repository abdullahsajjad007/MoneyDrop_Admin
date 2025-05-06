/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
	useAddSticker,
	useDeleteSticker,
	useGetStickerLocations,
	useSearchLocation,
} from "@/hooks";
import {useToast} from "@/hooks/use-toast";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {useIsMutating} from "@tanstack/react-query";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Info} from "lucide-react";

interface StickerLocation {
	name: string;
	location: {
		latitude: number;
		longitude: number;
	};
	status: "pending" | "available" | "approved";
	sticker_id: string;
}

const containerStyle = {
	width: "100%",
	height: "600px",
};

const tourSteps = [
	{
		title: "Step 1",
		description:
			"Click the input box and search for a location. A red marker will appear at the specified location.",
	},
	{
		title: "Step 2",
		description:
			"The red marker shows the location you searched for. Click it to add a sticker location.",
	},
	{
		title: "Step 3",
		description:
			"The blue marker represents all sticker locations already added on the map. Clicking a blue marker opens a modal where you can remove it.",
	},
	{
		title: "Step 4",
		description:
			"The green marker indicates a location where a sticker has been found. You can also click the green marker to remove the sticker.",
	},
];

const MapComponent = () => {
	const [locations, setLocations] = useState<StickerLocation[]>([]);
	const [googleMarkers, setGoogleMarkers] = useState<StickerLocation[]>([]);
	const [center, setCenter] = useState({lat: 40.758, lng: -73.9855});
	const {data: Sticks} = useGetStickerLocations();
	const api = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const addStickerLoader = useIsMutating();
	const removeStickerLoader = useIsMutating();
	const {mutate: AddNewSticker} = useAddSticker();
	const {mutate: RemoveNewSticker} = useDeleteSticker();
	const [showInfoModal, setShowInfoModal] = useState(false);

	const [currentStep, setCurrentStep] = useState(0);

	const handleOpenInfoModal = () => {
		setShowInfoModal(true);
	};

	const handleNext = () => {
		if (currentStep < tourSteps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleClose = () => {
		setCurrentStep(0);
		setShowInfoModal(false);
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setCenter({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				() => {
					setCenter({lat: 40.758, lng: -73.9855});
				}
			);
		}
	}, []);

	useEffect(() => {
		if (Sticks) {
			const fetchedLocations = Sticks.map((sticker: any) => ({
				name: sticker.name || "Unnamed Sticker",
				location: {
					latitude: parseFloat(sticker.location.latitude),
					longitude: parseFloat(sticker.location.longitude),
				},
				status: sticker.found ? "approved" : "available",
				sticker_id: sticker.sticker_id,
			}));
			setLocations(fetchedLocations);
		}
	}, [Sticks]);

	const getMarkerColor = (status: string) => {
		switch (status) {
			case "pending":
				return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
			case "available":
				return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
			case "approved":
				return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
			default:
				return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
		}
	};

	const handleMarkerClick = (location: StickerLocation) => {
		if (location.status === "pending") {
			setSelectedSticker(location);
			setShowAddModal(true);
		} else {
			setSelectedSticker(location);
			setShowRemoveModal(true);
		}
	};

	const [showAddModal, setShowAddModal] = useState(false);
	const [showRemoveModal, setShowRemoveModal] = useState(false);
	const [selectedSticker, setSelectedSticker] =
		useState<StickerLocation | null>(null);

	const handleAddSticker = (formData: any) => {
		const {location, name} = formData;
		const stickerData = {
			sticker_name: name,
			location,
		};

		AddNewSticker(stickerData, {
			onSuccess: () => {
				setShowAddModal(false);
				setSelectedSticker(null);
			},
		});
	};

	const handleRemoveSticker = (formData: any) => {
		const {location, name} = formData;
		const stickerData = {
			sticker_id: selectedSticker?.sticker_id,
		};
		RemoveNewSticker(selectedSticker?.sticker_id, {
			onSuccess: () => {
				setShowRemoveModal(false);
				setSelectedSticker(null);
			},
		});
	};

	const [searchQuery, setSearchQuery] = useState("");
	const {mutate: searchLocations} = useSearchLocation();

	const handleSearch = () => {
		if (!searchQuery.trim()) return;

		searchLocations(searchQuery, {
			onSuccess: data => {
				if (data) {
					const newMarkers = data.map((result: any) => ({
						name: result.name || "Unnamed Location",
						location: {
							latitude: result.latitude,
							longitude: result.longitude,
						},
						status: "pending",
						sticker_id: "",
					}));
					setGoogleMarkers(newMarkers);

					setCenter({
						lat: data[0].latitude,
						lng: data[0].longitude,
					});
				}
			},
		});
	};

	return (
		<>
			<Card className="mb-6">
				<CardContent className="p-6">
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center gap-2">
							<h2 className="text-xl font-semibold">Sticker Locations</h2>
							<Info
								className="h-4 w-4 cursor-pointer"
								onClick={handleOpenInfoModal}
							/>
						</div>
						<div className="flex gap-2">
							<Input
								placeholder="Search for location"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className="max-w-sm"
							/>
							<button
								onClick={handleSearch}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Search
							</button>
						</div>
					</div>
					<LoadScript googleMapsApiKey={api}>
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={12}
						>
							{/* Render markers for locations from the database */}
							{locations.map((location, index) => (
								<Marker
									key={`db-${index}`}
									position={{
										lat: location.location.latitude,
										lng: location.location.longitude,
									}}
									icon={getMarkerColor(location.status)}
									onClick={() => handleMarkerClick(location)}
								/>
							))}

							{/* Render markers for locations fetched from Google */}
							{googleMarkers.map((location, index) => (
								<Marker
									key={`google-${index}`}
									position={{
										lat: location.location.latitude,
										lng: location.location.longitude,
									}}
									icon={getMarkerColor(location.status)}
									onClick={() => handleMarkerClick(location)}
								/>
							))}

							{/* Render marker for user's current location */}
							{/* <Marker
								position={center}
								icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
							/> */}
						</GoogleMap>
					</LoadScript>
				</CardContent>
			</Card>

			<Dialog open={showAddModal} onOpenChange={() => setShowAddModal(false)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Sticker</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium">Sticker Name</label>
							<Input
								// value={""}
								value={selectedSticker?.name || ""}
								onChange={e =>
									setSelectedSticker(
										prev => prev && {...prev, name: e.target.value}
									)
								}
								placeholder="Enter Sticker Name"
							/>
						</div>
						<div className="flex justify-end gap-4">
							<Button variant="outline" onClick={() => setShowAddModal(false)}>
								Back
							</Button>
							<Button
								loading={addStickerLoader > 0}
								onClick={() => handleAddSticker(selectedSticker)}
							>
								Add
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog
				open={showRemoveModal}
				onOpenChange={() => setShowRemoveModal(false)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Remove Sticker</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="text-center">
							<p className="text-lg font-medium mb-2">
								Sticker ID: {selectedSticker?.sticker_id}
							</p>
							<p>Are you sure you want to remove sticker</p>
						</div>

						<div className="flex justify-end gap-4">
							<Button
								variant="outline"
								onClick={() => setShowRemoveModal(false)}
							>
								Cancel
							</Button>
							<Button
								loading={removeStickerLoader > 0}
								onClick={() => handleRemoveSticker(selectedSticker)}
							>
								Remove
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<AlertDialog open={showInfoModal}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{tourSteps[currentStep].title}</AlertDialogTitle>
						<AlertDialogDescription>
							{tourSteps[currentStep].description}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button
							variant="outline"
							onClick={handlePrev}
							disabled={currentStep === 0}
						>
							Prev
						</Button>
						{currentStep < tourSteps.length - 1 ? (
							<Button onClick={handleNext}>Next</Button>
						) : (
							<AlertDialogAction onClick={handleClose}>Close</AlertDialogAction>
						)}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default MapComponent;
