import IconButton from './IconButton'
import { PiEyeClosedBold } from 'react-icons/pi'; // Replace with your desired
import { BsEyeFill } from 'react-icons/bs'; // Replace with your desired
import { BsTranslate } from 'react-icons/bs'; // Replace with your desired
import { FaRandom } from 'react-icons/fa'; // Replace with your desired
import { PiStarFill } from 'react-icons/pi'; // Replace with your desired
import { useAppContext } from './AppContext';

export default function Menu() {

  const {setTranslate, setVisible, translate, visible, refetch, swipe, setShowDrawer} = useAppContext() 
  
  const updateTranslate = () =>{
    setTranslate(prev => !prev);
  }

  const updateVisible = () =>{
    setVisible(prev => !prev)
  }

  const updateword = () =>{
    refetch();
    setTranslate(false);
    setVisible(false);
    swipe('right')
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
