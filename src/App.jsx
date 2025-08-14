import './App.css';
import Menu from './component/Menu';
import Card from './component/Card';
import SearchBar from './component/SearchBar';
import DrawerBottom from './component/DrawerBottom';
import useStore, { fetchVocabularyData } from './store/zustand';
import { useQuery } from 'react-query';
import { useCallback, useMemo } from 'react';

function App() {
  const { showDrawer, setShowDrawer, favorite, customWord, fetchVocabulary, setData, nextCard } = useStore();
  const loader = {
    WordTraductionEn: "Loading...",
    WordTraductionFr: "Chargement...",
    WordExemplesEn: "Loading example...",
    WordExemplesFr: "Exemple en cours de chargement...",
    WordDefinitionEn: "Loading definition...",
    WordDefinitionFr: "Définition en cours de chargement...",
    WordPhoneticEn: "Looking for the best word...",
    WordPhoneticFr: "Nous recherchons le meilleur mot...",
    PlayPhraseVideo: null, // ou un URL de vidéo placeholder si tu veux
    PlayPhraseSubtitle: "Video loading..."
  };
  

  // Query avec React Query – loading/error gérés automatiquement
  const { data, isLoading, isError, isFetching } = useQuery(
    ['vocabulary', customWord],
    () => fetchVocabularyData(customWord),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      placeholderData : loader,
      retry: 1,
      onSuccess: (data) => {
        //nextCard(); // Incrémente l'ID de la carte après succès
        setData(data); // garde les données dans Zustand
      },
    }
  );

  // Optimiser loadFavorite avec useCallback
  const loadFavorite = useCallback(
    (fav) => {
      console.log('Loading favorite:', fav);
      fetchVocabulary(fav);
      setShowDrawer(false);
    },
    [fetchVocabulary, setShowDrawer]
  );

  // Génération des cartes favorites
  const FavoriteCard = useMemo(() => {
    if (!favorite || favorite.length === 0) {
      return <div className="no-favorites">Aucun favori</div>;
    }

    return favorite.map((fav, index) => (
      <div
        className="CardFavorite"
        key={`${fav}-${index}`}
        onClick={() => loadFavorite(fav)}
      >
        <h3>{fav}</h3>
      </div>
    ));
  }, [favorite, loadFavorite]);


  return (
    <>
      <DrawerBottom
        stateHandler={[showDrawer, setShowDrawer]}
        autoOpen={1}
        grabColor="grey"
      >
        {FavoriteCard}
      </DrawerBottom>

      <SearchBar />

      {/* {isLoading || isFetching && <div className="loader">Chargement...</div>}
      {isError && <div className="error">Erreur de chargement</div>} */}
      {data && <Card queryData={isFetching  || isLoading ? loader : data} />}

      <Menu />
    </>
  );
}

export default App;
