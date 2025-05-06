/* eslint-disable @typescript-eslint/no-explicit-any */
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "../../react-query/constants";
import {useContext} from "react";
// import { AuthContext } from "../../context";
import {getLoginToken, setStoredUser} from "../../storage";
import {isAuthenticated} from "../../utils";
import {axiosInstance} from "../../axios-Instance";
import {AuthContext} from "../AuthContext";

const userProfile = async () => {
	const data = await axiosInstance({
		url: "/profile",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLoginToken()}`,
		},
	});
	return data?.data;
};

export function useAuthenticatedUser() {
	const authCtx = useContext(AuthContext);
	const fallback = undefined;
	const {data = fallback} = useQuery({
		enabled: isAuthenticated(),
		// queryKey: [queryKeys.user],
		queryFn: () => userProfile(),
		queryKey: [queryKeys.user],
		onSuccess: (data: any) => {
			// console.log(data, "auth user data");
			authCtx.updateUser(data);
			setStoredUser(data);
		},
		onError: (error: any) => {
			authCtx.logout();
		},
	});
	return data;
}
