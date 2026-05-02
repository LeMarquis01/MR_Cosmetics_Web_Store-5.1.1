import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { PRODUCTS } from '../data/products';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  query, 
  orderBy, 
  writeBatch,
  getDocs
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addLoyaltyPoints: (points: number) => Promise<void>;
  placeOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => Promise<void>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: authUser, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const isAdmin = authUser?.email === 'member@mrcosmetics.co.ug' || authUser?.email === 'micahndungu01@gmail.com';

  // 1. Sync Products
  useEffect(() => {
    const productsPath = 'products';
    const q = query(collection(db, productsPath), orderBy('name'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Product[];
      
      // If collection is empty, seed it if user is admin
      if (productsData.length === 0 && PRODUCTS.length > 0 && isAdmin) {
        seedProducts();
      } else {
        setProducts(productsData);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, productsPath);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const seedProducts = async () => {
    const batch = writeBatch(db);
    PRODUCTS.forEach(p => {
      const { id, ...data } = p;
      const ref = doc(db, 'products', id);
      batch.set(ref, data);
    });
    try {
      await batch.commit();
    } catch (error) {
      console.error("Seeding failed", error);
    }
  };

  // 2. Sync User Profile & Orders
  useEffect(() => {
    if (authLoading || !authUser) {
      setUser(null);
      setOrders([]);
      return;
    }

    const userPath = `users/${authUser.uid}`;
    const userRef = doc(db, 'users', authUser.uid);
    
    const unsubscribeUser = onSnapshot(userRef, async (snapshot) => {
      if (snapshot.exists()) {
        setUser({ id: snapshot.id, ...snapshot.data() } as User);
      } else {
        // Create initial user profile
        const newUser: User = {
          id: authUser.uid,
          email: authUser.email || '',
          name: authUser.displayName || authUser.email?.split('@')[0] || 'Member',
          loyaltyPoints: 0,
          addresses: [],
          avatar: authUser.photoURL || undefined
        };
        try {
          const { id, ...userData } = newUser;
          await setDoc(doc(db, 'users', authUser.uid), userData);
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, userPath);
        }
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, userPath);
    });

    const ordersPath = `users/${authUser.uid}/orders`;
    const ordersQ = query(collection(db, ordersPath), orderBy('date', 'desc'));
    const unsubscribeOrders = onSnapshot(ordersQ, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[]);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, ordersPath);
    });

    return () => {
      unsubscribeUser();
      unsubscribeOrders();
    };
  }, [authUser, authLoading]);

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const addLoyaltyPoints = async (points: number) => {
    if (user && authUser) {
      const userPath = `users/${authUser.uid}`;
      try {
        await updateDoc(doc(db, 'users', authUser.uid), {
          loyaltyPoints: user.loyaltyPoints + points
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, userPath);
      }
    }
  };

  const placeOrder = async (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    if (!authUser) return;
    
    const ordersPath = `users/${authUser.uid}/orders`;
    const newOrder = {
      ...orderData,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    try {
      await addDoc(collection(db, ordersPath), newOrder);
      await addLoyaltyPoints(Math.floor(orderData.total));
      clearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, ordersPath);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      products,
      cart,
      user,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addLoyaltyPoints,
      placeOrder,
      setProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
