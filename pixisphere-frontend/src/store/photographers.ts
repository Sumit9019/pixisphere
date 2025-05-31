import { create } from 'zustand';

export type Photographer = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

interface PhotographerState {
  photographers: Photographer[];
  filtered: Photographer[];
  loading: boolean;
  error: string | null;
  fetchPhotographers: () => Promise<void>;
  setFiltered: (filtered: Photographer[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePhotographerStore = create<PhotographerState>((set) => ({
  photographers: [],
  filtered: [],
  loading: false,
  error: null,
  fetchPhotographers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/photographers');
      const data = await res.json();
      set({ photographers: data, filtered: data, loading: false });
    } catch {
      set({ error: 'Failed to fetch photographers', loading: false });
    }
  },
  setFiltered: (filtered) => set({ filtered }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
