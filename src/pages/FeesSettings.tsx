import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import Navbar from "@/components/layout/Navbar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useIsMutating} from "@tanstack/react-query";
import {useAddFees, useGetFees} from "@/hooks";

const formSchema = z.object({
	map_fee: z.string().min(1, "Map Feature fee is required"),
	ar_fee: z.string().min(1, "AR Feature fee is required"),
});

type FeesFormValues = z.infer<typeof formSchema>;

const FeesSettings = () => {
	const {data: AllFees} = useGetFees();

	const form = useForm<FeesFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			map_fee: "5",
			ar_fee: "5",
		},
	});

	React.useEffect(() => {
		if (AllFees) {
			form.reset({
				map_fee: AllFees.map_fee?.toString() || "5",
				ar_fee: AllFees.ar_fee?.toString() || "5",
			});
		}
	}, [AllFees, form]);

	const {mutate} = useAddFees();
	// console.log(AllFees, "checks");

	const isLoading = useIsMutating();

	const onSubmit = (data: FeesFormValues) => {
		// console.log("Fees settings submitted:", data);
		// toast.success("Fees settings updated successfully");

		const feesData = {
			map_fee: parseFloat(data.map_fee),
			ar_fee: parseFloat(data.ar_fee),
		};

		mutate(feesData, {
			onSuccess: () => {
				form.reset();
			},
		});
	};

	function handleSubmit(
		onSubmit: (data: FeesFormValues) => void
	): React.MouseEventHandler<HTMLButtonElement> {
		return event => {
			event.preventDefault();
			form.handleSubmit(onSubmit)();
		};
	}

	return (
		<Navbar>
			<div className="container mx-auto py-6">
				<h1 className="text-2xl font-bold mb-6">Fees Settings</h1>

				<Card>
					<CardHeader>
						<CardTitle>Fees Settings</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="map_fee"
									render={({field}) => (
										<FormItem>
											<FormLabel>Map Feature</FormLabel>
											<FormControl>
												<div className="relative">
													<span className="absolute left-3 top-1/2 -translate-y-1/2">
														$
													</span>
													<Input
														{...field}
														className="pl-8"
														type="number"
														min="0"
														step="0.01"
													/>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="ar_fee"
									render={({field}) => (
										<FormItem>
											<FormLabel>AR Feature</FormLabel>
											<FormControl>
												<div className="relative">
													<span className="absolute left-3 top-1/2 -translate-y-1/2">
														$
													</span>
													<Input
														{...field}
														className="pl-8"
														type="number"
														min="0"
														step="0.01"
													/>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>

								<div className="flex gap-4">
									<Button
										type="button"
										variant="outline"
										onClick={() => form.reset()}
										// onClick={handleSubmit(onSubmit)}
									>
										Cancel
									</Button>
									<Button loading={isLoading > 0} type="submit">
										Submit
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</Navbar>
	);
};

export default FeesSettings;
