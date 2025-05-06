import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RemoveStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveStickerModal = ({ isOpen, onClose, onRemove }: RemoveStickerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Sticker</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Sticker ID: MD1222</p>
            <p>Are you sure you want to remove sticker</p>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Back
            </Button>
            <Button variant="destructive" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveStickerModal;