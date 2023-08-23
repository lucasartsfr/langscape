import React, { createContext, useContext, useRef, useState } from 'react';
import { useQuery } from 'react-query';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // Place Holder for Loading
  const loader = {
    ExampleFrom : ["When data are not available and need to be loaded."],
    ExampleTo : ["L'application Langscape est en train de charger..."],
    Definition : {
      en : ['Application to learn vocabulary'],
      fr : ['Application pour apprendre du vocabulaire']
    },
    From : ["langscape"],
    To : ["chargement"],
    Word : ["langscape"]
  }
  const [translate, setTranslate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [favorite, setFavorite] = useState(() => {
    const storedFavorites = localStorage.getItem("Favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [showDrawer, setShowDrawer] = useState(false);
  const customWord = useRef();
  const cardRef = useRef();

  // Request
  const { data, isLoading, isError, refetch, isFetching  } = useQuery('vocabulary', async () => {
    console.log("Fetching")
    const req = (customWord?.current) ? customWord?.current : "rnd";
    const response = await fetch(`https://api.lucasarts.fr/vocabulary/${req}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  {
    staleTime: Infinity, // Durée de validité en millisecondes (60 secondes dans cet exemple)
  });

  // Swipe Action
  const swipe = async (dir) => {
    await cardRef.current.swipe(dir) // Swipe the card!
  }

  // Initial Loader and then display data
  const theData = (data) ? data : loader;
  
  const contextValue = {
    translate,  setTranslate,
    visible,  setVisible,
    data, isLoading, isError, refetch, isFetching,
    customWord,
    swipe, cardRef,
    loader, theData,
    randomize, setRandomize,
    favorite, setFavorite,
    showDrawer, setShowDrawer
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
