/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useState } from "react";
import { Plus } from "lucide-react";
import { useAppStore } from "./lib/store";
import { Home } from "./components/Home";
import { Button } from "./components/ui/button";

const RestaurantView = lazy(() =>
  import("./components/RestaurantView").then((m) => ({ default: m.RestaurantView }))
);

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
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [isAddRestaurantOpen, setIsAddRestaurantOpen] = useState(false);
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background font-sans text-foreground selection:bg-salmon-light selection:text-salmon flex flex-col">
      <div className="flex-1">
        {selectedRestaurantId ? (
          <Suspense fallback={<div className="min-h-[100dvh] bg-background" />}>
            <RestaurantView
              restaurantId={selectedRestaurantId}
              onBack={() => setSelectedRestaurantId(null)}
              store={store}
              isAddDishOpen={isAddDishOpen}
              setIsAddDishOpen={setIsAddDishOpen}
            />
          </Suspense>
        ) : (
          <Home
            onSelectRestaurant={setSelectedRestaurantId}
            store={store}
            isDialogOpen={isAddRestaurantOpen}
            setIsDialogOpen={setIsAddRestaurantOpen}
          />
        )}
      </div>

      <footer className="sticky bottom-0 bg-background">
        {/* Mobile: FAB contestuale + colophon */}
        <div className="sm:hidden px-4 pt-3 pb-6 flex flex-col items-center gap-3">
          {!selectedRestaurantId && store.state.restaurants.length > 0 && (
            <Button
              onClick={() => setIsAddRestaurantOpen(true)}
              className="w-full max-w-sm rounded-full h-14 text-base font-semibold gap-2 bg-salmon text-white hover:bg-salmon/90 active:scale-[0.98] transition-all"
            >
              <Plus className="w-5 h-5" />
              Nuovo Ristorante
            </Button>
          )}
          {selectedRestaurantId && (
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
