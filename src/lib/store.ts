import { useState, useEffect } from "react";

export type Rating = "liked" | "disliked" | "unrated";

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  number?: string;
  rating: Rating;
}

export interface OrderItem {
  id: string;
  dishId: string;
  arrived: boolean;
  createdAt: number;
}

export interface Restaurant {
  id: string;
  name: string;
  createdAt: number;
}

export interface AppState {
  restaurants: Restaurant[];
  dishes: Dish[];
  activeOrders: Record<string, OrderItem[]>;
}

const STORAGE_KEY = "sushi_app_data";

const defaultState: AppState = {
  restaurants: [],
  dishes: [],
  activeOrders: {},
};

export function useAppStore() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AppState;
      }
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }, [state]);

  const addRestaurant = (name: string) => {
    const newRestaurant: Restaurant = {
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
    };
    setState((prev) => ({
      ...prev,
      restaurants: [...prev.restaurants, newRestaurant],
      activeOrders: { ...prev.activeOrders, [newRestaurant.id]: [] },
    }));
    return newRestaurant;
  };

  const deleteRestaurant = (id: string) => {
    setState((prev) => {
      const newOrders = { ...prev.activeOrders };
      delete newOrders[id];
      return {
        ...prev,
        restaurants: prev.restaurants.filter((r) => r.id !== id),
        dishes: prev.dishes.filter((d) => d.restaurantId !== id),
        activeOrders: newOrders,
      };
    });
  };

  const addDish = (restaurantId: string, name: string, number?: string) => {
    const newDish: Dish = {
      id: crypto.randomUUID(),
      restaurantId,
      name,
      number,
      rating: "unrated",
    };
    setState((prev) => ({
      ...prev,
      dishes: [...prev.dishes, newDish],
    }));
    return newDish;
  };

  const updateDish = (dishId: string, name: string, number?: string) => {
    setState((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) => (d.id === dishId ? { ...d, name, number } : d)),
    }));
  };

  const deleteDish = (dishId: string) => {
    setState((prev) => ({
      ...prev,
      dishes: prev.dishes.filter((d) => d.id !== dishId),
      activeOrders: Object.fromEntries(
        Object.entries(prev.activeOrders).map(([rid, items]) => [
          rid,
          items.filter((i) => i.dishId !== dishId),
        ])
      ),
    }));
  };

  const updateDishRating = (dishId: string, rating: Rating) => {
    setState((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) => (d.id === dishId ? { ...d, rating } : d)),
    }));
  };

  const addOrderItem = (restaurantId: string, dishId: string) => {
    const newItem: OrderItem = {
      id: crypto.randomUUID(),
      dishId,
      arrived: false,
      createdAt: Date.now(),
    };
    setState((prev) => ({
      ...prev,
      activeOrders: {
        ...prev.activeOrders,
        [restaurantId]: [...(prev.activeOrders[restaurantId] || []), newItem],
      },
    }));
  };

  const toggleOrderItemArrived = (restaurantId: string, itemId: string) => {
    setState((prev) => ({
      ...prev,
      activeOrders: {
        ...prev.activeOrders,
        [restaurantId]: prev.activeOrders[restaurantId].map((item) =>
          item.id === itemId ? { ...item, arrived: !item.arrived } : item
        ),
      },
    }));
  };

  const removeOrderItem = (restaurantId: string, itemId: string) => {
    setState((prev) => ({
      ...prev,
      activeOrders: {
        ...prev.activeOrders,
        [restaurantId]: prev.activeOrders[restaurantId].filter((i) => i.id !== itemId),
      },
    }));
  };

  const clearActiveOrder = (restaurantId: string) => {
    setState((prev) => ({
      ...prev,
      activeOrders: {
        ...prev.activeOrders,
        [restaurantId]: prev.activeOrders[restaurantId].filter((i) => !i.arrived),
      },
    }));
  };

  return {
    state,
    addRestaurant,
    deleteRestaurant,
    addDish,
    updateDish,
    deleteDish,
    updateDishRating,
    addOrderItem,
    toggleOrderItemArrived,
    removeOrderItem,
    clearActiveOrder,
  };
}
