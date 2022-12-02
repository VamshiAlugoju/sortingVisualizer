import React,{useRef} from 'react'
import { useState } from 'react'
 import Sortingvis from "./Sortingvis"
 import Navbar from './Navbar'
import './App.css'
function App() {
   
  const apref = useRef();
    
  const [slideval , setslideval] = React.useState(100)

  function handleslideval(val)
  {
    setslideval(val)
    console.log(slideval)
  }
   let bubblesort = ()=> apref.current.bubble()
   let selectionsort = ()=> apref.current. selection()
   let quci =()=> apref.current. quicksort()
   let reset = ()=>apref.current.reset()
   
 
  return (
    <div className="App">
       <Navbar  quick = {quci } bubble={bubblesort} selection= {selectionsort} newarray = {reset}  setslidevalue= {handleslideval} />
      <Sortingvis arrsize={slideval} ref={apref} />
    </div>
  )
}

export default App
