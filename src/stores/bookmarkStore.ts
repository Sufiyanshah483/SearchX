import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: string[];
  addBookmark: (tweetId: string) => void;
  removeBookmark: (tweetId: string) => void;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (tweetId) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, tweetId],
        })),
      removeBookmark: (tweetId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((id) => id !== tweetId),
        })),
      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'searchx-bookmarks',
    }
  )
);
