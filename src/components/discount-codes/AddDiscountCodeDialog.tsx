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
import {format} from "date-fns";
import {useState} from "react";
import {toast} from "@/hooks/use-toast";
import {useGeneratediscountCodes} from "@/hooks";
import {useIsMutating} from "@tanstack/react-query";

interface AddDiscountCodeDialogProps {
    open: boolean;
    onClose: () => void;
}

interface Forms {
    expiration_date: string;
    percentage: number;
    flat_fee: number;
}

export function AddDiscountCodeDialog({
    open,
    onClose,
}: AddDiscountCodeDialogProps) {
    const [date, setDate] = useState<Date>();
    const [flatFee, setFlatFee] = useState<number | undefined>();
    const [percentage, setPercentage] = useState<number | undefined>();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const {mutate} = useGeneratediscountCodes();

    const isLoading = useIsMutating();

    const validateInputs = () => {
        if (!date) {
            return false;
        }
        if (percentage === undefined || percentage <= 0 || percentage > 100) {
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

        const FormData = {
            expiration_date: date?.toISOString().split("T")[0],
            percentage,
            flat_fee: flatFee,
        };

        try {
            mutate(FormData as unknown as Forms, {
                onSuccess: () => {
                    setDate(undefined);
                    setPercentage(undefined);
                    setFlatFee(undefined);
                    onClose();
                },
            });
        } catch (error) {
            toast({
                title: "Error",
                variant: "destructive",
            });
        }
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        // Close the calendar popover after selection
        setCalendarOpen(false);
    };

    const handleCalendarClick = (e: React.MouseEvent) => {
        // Prevent the click from propagating to elements behind
        e.stopPropagation();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Discount Code</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Expiration Date</label>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    type="button"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "MM/dd/yyyy") : "MM/DD/YYYY"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent 
                                className="w-auto p-0" 
                                onClick={handleCalendarClick}
                                onPointerDownOutside={(e) => e.preventDefault()}
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Percentage (max 100%)</label>
                        <Input
                            type="number"
                            placeholder="e.g 4"
                            value={percentage}
                            onChange={e => setPercentage(Number(e.target.value))}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Flat Fee</label>
                        <Input
                            type="number"
                            placeholder="e.g 2"
                            value={flatFee}
                            onChange={e => setFlatFee(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" loading={isLoading > 0}>
                            Generate
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
