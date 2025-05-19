
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface WishlistContextType {
  favorites: number[];
  addToFavorites: (propertyId: number) => void;
  removeFromFavorites: (propertyId: number) => void;
  isFavorite: (propertyId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (propertyId: number) => {
    if (!favorites.includes(propertyId)) {
      setFavorites(prev => [...prev, propertyId]);
      toast.success("Property added to favorites!");
    }
  };

  const removeFromFavorites = (propertyId: number) => {
    setFavorites(prev => prev.filter(id => id !== propertyId));
    toast.info("Property removed from favorites");
  };

  const isFavorite = (propertyId: number) => {
    return favorites.includes(propertyId);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
