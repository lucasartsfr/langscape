import  { useRef, useEffect } from 'react'

export default function DrawerBottom({children, stateHandler, autoOpen, handleColor, grabColor, contentColor, shadow}) {

  const state = useRef(); // State of Actions
  const drag = useRef(); // Draggable
  const drawer = useRef(); // Drawer Div
  const content = useRef(); // Content Div
  const initialPosition = useRef(0); // Mouse Down Position Y
  const savedPosition = useRef(0); // Mouse Up Position Y
  const difPosition = useRef(0); // Difference Between Start and End Y
  const overlay = useRef(0) // Opacity of Overlay
  const moveY = useRef(0);
  

  const getter = stateHandler[0]; // Getter State
  const setter = stateHandler[1]; // Setter State


  // On Mouse Down or Touch Down
  const handleMouseDown = (e) =>{    
    console.log("mouse down")
    state.current = "down";
    initialPosition.current = e?.clientY || e?.touches[0]?.clientY;
    document.documentElement.style.setProperty('--transition-drawer', '0s');   
    document.documentElement.style.setProperty('--transition-overlay', '0s');   
  }

  useEffect(() => {

    // On Mouse Up
    const handleMouseUp = () => {
      if( state.current == 'down'){
        state.current = "up"        
        savedPosition.current = difPosition.current;
        
        // Open
        if(moveY.current <= -autoOpen && Math.sign(moveY.current) <= 0 && autoOpen){
          setter(true);
          console.log('Auto Open')
        }
        // Close
        if(moveY.current >= autoOpen && Math.sign(moveY.current) >= 0 && autoOpen){
          setter(false);
          console.log('Auto Close')
        }

        console.log("mouse up")
      }
    }


    // Mouse Move
    const handleMouseMove = (e) => {
      if( state.current == 'down'){

        let clientY = (e.type == "mousemove") ? e.clientY : e.touches[0].clientY;

        const calculator = (clientY - initialPosition.current + savedPosition.current)
        const calculatorOpacity =  -(parseInt(calculator * 100 / content.current.clientHeight))/100;
        document.documentElement.style.setProperty('--opacity-overlay', calculatorOpacity <= 0 ? 0 : calculatorOpacity >= 1 ? 1 : calculatorOpacity);
        document.documentElement.style.setProperty('--index-overlay', calculatorOpacity <= 0 ? "-20" : "999");


        // If Bigger than Height
        if(calculator < -content.current.clientHeight){
          difPosition.current = -content.current.clientHeight
          setter(true);
        }
        // Keep Drag visible
        else if(calculator > 0){
          difPosition.current = 0;
          setter(false);
        }
        // Else Allow Move
        else{
          difPosition.current = calculator
        }               
        
        moveY.current = clientY - initialPosition.current
        document.documentElement.style.setProperty('--y', difPosition.current+'px');
      }
    }

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
    };
  }, []);


  // On Click or Change State
  useEffect(() =>{
    document.documentElement.style.setProperty('--transition-drawer', '.4s');    
    document.documentElement.style.setProperty('--transition-overlay', ".4s");     

    if(!getter){      
      document.documentElement.style.setProperty('--y', '0px');

      document.documentElement.style.setProperty('--opacity-overlay', 0);   
      document.documentElement.style.setProperty('--index-overlay', "-20");     

      savedPosition.current = 0;   
    }

    else{
      document.documentElement.style.setProperty('--y', -content.current.clientHeight+'px');

      document.documentElement.style.setProperty('--index-overlay', "999");   
      document.documentElement.style.setProperty('--opacity-overlay', 1);  
      
      savedPosition.current = -content.current.clientHeight;   
    }
  }, [getter])



  return (
    <>
    <div onClick={() => {setter(false)}} className='DrawerOverlay' ref={overlay} ></div>
    <div className={`Drawer Drawer-open-${getter}`} ref={drawer} style={{boxShadow : shadow}}>
      <div className="GripContainer" ref={drag} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} 
        style={{backgroundColor : handleColor}}>
        <div className="Grip" style={{backgroundColor : grabColor}}></div>
      </div>
      <div className="DrawerContent" ref={content} style={{backgroundColor : contentColor}}>
        {children}
      </div>
    </div>
    </>
  )
}

