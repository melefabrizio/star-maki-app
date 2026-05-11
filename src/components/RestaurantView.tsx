import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import { ArrowLeft, Plus, Check, Clock, ThumbsUp, ThumbsDown, CircleDashed, Trash2, Search, Pencil } from "lucide-react";
import { useAppStore, Dish } from "../lib/store";
import { useHaptic } from "../lib/useHaptic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

interface RestaurantViewProps {
  restaurantId: string;
  onBack: () => void;
  store: ReturnType<typeof useAppStore>;
  isAddDishOpen: boolean;
  setIsAddDishOpen: (v: boolean) => void;
}

export function RestaurantView({ restaurantId, onBack, store, isAddDishOpen, setIsAddDishOpen }: RestaurantViewProps) {
  const { state, addDish, updateDish, deleteDish, updateDishRating, addOrderItem, toggleOrderItemArrived, removeOrderItem, clearActiveOrder, deleteRestaurant } = store;
  const haptic = useHaptic();
  
  const restaurant = state.restaurants.find(r => r.id === restaurantId);
  const dishes = useMemo(() => state.dishes.filter(d => d.restaurantId === restaurantId), [state.dishes, restaurantId]);
  const activeOrder = useMemo(() => state.activeOrders[restaurantId] || [], [state.activeOrders, restaurantId]);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [deletingDish, setDeletingDish] = useState<Dish | null>(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [newDishName, setNewDishName] = useState("");
  const [newDishNumber, setNewDishNumber] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  if (!restaurant) return null;

  const handleCreateAndAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDishName.trim()) {
      const dish = addDish(restaurantId, newDishName.trim(), newDishNumber.trim() || undefined);
      addOrderItem(restaurantId, dish.id);
      haptic();
      setNewDishName("");
      setNewDishNumber("");
      setIsAddDishOpen(false);
    }
  };

  const handleUpdateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDish && editName.trim()) {
      updateDish(editingDish.id, editName.trim(), editNumber.trim() || undefined);
      setEditingDish(null);
    }
  };

  const pendingItems = activeOrder.filter(item => !item.arrived);
  const arrivedItems = activeOrder.filter(item => item.arrived);

  const prevPendingCount = useRef(pendingItems.length);
  const badgeControls = useAnimationControls();

  useEffect(() => {
    if (pendingItems.length > prevPendingCount.current) {
      badgeControls.start({ scale: [1, 1.6, 0.88, 1] });
    }
    prevPendingCount.current = pendingItems.length;
  }, [pendingItems.length]);

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (d.number && d.number.includes(searchQuery))
  );

  const renderRatingButtons = (dish: Dish) => (
    <div className="flex bg-muted/40 rounded-full p-1 max-w-[fit-content] border border-border/30">
      <button
        type="button"
        onClick={() => updateDishRating(dish.id, dish.rating === 'liked' ? 'unrated' : 'liked')}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${dish.rating === 'liked' ? 'bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-salmon border-transparent' : 'text-muted-foreground opacity-60 hover:opacity-100 hover:bg-card/50'}`}
      >
        <ThumbsUp className={`w-4 h-4 ${dish.rating === 'liked' ? 'fill-current' : ''}`} />
      </button>
      <button
        type="button"
        onClick={() => updateDishRating(dish.id, dish.rating === 'disliked' ? 'unrated' : 'disliked')}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${dish.rating === 'disliked' ? 'bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-nori border-transparent' : 'text-muted-foreground opacity-60 hover:opacity-100 hover:bg-card/50'}`}
      >
        <ThumbsDown className={`w-4 h-4 ${dish.rating === 'disliked' ? 'fill-current' : ''}`} />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col bg-background">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-md px-4 shrink-0 sticky top-0 z-30 pt-2 pb-2">
        <div className="h-14 flex items-center justify-between border-b border-border/60">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full h-10 w-10 shrink-0 hover:bg-muted">
              <ArrowLeft className="w-5 h-5 text-nori" />
             </Button>
             <h1 className="text-xl sm:text-2xl font-bold font-display text-nori truncate max-w-[200px] sm:max-w-none">
               {restaurant.name}
             </h1>
           </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteOpen(true)}
              className="h-9 rounded-full px-3 gap-1.5 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Elimina</span>
            </Button>

          <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
            <DialogTrigger render={<Button className="hidden sm:flex h-10 rounded-full gap-2 px-5 bg-salmon text-white font-semibold hover:bg-salmon/90 active:scale-[0.97] transition-all" />}>
              <Plus className="w-4 h-4" />
              Piatto
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[2rem] shadow-xl">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-nori">Aggiungi Piatto</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateAndAddDish} className="space-y-6 pt-4">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="dish-number" className="text-muted-foreground">Codice (opzionale)</Label>
                    <Input
                      id="dish-number"
                      placeholder="es. 42"
                      value={newDishNumber}
                      onChange={(e) => setNewDishNumber(e.target.value)}
                      className="w-full sm:w-32 font-mono text-base h-12 rounded-xl bg-muted/30 border-transparent focus-visible:ring-salmon px-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dish-name" className="text-muted-foreground text-sm">Nome del piatto *</Label>
                    <Input
                      id="dish-name"
                      placeholder="es. Uramaki Spicy Salmon"
                      value={newDishName}
                      onChange={(e) => setNewDishName(e.target.value)}
                      autoFocus
                      className="h-12 text-base rounded-xl bg-muted/30 border-transparent focus-visible:ring-salmon px-4"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6 gap-2 sm:gap-0">
                  <DialogClose render={<Button variant="ghost" type="button" className="rounded-full h-10" />}>
                    Annulla
                  </DialogClose>
                  <Button type="submit" disabled={!newDishName.trim()} className="w-full sm:w-auto h-10 rounded-full px-6 bg-salmon hover:bg-salmon/90 text-white font-medium text-sm">
                    Salva e Aggiungi
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
        <div className="px-4 py-2 bg-background/80 backdrop-blur-md shrink-0 sticky top-[72px] z-20 transition-all">
          <TabsList className="w-full h-12 grid grid-cols-2 rounded-[1rem] bg-muted/50 p-1 shadow-inner">
            <TabsTrigger value="active" className="rounded-[0.75rem] text-sm font-medium transition-all data-[state=active]:bg-card data-[state=active]:text-salmon data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              Ordinato
              {pendingItems.length > 0 && (
                <motion.span
                  animate={badgeControls}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  className="ml-2 bg-salmon/10 text-salmon text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full inline-block"
                >
                  {pendingItems.length}
                </motion.span>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-[0.75rem] text-sm font-medium transition-all data-[state=active]:bg-card data-[state=active]:text-nori data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              Menù
            </TabsTrigger>
          </TabsList>
        </div>

        <div>
          {/* ACTIVE ORDER TAB */}
          <TabsContent value="active" className="m-0 p-3 sm:p-4 space-y-6 focus-visible:outline-none">
            {activeOrder.length === 0 ? (
              <div className="text-center py-12 px-4 mt-4">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-medium font-display text-nori mb-2">Tavolo vuoto</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8 text-sm leading-relaxed">
                  Inizia ad aggiungere i piatti dal menù o creane di nuovi con il tasto in basso.
                </p>
                <Button onClick={() => setActiveTab("history")} variant="outline" className="rounded-full h-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-border hover:bg-card bg-card hover:text-salmon px-6 text-sm">
                  Sfoglia i tuoi piatti
                </Button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-10">
                {/* Pending */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-salmon" />
                      In arrivo ({pendingItems.length})
                    </h2>
                  </div>
                  
                  {pendingItems.length === 0 ? (
                    <div className="text-center py-8 bg-transparent rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
                      Niente in arrivo. Clicca sui piatti nel menù per aggiungerli!
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      {pendingItems.map((item) => {
                        const dish = dishes.find(d => d.id === item.dishId);
                        if (!dish) return null;
                        
                        return (
                          <Card key={item.id} className="border-transparent bg-card shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all rounded-[1rem] overflow-hidden">
                            <CardContent className="p-1 sm:p-1.5 pl-2 flex items-center gap-3">
                              <button
                                onClick={() => { toggleOrderItemArrived(restaurantId, item.id); haptic(); }}
                                className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-border hover:border-salmon hover:bg-salmon-light flex items-center justify-center transition-all bg-card shadow-sm"
                              >
                                <span className="sr-only">Segna come arrivato</span>
                              </button>
                              
                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                {dish.number && (
                                  <div className="font-mono text-xs font-semibold text-muted-foreground bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                    {dish.number}
                                  </div>
                                )}
                                <span className="font-medium text-[15px] sm:text-base text-nori truncate">
                                  {dish.name}
                                </span>
                              </div>

                              <div className="flex items-center shrink-0">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                                  onClick={() => removeOrderItem(restaurantId, item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Arrived */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-muted-foreground" />
                      Arrivati ({arrivedItems.length})
                    </h2>
                    {arrivedItems.length > 0 && (
                      <Button variant="ghost" size="sm" className="h-8 rounded-full text-sm text-muted-foreground hover:bg-muted" onClick={() => { clearActiveOrder(restaurantId); haptic(); }}>
                        Pulisci
                      </Button>
                    )}
                  </div>

                  {arrivedItems.length === 0 ? (
                    null
                  ) : (
                    <div className="grid gap-2">
                      {arrivedItems.map((item) => {
                        const dish = dishes.find(d => d.id === item.dishId);
                        if (!dish) return null;
                        
                        return (
                          <Card key={item.id} className="border-transparent bg-card shadow-sm rounded-[1rem] overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                            <CardContent className="p-1 sm:p-1.5 pl-2 flex items-center gap-3">
                              <button
                                onClick={() => { toggleOrderItemArrived(restaurantId, item.id); haptic(); }}
                                className="flex-shrink-0 w-9 h-9 rounded-full border border-nori/20 bg-nori/5 text-nori flex items-center justify-center transition-all hover:bg-nori/10 hover:scale-105"
                              >
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              </button>
                              
                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                {dish.number && (
                                  <div className="font-mono text-xs font-medium text-muted-foreground/70 shrink-0 bg-muted/50 w-8 h-8 rounded-full flex items-center justify-center">
                                    {dish.number}
                                  </div>
                                )}
                                <span className="text-muted-foreground font-medium line-through decoration-muted-foreground/30 truncate text-[15px] sm:text-base">
                                  {dish.name}
                                </span>
                              </div>

                              <div className="shrink-0 scale-90 sm:scale-100 origin-right">
                                {renderRatingButtons(dish)}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* HISTORY/MENU TAB */}
          <TabsContent value="history" className="m-0 p-3 sm:p-4 space-y-6 focus-visible:outline-none">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                <Input
                  placeholder="Cerca un piatto o un numero..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-card border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.03)] rounded-xl text-base focus-visible:ring-nori/20 placeholder:text-muted-foreground/50"
                />
              </div>
              
              {dishes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 bg-card shadow-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-xl font-medium font-display text-nori mb-2">Nessun piatto</h3>
                  <p className="text-[15px] mt-1 text-muted-foreground max-w-sm mx-auto leading-relaxed">Aggiungi piatti con il tasto in basso, li ritroverai qui ogni volta.</p>
                </div>
              ) : filteredDishes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-[15px]">Nessun risultato per "{searchQuery}".</p>
                </div>
              ) : (
                <div className="grid gap-2">
                  {['liked', 'unrated', 'disliked'].map(ratingGroup => {
                    const groupDishes = filteredDishes.filter(d => d.rating === ratingGroup);
                    if (groupDishes.length === 0) return null;
                    
                    return (
                      <div key={ratingGroup} className="mb-12 last:mb-0">
                        <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 px-2 flex items-center gap-1.5">
                          {ratingGroup === 'liked' && <><ThumbsUp className="w-3.5 h-3.5 text-salmon"/> Preferiti</>}
                          {ratingGroup === 'unrated' && <><CircleDashed className="w-3.5 h-3.5"/> Da votare</>}
                          {ratingGroup === 'disliked' && <><ThumbsDown className="w-3.5 h-3.5 text-nori"/> Evita</>}
                        </h4>
                        <div className="grid gap-2">
                          {groupDishes.map((dish) => (
                            <Card key={dish.id} className={`py-2! bg-card shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all border-transparent rounded-[1rem] overflow-hidden group ${dish.rating === 'disliked' ? 'opacity-70 hover:opacity-100' : ''}`}>
                              <CardContent className="p-2 sm:p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    {dish.number && (
                                      <div className="font-mono text-xs font-semibold text-muted-foreground bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                        {dish.number}
                                      </div>
                                    )}
                                    <span className="flex-1 font-semibold text-[15px] sm:text-base text-nori truncate">{dish.name}</span>
                                    <button
                                      onClick={() => { setEditingDish(dish); setEditName(dish.name); setEditNumber(dish.number ?? ""); }}
                                      className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground/40 hover:text-nori hover:bg-muted transition-colors"
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setDeletingDish(dish)}
                                      className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto shrink-0 border-t border-border/40 sm:border-t-0 pt-1.5 sm:pt-0">
                                  <div className="scale-90 origin-left sm:scale-95 sm:origin-right">
                                    {renderRatingButtons(dish)}
                                  </div>
                                  
                                  <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    className="h-9 px-4 sm:px-5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] font-medium text-[13px] sm:text-sm gap-1 text-nori bg-muted/60 hover:bg-nori hover:text-white transition-all"
                                    onClick={() => { addOrderItem(restaurantId, dish.id); haptic(); }}
                                  >
                                    Ordina
                                    <span className="opacity-60 text-xs ml-0.5 font-mono font-semibold">+1</span>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-foreground">Elimina ristorante</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm pt-2">
            Vuoi eliminare <span className="font-semibold text-foreground">{restaurant.name}</span> e tutta la sua cronologia? L'operazione non è reversibile.
          </p>
          <DialogFooter className="mt-6 gap-2">
            <DialogClose render={<Button variant="ghost" className="rounded-full h-10" />}>
              Annulla
            </DialogClose>
            <Button
              className="rounded-full h-10 px-6 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { deleteRestaurant(restaurantId); onBack(); }}
            >
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog modifica piatto */}
      <Dialog open={!!editingDish} onOpenChange={open => { if (!open) setEditingDish(null); }}>
        <DialogContent className="sm:max-w-md rounded-[2rem] shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-nori">Modifica Piatto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateDish} className="space-y-6 pt-4">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="edit-number" className="text-muted-foreground">Codice (opzionale)</Label>
                <Input
                  id="edit-number"
                  placeholder="es. 42"
                  value={editNumber}
                  onChange={e => setEditNumber(e.target.value)}
                  className="w-full sm:w-32 font-mono text-base h-12 rounded-xl bg-muted/30 border-transparent focus-visible:ring-salmon px-4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-muted-foreground text-sm">Nome del piatto *</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  autoFocus
                  className="h-12 text-base rounded-xl bg-muted/30 border-transparent focus-visible:ring-salmon px-4"
                />
              </div>
            </div>
            <DialogFooter className="mt-6 gap-2 sm:gap-0">
              <DialogClose render={<Button variant="ghost" type="button" className="rounded-full h-10" />}>
                Annulla
              </DialogClose>
              <Button type="submit" disabled={!editName.trim()} className="w-full sm:w-auto h-10 rounded-full px-6 bg-salmon hover:bg-salmon/90 text-white font-medium text-sm">
                Salva
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog conferma eliminazione piatto */}
      <Dialog open={!!deletingDish} onOpenChange={open => { if (!open) setDeletingDish(null); }}>
        <DialogContent className="sm:max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-foreground">Elimina piatto</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm pt-2">
            Vuoi eliminare <span className="font-semibold text-foreground">{deletingDish?.name}</span>? L'operazione non è reversibile.
          </p>
          <DialogFooter className="mt-6 gap-2">
            <DialogClose render={<Button variant="ghost" className="rounded-full h-10" />}>
              Annulla
            </DialogClose>
            <Button
              className="rounded-full h-10 px-6 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { deleteDish(deletingDish!.id); setDeletingDish(null); }}
            >
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
