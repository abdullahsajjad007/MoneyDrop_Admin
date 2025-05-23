/* eslint-disable react-refresh/only-export-components */
import {createContext, useEffect, useState} from "react";
import {queryKeys} from "../react-query/constants";
import {getLoginToken, getStoredUser, setStoredUser} from "../storage";
import {getDecodedJWT, isAuthenticated} from "../utils";
import {useAuthenticatedUser} from "./hooks";
import {useQueryClient} from "@tanstack/react-query";
import {ChildProps, userProps} from "../interface";

export const AuthContext = createContext({
	user: undefined as userProps | undefined,
	token: undefined as string | undefined,
	isAuthenticated: false,
	authenticate: (token: string) => {},
	logout: () => {},
	updateUser: (data: userProps) => {},
});

function AuthContextProvider({children}: ChildProps) {
	const [authToken, setAuthToken] = useState<string | undefined>(undefined);
	const [user, setUser] = useState<userProps | undefined>(undefined);
	const userDetails = useAuthenticatedUser();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!isAuthenticated()) {
			logout();
		}
	}, []);

	useEffect(() => {
		const data = getLoginToken();
		if (data) {
			setAuthToken(data);
		}
	}, []);

	useEffect(() => {
		const data = userDetails;
		if (data) {
			// console.log(data, "getting stored udser");
			setUser(data);
		}
	}, []);

	useEffect(() => {
		const data = getStoredUser();
		if (data) {
			// console.log(data, "getting stored udser");
			setUser(data);
		}
	}, []);

	function logout() {
		setUser(undefined);
		setAuthToken("");
		localStorage.clear();
		queryClient.invalidateQueries([queryKeys.user]);
		// window.location.href = "/signin";
	}

	// useEffect(() => {
	// 	checkTokenValidity();
	// }, []);

	function updateUser(data: userProps) {
		setUser(data);
	}

	function authenticate(data: string) {
		setAuthToken(data);
		const decoded = getDecodedJWT();
		// console.log(decoded, "decoded");

		// const userPropsObj: userProps = {
		// 	_id: decoded?._id || "",
		// 	fullname: "",
		// 	token: "",
		// 	email: decoded?.email || "",
		// 	id: decoded?._id || "",
		// 	user: [],
		// 	gender: "",
		// };

		// setUser(userPropsObj);
		// setStoredUser(userPropsObj);
	}

	const value = {
		user: user,
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
		updateUser: updateUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
