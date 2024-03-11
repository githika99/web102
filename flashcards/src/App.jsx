import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const total = 10;
  const [card, setCard] = useState(10)

  const arr = [
    { id: 0, side1: 'The organization of sound waves in the brain is...', side2: "Tonotopic", color: 'blue'},
    { id: 1, side1: 'The liquid in your inner ear is used for...', side2: "orientation and balance", color: 'green'},
    { id: 2, side1: 'Humans have __ photoreceptors total: __ cone(s) and __ rod(s).', side2: "4, 3, 1", color: 'yellow'},
    { id: 3, side1: 'Why do humans not see their blind spot?', side2: "1) The blind spot of each eye do not overlap 2) It is right next to our fovea, so we are never focusing on it 3) Our brain fills it in with information from the surroundings", color: 'blue'},
    { id: 4, side1: 'How does the ear turn sound waves into electrical signals?', side2: "Hair cells on different parts of the cochlea respond to different tones. The hair cells move out of the way and allow electrical signals to enter the brain through the auditory nerve.", color: 'green'},
    { id: 5, side1: 'How does our brain distinguish from movement in the real world and movement of our eyes?', side2: "Movement that our brain percieves is compared to our motor cortex", color: 'yellow'},
    { id: 6, side1: 'The ventral stream is known as the ___ pathway, whereas the dorsal stream is known as the ____ pathway.', side2: "What, Where", color: 'blue'},
    { id: 7, side1: 'What does cortical magnification mean?', side2: "The retina takes up around half of V1, which is why we are able to see more detail in the center of our vision.", color: 'green'},
    { id: 8, side1: 'What does our propioceptive system allows us to do?', side2: "Know the position of our body/limbs and maintian balance.", color: 'yellow'},
    { id: 9, side1: 'Why is studying olfactory more complicated than studying vision?', side2: "There are 350 different types of olfactory receptors, meansing", color: 'blue'},
    { id: 10, side1: 'Start! Click on the card for it to flip.', side2: "Use the arrow to go to the next card!", color: 'blue'},
  ]
  

  const [display, setDisplay] = useState(arr[card]["side1"])


  function handleClick2(){ 
    console.log("card flipped, handleClick2");
    setDisplay(prevDisplay => {
        return prevDisplay === arr[card]["side1"] ? arr[card]["side2"] : arr[card]["side1"];
      });
  }

  function arrowClick(){ 
    console.log("arrow pressed");
    setCard((prevCard) => {                       //before, we had this setCard((prevCard) => (prevCard + 1) % total);
      const newCard = (prevCard + 1) % total;     //that function implicitly returns the new card
      console.log("card is now", newCard);        //it also knows that the parameter is prevCard, even if we don't call it that
      setDisplay(arr[newCard]["side1"]);
      return newCard;                             //this line actually changes the value of card
    });
  }


  return (
    <>
    <h1>Human Perception: Visual and Auditory</h1>
    <h3>Learn all about our visual and auditory sensory perception. This study guide does not heavily delve into the neural aspects of these processes.</h3>
    <h5>Number of cards: {total}</h5>

    {/* we need to include card here. so that when card changes, display changes*/}
    <div className = {"FlashCard " + arr[card]['color']} onClick = {handleClick2}> 
      <h2>{display}</h2>
    </div>

    <img className = 'NextButton' src = 'src/assets/arrow.png' onClick = {arrowClick}></img> 
    
    </>
  )
}

export default App
