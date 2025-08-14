// zustand.jsx
import { create } from 'zustand';
import { queryClient } from '../main';

const loader = {
  ExampleFrom: ["When data are not available and need to be loaded."],
  ExampleTo: ["L'application Langscape est en train de charger..."],
  Definition: {
    en: ['Application to learn vocabulary'],
    fr: ['Application pour apprendre du vocabulaire']
  },
  From: ["langscape"],
  To: ["chargement"],
  Word: ["langscape"]
};

export const fetchVocabularyData = async (customWord) => {
  const req = customWord ? customWord : "";
  console.log('📡 Making request to:', `http://localhost:3000/search?q=${req}&trad=true`);
  const response = await fetch(`http://localhost:3000/search?q=${req}&trad=true`);
  if (!response.ok) {
    console.error('❌ Request failed:', response.status, response.statusText);
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('✅ Data received:', data);
  return data;
};

const useStore = create((set, get) => ({
  translate: false,
  setTranslate: (value) => set({ translate: value }),
  toggleTranslate: () => set((state) => ({ translate: !state.translate })),

  visible: false,
  setVisible: (value) => set({ visible: value }),
  toggleVisible: () => set((state) => ({ visible: !state.visible })),

  randomize: false,
  setRandomize: (value) => set({ randomize: value }),

  favorite: (() => {
    try {
      const storedFavorites = localStorage.getItem("Favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  })(),
  setFavorite: (value) => {
    set({ favorite: value });
    try {
      localStorage.setItem("Favorites", JSON.stringify(value));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  },
  addFavorite: (word) => {
    if (!word) return;
    const { favorite } = get();
    let newFavorites;
    if (favorite.includes(word)) {
      newFavorites = favorite.filter((w) => w !== word);
    } else {
      newFavorites = [...favorite, word];
    }
    get().setFavorite(newFavorites);
  },

  showDrawer: false,
  setShowDrawer: (value) => set({ showDrawer: value }),

  customWord: "",
  setCustomWord: (value) => set({ customWord: value }),

  cardRef: null,
  setCardRef: (ref) => set({ cardRef: ref }),

  swipeCard: (direction) => {
    const ref = get().cardRef;
    if (ref && typeof ref.swipe === 'function') {
      ref.swipe(direction);
    }
  },

  loader,
  theData: loader,

  data: null,
  setData: (data) => set({ data: data, theData: data || loader }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  isError: false,
  setIsError: (error) => set({ isError: error }),

  // Anti-double appel
  isFetching: false,

  // Nouvel identifiant unique pour chaque carte
  cardId: 0,
  nextCard: () => set((state) => ({ cardId: state.cardId + 1 })),

  // Fetch optimisé avec génération nouvelle carte
//   fetchVocabulary: async (word = "") => {
//     const state = get();

//     if (state.isFetching) {
//       console.log('🚫 Already fetching, skipping...');
//       return;
//     }

//     console.log('🎯 fetchVocabulary called with word:', word);
//     set({ isFetching: true });

//     state.setVisible(false);
//     state.setTranslate(false);
//     state.setCustomWord(word);

//     try {
//       console.log('🔄 Invalidating queries...');
//       await queryClient.invalidateQueries({
//         queryKey: ['vocabulary'],
//         exact: false
//       });
//       console.log('✨ Query invalidation complete');

//       const data = await fetchVocabularyData(word);
//       set({ theData: data });
//       state.nextCard(); // 🔹 Force une nouvelle carte
//     } catch (error) {
//       console.error('Error fetching vocabulary:', error);
//     } finally {
//       set({ isFetching: false });
//     }
//   }
fetchVocabulary: (word = "") => {
  const state = get();

  if (state.isFetching) return;
  set({ isFetching: true });

  state.setVisible(false);
  state.setTranslate(false);
  state.setCustomWord(word);
  queryClient.invalidateQueries(['vocabulary', word]);

  set({ isFetching: false });  
  state.nextCard();
}
}));

export default useStore;
