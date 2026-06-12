import { useCallback } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";

export type MakiLocationState = {
  overlay?: string;
  lightboxUrl?: string;
  lightboxEditable?: boolean;
};

export const OVERLAY = {
  addRestaurant: "add-restaurant",
  addDish: "add-dish",
  deleteRestaurant: "delete-restaurant",
  editDish: (id: string) => `edit-dish:${id}`,
  deleteDish: (id: string) => `delete-dish:${id}`,
  lightbox: (id: string) => `lightbox:${id}`,
} as const;

export function getMakiState(location: Location): MakiLocationState {
  return (location.state as MakiLocationState | null) ?? {};
}

export function parseOverlayId(overlay: string | undefined, prefix: string): string | null {
  if (!overlay?.startsWith(`${prefix}:`)) return null;
  return overlay.slice(prefix.length + 1);
}

/** Overlay con chiave fissa (es. add-dish, delete-restaurant). */
export function useOverlay(overlayKey: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = getMakiState(location).overlay === overlayKey;

  const open = useCallback(
    (extra?: Partial<MakiLocationState>) => {
      navigate(
        { pathname: location.pathname, search: location.search },
        {
          state: {
            ...getMakiState(location),
            overlay: overlayKey,
            ...extra,
          },
        },
      );
    },
    [navigate, location.pathname, location.search, location.state, overlayKey],
  );

  const close = useCallback(() => {
    if (getMakiState(location).overlay === overlayKey) {
      navigate(-1);
    }
  }, [navigate, location, overlayKey]);

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (next) open();
      else close();
    },
    [open, close],
  );

  return { isOpen, open, close, onOpenChange };
}

/** Overlay con id dinamico (es. edit-dish:abc, lightbox:abc). */
export function useOverlayMatch(prefix: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const makiState = getMakiState(location);
  const id = parseOverlayId(makiState.overlay, prefix);
  const isOpen = id !== null;

  const open = useCallback(
    (targetId: string, extra?: Partial<MakiLocationState>) => {
      navigate(
        { pathname: location.pathname, search: location.search },
        {
          state: {
            ...getMakiState(location),
            overlay: `${prefix}:${targetId}`,
            ...extra,
          },
        },
      );
    },
    [navigate, location.pathname, location.search, location.state, prefix],
  );

  const close = useCallback(() => {
    if (parseOverlayId(getMakiState(location).overlay, prefix)) {
      navigate(-1);
    }
  }, [navigate, location, prefix]);

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (!next) close();
    },
    [close],
  );

  return { isOpen, id, open, close, onOpenChange, state: makiState };
}
