import React from "react";
import { Plus, ChevronRight, Utensils } from "lucide-react";
import { useAppStore } from "../lib/store";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

interface HomeProps {
  onSelectRestaurant: (id: string) => void;
  store: ReturnType<typeof useAppStore>;
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
}

export function Home({ onSelectRestaurant, store, isDialogOpen, setIsDialogOpen }: HomeProps) {
  const { state, addRestaurant } = store;
  const [newRestaurantName, setNewRestaurantName] = useState("");

  const handleAddRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRestaurantName.trim()) {
      addRestaurant(newRestaurantName.trim());
      setNewRestaurantName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col sm:pb-4">
      <header className="flex justify-between items-center top-0 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display text-nori">*maki</h1>
          <p className="text-muted-foreground mt-1 text-[15px]">Organizza i tuoi ordini All You Can Eat</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="hidden sm:flex h-10 rounded-full gap-2 px-5 bg-salmon text-white font-semibold hover:bg-salmon/90 active:scale-[0.97] transition-all" />}>
            <Plus className="w-4 h-4" />
            Nuovo
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-nori">Aggiungi Ristorante</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddRestaurant} className="space-y-4 pt-4">
              <Input
                placeholder="Nome del ristorante..."
                value={newRestaurantName}
                onChange={(e) => setNewRestaurantName(e.target.value)}
                autoFocus
                className="h-12 text-base rounded-2xl bg-muted/50 border-transparent focus-visible:ring-salmon px-4"
              />
              <DialogFooter className="mt-6 gap-2">
                <DialogClose render={<Button variant="ghost" type="button" className="rounded-full h-10" />}>
                  Annulla
                </DialogClose>
                <Button type="submit" disabled={!newRestaurantName.trim()} className="rounded-full h-10 px-6 bg-salmon hover:bg-salmon/90 text-white font-medium">
                  Aggiungi
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="flex-1">
        <div className="grid content-start gap-3 sm:gap-4">
          {state.restaurants.length === 0 ? (
            <div className="text-center py-16 px-4 bg-transparent rounded-[2rem] border border-dashed border-border/80">
            <div className="w-16 h-16 rounded-full bg-card shadow-sm flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-6 h-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-xl font-medium font-display text-nori mb-2">Nessun ristorante</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-[15px] leading-relaxed">
              Aggiungi un ristorante per iniziare a organizzare i tuoi piatti.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="rounded-full h-10 px-6 text-sm shadow-[0_2px_10px_rgba(0,0,0,0.03)] border-transparent bg-card hover:bg-card hover:text-salmon hover:shadow-md transition-all">
              Aggiungi Ristorante
            </Button>
          </div>
        ) : (
          state.restaurants.map((restaurant) => {
            const activeOrderCount = (state.activeOrders[restaurant.id] || []).filter(o => !o.arrived).length;

            return (
              <Card
                key={restaurant.id}
                className="group cursor-pointer border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all active:scale-[0.98] rounded-[2rem] overflow-hidden bg-card"
                onClick={() => onSelectRestaurant(restaurant.id)}
              >
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="flex-1 p-4 sm:p-5">
                    <h3 className="font-bold text-xl font-display text-nori">{restaurant.name}</h3>
                    {activeOrderCount > 0 && (
                      <p className="text-xs text-salmon font-semibold mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-salmon animate-pulse" />
                        {activeOrderCount} {activeOrderCount === 1 ? 'piatto in attesa' : 'piatti in attesa'}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center pr-4">
<div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 group-hover:bg-salmon/5 group-hover:text-salmon transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
        </div>
      </div>
    </div>
  );
}
