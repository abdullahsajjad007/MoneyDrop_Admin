/* eslint-disable @typescript-eslint/no-explicit-any */
import {useContext} from "react";
import {getLoginToken, setLoginToken, setStoredUser} from "../../storage";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../axios-Instance";
import {queryKeys} from "../../react-query/constants";
import {useToast} from "../use-toast";
import {AuthContext} from "@/contexts/AuthContextDefinition";

const SERVER_ERROR = "There was an error contacting the server.";

async function userProfile(token: string) {
	const data = await axiosInstance({
		url: "/profile",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	return data?.data;
}

async function userLogin(formData: {email: string; password: string}) {
	const data = await axiosInstance({
		url: "/admin/login",
		method: "POST",
		data: formData,
		headers: {
			"Content-Type": "application/json",
		},
	});

	return data?.data;
}

export function useLogin() {
	const {toast} = useToast();
	const authCtx = useContext(AuthContext);

	return useMutation({
		mutationFn: async (formData: {email: string; password: string}) => {
			const loginData = await userLogin(formData);
			const userData = await userProfile(loginData.token);
			return {loginData, userData};
		},
		onSuccess: ({loginData, userData}) => {
			toast({
				title: "Success",
				description: "Logged in successfully",
				variant: "default",
			});
			setLoginToken(loginData.token);
			authCtx.authenticate(loginData.token);
			authCtx.updateUser(userData);
			setStoredUser(userData);
		},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;
			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
}

export function useForgetPassword() {
	const {toast} = useToast();

	return useMutation({
		mutationFn: async (formData: {email: string}) => {
			const data = await axiosInstance({
				url: "/reset-password",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			toast({
				title: "Success",
				description: "Check mailbox for instructions",
				variant: "default",
			});
		},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
}

export function useChangePassword() {
	const {toast} = useToast();

	return useMutation({
		mutationFn: async (formData: {
			old_password: string;
			new_password: string;
		}) => {
			const data = await axiosInstance({
				url: "/change-password",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getLoginToken()}`,
				},
			});

			return data.data;
		},
		onSuccess: data => {
			toast({
				title: "Success",
				description: "Password changed successfully",
				variant: "default",
			});
		},
		onError: (error: any) => {
			// console.log(error, "checking error message");
			const err = error?.response?.data?.message || SERVER_ERROR;
			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
}

export function useGetLoggedIn() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.user],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/auth/me",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getLoginToken()}`,
				},
			});

			return data?.data;
		},

		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
}

export function useLogout() {
	const {toast} = useToast();

	return useMutation({
		mutationFn: async (formData: {
			old_password: string;
			new_password: string;
		}) => {
			const data = await axiosInstance({
				url: "/admin/signout",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			toast({
				title: "Success",
				description: "Password changed successfully",
				variant: "default",
			});
		},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
}

async function deleteUser(id: any) {
	const response = await axiosInstance({
		url: `/auth/${id}`,
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLoginToken()}`,
		},
	});

	return response?.data;
}

export function useDeleteUser() {
	const {toast} = useToast();
	const queryClient = useQueryClient();
	const {mutate, isError, error, isSuccess, reset} = useMutation({
		mutationFn: id => deleteUser(id),
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.users]);
			toast({
				title: "Success",
				description: "Logged in successfully",
				variant: "default",
			});
			reset();
		},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
	return {mutate, isError, error, isSuccess, reset};
}

async function getAllUser() {
	const data = await axiosInstance({
		url: "/admin/users",
		method: "GET",
	});

	return data?.data;
}

export function useGetAllUsers() {
	const fallback = {};
	const {toast} = useToast();
	const {data = fallback} = useQuery({
		queryKey: [queryKeys.users],
		queryFn: () => getAllUser(),
		onSuccess: () => {},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
	return data;
}

async function deactivateUser(id: any) {
	const data = await axiosInstance({
		// url: `/auth/${id}`,
		url: `/admin/user/deactivate`,
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLoginToken()}`,
		},
	});

	return data?.data;
}

export function useDeactivateUser() {
	const {toast} = useToast();
	const queryClient = useQueryClient();
	const {mutate, isSuccess, reset, isError, error} = useMutation({
		mutationFn: id => deactivateUser(id),
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.users]);
		},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
	return {mutate, isSuccess, reset, isError, error};
}

export function useChangePasswordId() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			formData,
		}: {
			id: string;
			formData: {
				sticker_name: string;
				location: {
					latitude: number;
					longitude: number;
				};
			};
		}) => {
			const data = await axiosInstance({
				url: `/change-password/${id}`,
				method: "PUT",
				data: formData,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getLoginToken()}`,
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.user]);
			toast({
				title: "Success",
				description: data.message,
				variant: "default",
			});
		},
		onError: (error: any) => {
			const err = error?.response?.data?.message || SERVER_ERROR;

			toast({
				title: "Error",
				description: err,
				variant: "destructive",
			});
		},
	});
}
