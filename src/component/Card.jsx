import TinderCard from 'react-tinder-card';
import useStore from '../store/zustand';
import { PiStarFill } from 'react-icons/pi';
import IconButton from './IconButton';
import { useRef, useEffect, useCallback, useState, useMemo } from 'react';

export default function Card({queryData}) {
  const { translate, visible, fetchVocabulary, theData, favorite, addFavorite, setCardRef, cardId } = useStore();
 
  const wordData = useMemo(() => {

     if (!queryData?.results) {
      return queryData; // placeholderData ou données déjà formatées
    }

    const translation = queryData?.results?.Translation?.translations?.[0];
    const playphrase = queryData?.results?.Playphrase?.results?.phrases?.[0];
   
    return {
      WordTraductionEn: translation?.from,
      WordTraductionFr: translation?.to,
      WordExemplesEn: translation?.examples?.[0]?.from,
      WordExemplesFr: translation?.examples?.[0]?.to,
      WordDefinitionEn: translation?.definition?.from,
      WordDefinitionFr: translation?.definition?.to,
      WordPhoneticEn: translation?.phonetics?.from,
      WordPhoneticFr: translation?.phonetics?.to,
      PlayPhraseVideo: playphrase?.['video-url'],
      PlayPhraseSubtitle: playphrase?.['text']
    };
  }, [queryData]);
  
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const [isEnded, setIsEnded] = useState(true);
  const [isProcessingSwipe, setIsProcessingSwipe] = useState(false);

  useEffect(() => {
    setCardRef(cardRef.current);
  }, [setCardRef]);

  const onSwipe = useCallback((direction) => {
    console.log('Card swipe to: ' + direction);
  }, []);

  const onCardLeftScreen = useCallback((myIdentifier) => {
    if (isProcessingSwipe) return;
    setIsProcessingSwipe(true);
    setIsEnded(true);

    console.log(myIdentifier + ' left the screen');

    setTimeout(() => {
      fetchVocabulary("");
      setIsProcessingSwipe(false);
    }, 100);
  }, [fetchVocabulary, isProcessingSwipe]);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsEnded(false);
    }
  }, []);

  return (
    <TinderCard
      key={cardId} // ✅ Forcer une nouvelle carte
      ref={cardRef}
      onSwipe={onSwipe}
      onCardLeftScreen={onCardLeftScreen}
      className="Card"
    >
      <div className={`CardWrapper Flip-${translate}`}>
        <div className="Front">
          <div className={`Upper Visible-${visible}`}>
            {wordData.PlayPhraseVideo && (
              <div className='VideoContainer' style={{ position: 'relative' }}>
                <video
                  className='VideoPlayer'
                  ref={videoRef}
                  onEnded={() => setIsEnded(true)}
                >
                  <source src={wordData.PlayPhraseVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <span className='VideoSubtitle'>{wordData.PlayPhraseSubtitle}</span>
                {isEnded && (
                  <button className='VideoPlayButton' onClick={handleReplay}>▶</button>
                )}
              </div>
            )}
            <div className='WordContainer'>
              <h1>{wordData.WordTraductionEn || "Loading"}</h1>
              <span className='WordPhonetic'>{wordData.WordPhoneticEn}</span>
              <IconButton
                icon={PiStarFill}
                size="2em"
                color={favorite?.includes(wordData.WordTraductionEn) ? "#faee4d" : "#CECECE"}
                customClass="FavoriteButton"
                toggleIcon={PiStarFill}
                onClick={() => addFavorite(wordData.WordTraductionEn)}
              />
            </div>
          </div>
          <div className="Under">
            <span className="Definition">{wordData.WordDefinitionEn}</span>
            <span className="Example">{wordData.WordExemplesEn}</span>
          </div>
        </div>

        <div className="Back">
          <div className={`Upper Visible-${visible}`}>
            <h1>{wordData.WordTraductionFr}</h1>
            <span className='WordPhonetic'>{wordData.WordPhoneticFr}</span>
          </div>
          <div className="Under">
            <span className="Definition">{wordData.WordDefinitionFr}</span>
            <span className="Example">{wordData.WordExemplesFr}</span>
          </div>
        </div>
      </div>
    </TinderCard>
  );
}
