import { useRef } from 'react'
import IconButton from './IconButton'
import { FiSearch } from 'react-icons/fi'; // Replace with your desired
import useStore from '../store/zustand';
import { FcGoogle } from "react-icons/fc"

export default function SearchBar() {
  const { fetchVocabulary, setCustomWord, theData } = useStore();
  const myRef = useRef();

  const updateWord = () =>{
    if(myRef.current.value != ""){
      fetchVocabulary(myRef.current.value);
      myRef.current.value = "";
    }    
  }
  
  const searchGoogle = () =>{
    const Word = (myRef?.current?.value) ? myRef?.current?.value : theData?.Word;
    window.open("https://www.google.com/search?q="+Word+" translation", "_blank") //to open new page
  }


  return (
    <div className='SearchBarContainer'>
      <div className='SearchBar'>
          {/* <div className='SearchBarContainer'>             */}
              <input type='search' className='Search' placeholder='Search a word...' ref={myRef} />
              <IconButton icon={FiSearch} size="2em" toggleIcon={FiSearch} customClass="SearchButton" onClick={updateWord} />
          {/* </div> */}
      </div>
      <IconButton icon={FcGoogle} size="2em" toggleIcon={FcGoogle} customClass="SearchGoogle" onClick={searchGoogle} />
    </div>
  )
}
