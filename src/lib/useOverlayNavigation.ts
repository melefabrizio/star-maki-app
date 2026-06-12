import { useCallback } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";

const OVERLAY_PARAM = "overlay";
const DISH_PARAM = "dish";

export type MakiLocationState = {
  lightboxUrl?: string;
  lightboxEditable?: boolean;
};

export const OVERLAY = {
  addRestaurant: "add-restaurant",
  addDish: "add-dish",
  deleteRestaurant: "delete-restaurant",
  editDish: "edit-dish",
  deleteDish: "delete-dish",
  lightbox: "lightbox",
} as const;

function overlayParams(location: Location) {
  return new URLSearchParams(location.search);
}

export function getMakiState(location: Location): MakiLocationState {
  return (location.state as MakiLocationState | null) ?? {};
}

function withOverlaySearch(
  location: Location,
  overlay: string,
  dishId?: string,
): string {
  const params = overlayParams(location);
  params.set(OVERLAY_PARAM, overlay);
  if (dishId) params.set(DISH_PARAM, dishId);
  else params.delete(DISH_PARAM);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/** Overlay con chiave fissa (es. add-dish, delete-restaurant). */
export function useOverlay(overlayKey: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = overlayParams(location).get(OVERLAY_PARAM) === overlayKey;

  const open = useCallback(
    (extra?: Partial<MakiLocationState>) => {
      navigate(
        {
          pathname: location.pathname,
          search: withOverlaySearch(location, overlayKey),
        },
        {
          replace: false,
          state: { ...getMakiState(location), ...extra },
        },
      );
    },
    [navigate, location, overlayKey],
  );

  const close = useCallback(() => {
    if (overlayParams(location).get(OVERLAY_PARAM) === overlayKey) {
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

/** Overlay con id piatto in query (?overlay=edit-dish&dish=abc). */
export function useOverlayMatch(prefix: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = overlayParams(location);
  const id = params.get(OVERLAY_PARAM) === prefix ? params.get(DISH_PARAM) : null;
  const isOpen = id !== null;
  const makiState = getMakiState(location);

  const open = useCallback(
    (targetId: string, extra?: Partial<MakiLocationState>) => {
      navigate(
        {
          pathname: location.pathname,
          search: withOverlaySearch(location, prefix, targetId),
        },
        {
          replace: false,
          state: { ...getMakiState(location), ...extra },
        },
      );
    },
    [navigate, location, prefix],
  );

  const close = useCallback(() => {
    if (overlayParams(location).get(OVERLAY_PARAM) === prefix) {
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
