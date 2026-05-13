import { Dialog } from "@base-ui/react/dialog";
import { X, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface PhotoLightboxProps {
  url: string | null;
  editable: boolean;
  onClose: () => void;
  onReplace: () => void;
  onDelete: () => Promise<void>;
}

export function PhotoLightbox({ url, editable, onClose, onReplace, onDelete }: PhotoLightboxProps) {
  const handleDelete = async () => {
    await onDelete();
  };

  const handleReplace = () => {
    onClose();
    onReplace();
  };

  return (
    <Dialog.Root open={!!url} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Popup className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
          <Dialog.Close
            render={
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Chiudi"
              />
            }
          >
            <X className="w-5 h-5" />
          </Dialog.Close>

          {url && (
            <img
              src={url}
              alt="Foto piatto"
              className="max-w-full max-h-[75dvh] object-contain rounded-2xl select-none"
              style={{ touchAction: "pinch-zoom" }}
              draggable={false}
            />
          )}

          {editable && (
            <div className="mt-6 flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full h-11 px-5 gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                onClick={handleReplace}
              >
                <RefreshCw className="w-4 h-4" />
                Sostituisci
              </Button>
              <Button
                variant="outline"
                className="rounded-full h-11 px-5 gap-2 bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30 hover:text-red-100 backdrop-blur-sm"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                Elimina foto
              </Button>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
