/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, useState } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAppStore } from "./lib/store";
import { Button } from "./components/ui/button";

export type AppOutletContext = {
  store: ReturnType<typeof useAppStore>;
  isAddRestaurantOpen: boolean;
  setIsAddRestaurantOpen: (v: boolean) => void;
  isAddDishOpen: boolean;
  setIsAddDishOpen: (v: boolean) => void;
};

export function useAppOutletContext() {
  return useOutletContext<AppOutletContext>();
}

const colophon = (
  <>
    Made in{" "}
    <a href="https://mele.io" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-salmon underline decoration-muted-foreground/30 hover:decoration-salmon transition-colors">
      Fab
    </a>{" "}
    ·{" "}
    <a href="https://letterbird.co/fabrizio" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-salmon underline decoration-muted-foreground/30 hover:decoration-salmon transition-colors">
      Feedback
    </a>{" "}
    ·{" "}
    <a href="https://github.com/melefabrizio/star-maki-app" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-salmon underline decoration-muted-foreground/30 hover:decoration-salmon transition-colors">
      GitHub
    </a>
  </>
);

export default function App() {
  const store = useAppStore();
  const [isAddRestaurantOpen, setIsAddRestaurantOpen] = useState(false);
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const location = useLocation();
  const inRestaurant = location.pathname.startsWith("/r/");

  const outletContext: AppOutletContext = {
    store,
    isAddRestaurantOpen,
    setIsAddRestaurantOpen,
    isAddDishOpen,
    setIsAddDishOpen,
  };

  return (
    <div className="min-h-[100dvh] bg-background font-sans text-foreground selection:bg-salmon-light selection:text-salmon flex flex-col">
      <div className="flex-1">
        <Suspense fallback={<div className="min-h-[100dvh] bg-background" />}>
          <Outlet context={outletContext} />
        </Suspense>
      </div>

      <footer className="sticky bottom-0 bg-background">
        {/* Mobile: FAB contestuale + colophon */}
        <div className="sm:hidden px-4 pt-3 pb-6 flex flex-col items-center gap-3">
          {!inRestaurant && store.state.restaurants.length > 0 && (
            <Button
              onClick={() => setIsAddRestaurantOpen(true)}
              className="w-full max-w-sm rounded-full h-14 text-base font-semibold gap-2 bg-salmon text-white hover:bg-salmon/90 active:scale-[0.98] transition-all"
            >
              <Plus className="w-5 h-5" />
              Nuovo Ristorante
            </Button>
          )}
          {inRestaurant && (
            <Button
              onClick={() => setIsAddDishOpen(true)}
              className="w-full max-w-sm rounded-full h-14 text-base font-semibold gap-2 bg-salmon text-white hover:bg-salmon/90 active:scale-[0.98] transition-all"
            >
              <Plus className="w-5 h-5" />
              Nuovo Piatto
            </Button>
          )}
          <p className="text-center text-muted-foreground text-xs opacity-60 hover:opacity-100 transition-opacity">
            {colophon}
          </p>
        </div>

        {/* Desktop: solo colophon */}
        <div className="hidden sm:block py-8 text-center text-muted-foreground text-sm opacity-60 hover:opacity-100 transition-opacity">
          {colophon}
        </div>
      </footer>
    </div>
  );
}
