import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar as CalendarIcon} from "lucide-react";
import {format, parseISO} from "date-fns";
import {useState} from "react";
import {toast} from "@/hooks/use-toast";
import {useUpdateDiscountCode} from "@/hooks";
import {useIsMutating} from "@tanstack/react-query";
import {DiscountCode} from "./columns";

interface EditDiscountCodeDialogProps {
	open: boolean;
	onClose: () => void;
	discountCode: DiscountCode;
}

interface Forms {
	expiration_date: string;
	percentage: number;
	flat_fee: number;
}

export function EditDiscountCodeDialog({
	open,
	onClose,
	discountCode,
}: EditDiscountCodeDialogProps) {
	const [date, setDate] = useState<Date | undefined>(
		discountCode.expiration_date
			? parseISO(discountCode.expiration_date)
			: undefined
	);
	const [flatFee, setFlatFee] = useState<number | undefined>(
		discountCode.flat_fee ? Number(discountCode.flat_fee) : undefined
	);
	const [percentage, setPercentage] = useState<number | undefined>(
		discountCode.percentage ? Number(discountCode.percentage) : undefined
	);
	const {mutate} = useUpdateDiscountCode();

	const isLoading = useIsMutating();

	const validateInputs = () => {
		if (!date) {
			return false;
		}
		if (percentage === undefined || percentage <= 0) {
			return false;
		}
		if (flatFee === undefined || flatFee <= 0) {
			return false;
		}
		return true;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateInputs()) {
			return;
		}

		const formData = {
			expiration_date: date?.toISOString().split("T")[0], // Format date as YYYY-MM-DD
			percentage,
			flat_fee: flatFee,
		};

		try {
			mutate(
				{id: discountCode.discount_code, formData},
				{
					onSuccess: () => {
						onClose();
					},
				}
			);
		} catch (error) {
			toast({
				title: "Error",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog open={open}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Discount Code</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">Expiration Date</label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start text-left font-normal"
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "yyyy-MM-dd") : "YYYY-MM-DD"}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Percentage</label>
						<Input
							type="number"
							placeholder="e.g 4"
							value={percentage}
							onChange={e => setPercentage(Number(e.target.value))}
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Flat Fee</label>
						<Input
							type="number"
							placeholder="e.g 2"
							value={flatFee}
							onChange={e => setFlatFee(Number(e.target.value))}
						/>
					</div>
					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" loading={isLoading > 0}>
							Update
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
