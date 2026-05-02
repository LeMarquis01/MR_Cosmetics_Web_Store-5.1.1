import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from './AuthContext';

interface WishlistItem {
  id: string;
  productId: string;
  addedAt: any;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  loading: boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'wishlist'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WishlistItem[];
      setWishlistItems(items);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/wishlist`);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleWishlist = async (productId: string) => {
    if (!user) return;

    const existing = wishlistItems.find(item => item.productId === productId);
    
    if (existing) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'wishlist', existing.id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/wishlist/${existing.id}`);
      }
    } else {
      try {
        await addDoc(collection(db, 'users', user.uid, 'wishlist'), {
          productId,
          addedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/wishlist`);
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, loading, toggleWishlist, isInWishlist }}>
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
