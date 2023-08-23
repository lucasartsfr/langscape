import './App.css'
import Menu from './component/Menu'
import Card from './component/Card'
import SearchBar from './component/SearchBar'
import { useAppContext } from './component/AppContext'
import DrawerBottom from './component/DrawerBottom'


function App() {

  const {showDrawer, setShowDrawer, favorite, customWord, refetch } = useAppContext();

  const loadFavorite = (fav) =>{
    customWord.current = fav;
    refetch();
    console.log(fav)
    setShowDrawer(false);
    customWord.current = "";
}


   
  const FavoriteCard = favorite?.map((fav, index) => {
    return(
      <div className='CardFavorite' key={fav+index} onClick={() => loadFavorite(fav)}>
        <h3>{fav}</h3>
      </div>
    )
  })
  

  return (
    <>
      <DrawerBottom  
        stateHandler={[showDrawer, setShowDrawer]}        
        autoOpen={1}
        // handleColor="white"
        grabColor="grey"
        // contentColor="white"

      >        
        {FavoriteCard}
      </DrawerBottom>
      <SearchBar />
      <Card />
      <Menu />      
    </>
  )
}

export default App
