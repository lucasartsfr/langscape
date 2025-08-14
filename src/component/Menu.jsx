import IconButton from './IconButton'
import { PiEyeClosedBold } from 'react-icons/pi'; // Replace with your desired
import { BsEyeFill } from 'react-icons/bs'; // Replace with your desired
import { BsTranslate } from 'react-icons/bs'; // Replace with your desired
import { FaRandom } from 'react-icons/fa'; // Replace with your desired
import { PiStarFill } from 'react-icons/pi'; // Replace with your desired
import useStore from '../store/zustand';

export default function Menu() {
  const { setTranslate, toggleTranslate, setVisible, toggleVisible, translate, visible, fetchVocabulary, swipe, setShowDrawer, swipeCard  } = useStore()
  
  const updateTranslate = () =>{
    console.log('ok')
    toggleTranslate(prev => !prev);
  }

  const updateVisible = () =>{
    toggleVisible(prev => {
      console.log("Toggled Visible: " + !prev)
      return !prev
    })
  }

  const updateword = () =>{
    try {
      swipeCard('right');
      // Attendre un peu que l'animation se termine
      setTranslate(false);
      setVisible(false);
      fetchVocabulary();
    } catch (error) {
      console.error('Erreur lors du swipe:', error);
    }
  }

  const updateDrawer = () =>{
    setShowDrawer(prev => !prev)
  }


  return (
    <div className='Menu'>
        <IconButton icon={PiEyeClosedBold} size="2em" toggleIcon={BsEyeFill} onClick={updateVisible} toggleValue={visible} />
        <IconButton icon={BsTranslate} size="2em"  toggleIcon={BsTranslate} onClick={updateTranslate} toggleValue={translate} />
        <IconButton icon={FaRandom} size="2em" customClass="Randomizer" toggleIcon={FaRandom} onClick={updateword}/>
        <IconButton icon={PiStarFill} size="2em" color="#faee4d" customClass="Star" toggleIcon={PiStarFill} onClick={updateDrawer}/>
    </div>
  )
}
