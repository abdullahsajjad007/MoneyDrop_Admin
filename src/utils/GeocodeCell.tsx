import React, {useEffect, useState} from "react";
import {geocode} from "@/utils/geocode";

interface GeocodeCellProps {
	latitude: number;
	longitude: number;
}

const GeocodeCell: React.FC<GeocodeCellProps> = ({latitude, longitude}) => {
	const [address, setAddress] = useState<string | null>(null);

	useEffect(() => {
		const fetchAddress = async () => {
			const result = await geocode(latitude, longitude);
			setAddress(result);
		};

		fetchAddress();
	}, [latitude, longitude]);

	return (
		<div>{address ? address : `Lat: ${latitude}, Long: ${longitude}`}</div>
	);
};

export default GeocodeCell;
