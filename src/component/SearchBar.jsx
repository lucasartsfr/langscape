import { useRef } from 'react'
import IconButton from './IconButton'
import { FiSearch } from 'react-icons/fi'; // Replace with your desired
import { useAppContext } from './AppContext';
import { FcGoogle } from "react-icons/fc"

export default function SearchBar() {

  const {refetch, customWord, theData} = useAppContext();
  const myRef = useRef();

  const updateWord = () =>{
    if(myRef.current.value != ""){
      customWord.current = myRef.current.value;
      refetch();
      myRef.current.value = "";
      customWord.current = "";
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
