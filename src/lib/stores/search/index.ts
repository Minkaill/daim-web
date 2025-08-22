import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ISearchStore {
  value: string;
  savedValue: string;
  timeoutId: any;
}

interface SearchState extends ISearchStore {
  setValue: (value: string) => void;
  clearTimeout: () => void;
}

const initialState: ISearchStore = {
  value: "",
  savedValue: "",
  timeoutId: null,
};

export const useSearchStore = create(
  immer<SearchState>((set, get) => ({
    ...initialState,

    setValue: (value) => {
      if (get().timeoutId) {
        clearTimeout(get().timeoutId);
      }

      set((state) => {
        state.value = value;
        state.timeoutId = setTimeout(() => {
          set((state) => {
            state.savedValue = value;
          });
        }, 500);
      });
    },

    clearTimeout: () => {
      if (get().timeoutId) {
        clearTimeout(get().timeoutId);
        set((state) => {
          state.timeoutId = null;
        });
      }
    },
  }))
);
