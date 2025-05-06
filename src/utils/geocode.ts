import axios from "axios";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const geocode = async (
	latitude: number,
	longitude: number
): Promise<string | null> => {
	try {
		const response = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
		);

		if (response.data.status === "OK" && response.data.results.length > 0) {
			return response.data.results[0].formatted_address;
		} else {
			console.error("Geocoding API error:", response.data.status);
			return null;
		}
	} catch (error) {
		console.error("Error fetching geocode:", error);
		return null;
	}
};
