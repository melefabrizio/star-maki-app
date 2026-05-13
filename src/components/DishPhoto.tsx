import React, { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";
import { Camera } from "lucide-react";
import { getPhoto, savePhoto } from "../lib/imageStore";
import { processPhoto } from "../lib/imageUtils";
import { cn } from "../lib/utils";

interface DishPhotoProps {
  dishId: string;
  editable: boolean;
  onPhotoReady: (url: string) => void;
  className?: string;
}

export interface DishPhotoHandle {
  triggerReplace: () => void;
  clearPhoto: () => void;
}

export const DishPhoto = forwardRef<DishPhotoHandle, DishPhotoProps>(
  ({ dishId, editable, onPhotoReady, className }, ref) => {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const prevUrlRef = useRef<string | null>(null);

    const loadPhoto = useCallback(async () => {
      const record = await getPhoto(dishId);
      if (record) {
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
        const url = URL.createObjectURL(record.blob);
        prevUrlRef.current = url;
        setObjectUrl(url);
      } else {
        if (prevUrlRef.current) {
          URL.revokeObjectURL(prevUrlRef.current);
          prevUrlRef.current = null;
        }
        setObjectUrl(null);
      }
    }, [dishId]);

    useEffect(() => {
      loadPhoto();
      return () => {
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
      };
    }, [loadPhoto]);

    useImperativeHandle(ref, () => ({
      triggerReplace: () => fileInputRef.current?.click(),
      clearPhoto: () => {
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
        prevUrlRef.current = null;
        setObjectUrl(null);
      },
    }));

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      e.target.value = "";
      try {
        const blob = await processPhoto(file);
        await savePhoto(dishId, blob);
        await loadPhoto();
      } catch (err) {
        console.error("Failed to process/save photo:", err);
      }
    };

    const baseClasses = "w-16 sm:w-22 self-stretch rounded-xl shrink-0 overflow-hidden";
    const photoClasses = cn(baseClasses, className);

    if (!objectUrl) {
      if (!editable) return <div className={cn(photoClasses, "min-h-14")} aria-hidden="true" />;
      return (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(photoClasses, "border-2 border-dashed border-border/50 flex items-center justify-center bg-muted/20 hover:bg-muted/50 hover:border-border/80 transition-all")}
            aria-label="Aggiungi foto"
          >
            <Camera className="w-5 h-5 text-muted-foreground/40" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      );
    }

    return (
      <>
        <button
          type="button"
          onClick={() => onPhotoReady(objectUrl)}
          className={cn(photoClasses, "bg-muted")}
          aria-label="Visualizza foto"
        >
          <img
            src={objectUrl}
            alt="Foto piatto"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </button>
        {editable && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        )}
      </>
    );
  }
);

DishPhoto.displayName = "DishPhoto";
