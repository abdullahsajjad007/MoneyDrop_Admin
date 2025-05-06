import {useState} from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";

interface AddStickerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (formData: FormData) => void;
	selectedSticker: {
		sticker_id: string;
		name: string;
		status: string;
		location: {latitude: number; longitude: number};
	} | null;
}

const AddStickerModal = ({
	isOpen,
	onClose,
	onAdd,
	selectedSticker,
}: AddStickerModalProps) => {
	const [stickerName, setStickerName] = useState("");
	const {toast} = useToast();

	const handleAdd = () => {
		if (!stickerName.trim()) {
			// toast({
			//   title: "Error",
			//   description: "Please enter a sticker name",
			//   variant: "destructive",
			// });
			return;
		}

		const formData = new FormData();
		formData.append("sticker_name", stickerName);
		if (selectedSticker && selectedSticker.location) {
			formData.append("location", JSON.stringify(selectedSticker.location));
		}
		onAdd(formData);
		setStickerName("");
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Sticker</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium">Sticker Name</label>
						<Input
							value={stickerName}
							onChange={e => setStickerName(e.target.value)}
							placeholder="Enter Sticker Name"
						/>
					</div>
					<div className="flex justify-end gap-4">
						<Button variant="outline" onClick={onClose}>
							Back
						</Button>
						<Button onClick={handleAdd}>Add</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddStickerModal;
