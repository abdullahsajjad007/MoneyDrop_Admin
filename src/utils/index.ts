import {jwtDecode} from "jwt-decode";
import {getLoginToken} from "../storage";
import {IDecodedUser} from "../interface";
// import { AxiosError } from "axios";

const SERVER_ERROR = "There was an error contacting the server.";

export const getDecodedJWT = () => {
	try {
		const token = getLoginToken();
		const decoded = jwtDecode<IDecodedUser>(token);

		return decoded;
	} catch (e) {
		return null;
	}
};

export const isAuthenticated = () => {
	try {
		const decode = getDecodedJWT();
		if (decode) {
			const {exp} = decode;
			const currentTime = Date.now() / 1000;
			return exp > currentTime;
		}
		return false;
	} catch (e) {
		return false;
	}
};
