import {userProps} from "@/interface";
import {createContext} from "react";

export const AuthContext = createContext({
	user: undefined as userProps | undefined,
	token: undefined as string | undefined,
	isAuthenticated: false,
	authenticate: (token: string) => {},
	logout: () => {},
	updateUser: (data: userProps) => {},
});
