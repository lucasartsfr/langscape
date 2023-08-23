import TinderCard from 'react-tinder-card'
import { useAppContext } from './AppContext'
import { PiStarFill } from 'react-icons/pi'; // Replace with your desired
import IconButton from './IconButton';


export default function Card() {

  const {translate, visible, refetch, cardRef, theData, setVisible, setTranslate, favorite, setFavorite, isFetching} = useAppContext()   

  const onSwipe = (direction) => {
    console.log('Card swipe to : ' + direction)
    refetch()
  }
      
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
    setVisible(false);
    setTranslate(false)
  }

  // Add to Favorite
  const addFavorite = () =>{
    if(favorite?.includes(theData?.Word)){
      const newFavorites = favorite?.filter(word => word !== theData?.Word);
      setFavorite(newFavorites);
      localStorage.setItem("Favorites", JSON.stringify(newFavorites));
    }
    else{
      const newFavorites = [...favorite, theData?.Word];
      setFavorite(newFavorites);
      localStorage.setItem("Favorites", JSON.stringify(newFavorites));
    }
   
  }

 
  return (
    <TinderCard 
        onSwipe={onSwipe} 
        onCardLeftScreen={() => onCardLeftScreen('Langscape')} 
        // preventSwipe={['right', 'left']}
        className={`Card`}
        key={theData?.Word}
        ref={cardRef}
    >
        <div className={`CardWrapper Flip-${translate}`}>
          <div className='Front'>
            <div className={`Upper Visible-${visible}`}>
                <h1>{theData?.Word || "Loading"}</h1>
                <IconButton icon={PiStarFill} size="2em" color={favorite?.includes(theData.Word) ? "#faee4d" : "#CECECE"} customClass="FavoriteButton" toggleIcon={PiStarFill} onClick={addFavorite} />
            </div>
            <div className='Under'>
                <span className='Definition'>{theData?.Definition?.en?.[0]}</span>
                <span className='Example'>{theData?.ExampleFrom?.[0]}</span>
            </div> 
          </div> 
          <div className='Back'>
              <div className={`Upper Visible-${visible}`}>
                  <h1>{theData?.To?.[0]?.split(',')?.[0]}</h1>
              </div>
              <div className='Under'>
                  <span className='Definition'>{theData?.Definition?.fr?.[0]}</span>
                  <span className='Example'>{theData?.ExampleTo?.[0]}</span>
              </div>  
          </div>
        </div>        
    </TinderCard>
  )
}
