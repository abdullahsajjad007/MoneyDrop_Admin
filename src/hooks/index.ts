/* eslint-disable @typescript-eslint/no-explicit-any */
import {getLoginToken} from "../storage";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../axios-Instance";
import {queryKeys} from "../react-query/constants";
import {useToast} from "./use-toast";

const SERVER_ERROR = "There was an error contacting the server.";

export function useSendNotifications() {
	const {toast} = useToast();

	return useMutation({
		mutationFn: async (formData: {message: string}) => {
			const data = await axiosInstance({
				url: "/admin/notifications",
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

// Discound codes
export function useGetAllDiscountCodes() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.discountCode],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/admin/discount-codes",
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

export function useGeneratediscountCodes() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: {
			expiration_date: string;
			percentage: number;
			flat_fee: number;
		}) => {
			const data = await axiosInstance({
				url: "/admin/discount-code",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.discountCode]);
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

export function useUpdateDiscountCode() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			formData,
		}: {
			id: string;
			formData: {expiration_date: string; percentage: number; flat_fee: number};
		}) => {
			const data = await axiosInstance({
				url: `/admin/discount-code/${id}`,
				method: "PUT",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.discountCode]);
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

export function useDeletesDiscountCode() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const data = await axiosInstance({
				url: `/admin/discount-code/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.discountCode]);
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

// USERS
export function useGetAllUsers() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.users],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/admin/users",
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

export function useUpdateUser() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({id, formData}: {id: string; formData: any}) => {
			const data = await axiosInstance({
				url: `/edit-profile`,
				// url: `/edit-profile/${id}`,
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

export function useDeletesUser() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const data = await axiosInstance({
				url: `/admin/user/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.users]);
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

export function useDeactivateUser() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const data = await axiosInstance({
				url: `/admin/user/deactivate/${id}`,
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.users]);
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

export function useReactivateUser() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const data = await axiosInstance({
				url: `/admin/user/reactivate/${id}`,
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.users]);
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

// Sticker Submission
export function useGetAllStickerSubmission() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.submission],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/admin/sticker-submissions",
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

export function useApproveSubmission() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: {submission_id: string}) => {
			const data = await axiosInstance({
				url: "/admin/sticker-submission/approve",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.submission]);

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

export function useRejectSubmission() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: {submission_id: string}) => {
			const data = await axiosInstance({
				url: "/admin/sticker-submission/reject",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.submission]);

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

// Fees
export function useGetFees() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.fees],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/user/get-fees",
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

export function useAddFees() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: {map_fee: number; ar_fee: number}) => {
			const data = await axiosInstance({
				url: "/admin/set-fees",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.fees]);

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

// All Payments
export function useGetAllPayments() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.payment],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/admin/getallpayments",
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

//All Stickers
export function useAddSticker() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: {
			sticker_name: string;
			location: {
				latitude: number;
				longitude: number;
			};
		}) => {
			const data = await axiosInstance({
				url: "/admin/sticker",
				method: "POST",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.sticker]);

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

export function useGetAllStickers() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.sticker],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/admin/stickers",
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

export function useGetStickerLocations() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.locations],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/get-sticker-locations",
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

export function useUpdateSticker() {
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
				url: `/admin/sticker/${id}`,
				method: "PUT",
				data: formData,
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.sticker]);
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

export function useDeleteSticker() {
	const {toast} = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const data = await axiosInstance({
				url: `/admin/sticker/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return data.data;
		},
		onSuccess: data => {
			queryClient.invalidateQueries([queryKeys.sticker]);
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

// Dashboard Analytics
export function useDashboardAnalytics() {
	const {toast} = useToast();

	return useQuery({
		queryKey: [queryKeys.analytics],
		queryFn: async () => {
			const data = await axiosInstance({
				url: "/admin/analytics",
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

// Search Querry
export function useSearchLocation() {
	const {toast} = useToast();

	return useMutation({
		mutationFn: async (query: string) => {
			const data = await axiosInstance({
				url: `/search-location?query=${encodeURIComponent(query)}`,

				method: "GET",
				data: query, // Send query in the request body
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getLoginToken()}`,
				},
			});

			return data.data;
		},
		onSuccess: data => {
			toast({
				title: "Search Success",
				description: "Locations fetched successfully",
				variant: "default",
			});
		},
		onError: (error: any) => {
			const err =
				error?.response?.data?.message || "Failed to fetch locations.";
			toast({
				title: "Search Error",
				description: err,
				variant: "destructive",
			});
			console.error("Error fetching locations:", error);
		},
	});
}
