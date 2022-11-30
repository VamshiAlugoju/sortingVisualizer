import React from "react";
import "./sortingvis.css";
import { getMergeSortAnimations } from "./mergesort";
import { doquicksort } from "./quicksort";

export default function Sortingvis() {
  const [arr, setarr] = React.useState([]);

  function reset() {
    const arrr = [];
    for (let i = 1; i <= 100; i++) {
      arrr.push(randomnum(5, 600));
    }
    setarr(arrr);
  }
 
  React.useEffect(()=>{
    reset()
  } , [])

  function mergesort()
  {
    const animations = getMergeSortAnimations(arr)
    const arrbars = document.getElementsByClassName("arr-block")
    for(let i=0;i<animations.length ;i++)
    {
         const iscolor = i%3 !==2
         if(iscolor){
          const [oneidx,twoidx] = animations[i]
          const barone = arrbars[oneidx].style
          const bartwo = arrbars[twoidx].style
            
          const color = i%3 == 0 ? "red" : "blue"
          setTimeout(() => {
            barone.backgroundColor = color;
            bartwo.backgroundColor = color;
          } ,  i*10);

         }
         else{
            setTimeout(() => {
            const [baridx , newheight] = animations[i];
          const bar = arrbars[baridx].style
          bar.height = `${newheight}px`
            }, i*10);
         }   
       
    }

   
  }

  function quicksort()
  {  
    const animationbox = doquicksort(arr)
    
    
    for(let i=0;i<animationbox.length;i++)
    {
          const arrbars = document.getElementsByClassName("arr-block")
            if(animationbox[i][0] === 'g'){} //turn green
            if(animationbox === 'b')  {}  //turn blue 

            let iscolor = false;
               if(i%4 ===0 || i%4 ===1) iscolor = true;
               
            if(iscolor)
            {
              console.log(iscolor)
              const [oneidx, twoidx] = animationbox[i]
               const barone = arrbars[oneidx].style
               const bartwo  = arrbars[twoidx].style
               const color = i%4 === 0 ? "red" : "blue"
               setTimeout(() => {
                   barone.backgroundColor = color
                   bartwo.backgroundColor = color
               }, i*10);
            }
             else{
                   
               setTimeout(() => {
                const [baridx,newheight] = animationbox[i]
                 arrbars[baridx].style.height = `${newheight}px`
                
              }, i*10);

             }

        }
  }
   
   function wait(ms)
  {
       return new Promise(resolve=>{
        setTimeout(() => {
          resolve('')
        },10);
       })
  }

  async function bubble()
   {    
     const arrbars = document.getElementsByClassName("arr-block")

        for(let i =0;i<arr.length -1;i++)
        {
          for(let j=0;j<arr.length-i-1;j++)
          {
              arrbars[j].style.backgroundColor = "black"
              arrbars[j+1].style.backgroundColor = "black"
               
              if(arr[j] >= arr[j+1])
              {
                await wait();
                [arr[j] , arr[j+1]] = [arr[j+1] , arr[j]]
              }
              arrbars[j].style.height =`${arr[j]}px`
              arrbars[j+1].style.height =`${arr[j+1]}px`
              
              arrbars[j].style.backgroundColor = "blue"
              arrbars[j+1].style.backgroundColor = "blue"
          }

          arrbars[arr.length - i-1].style.backgroundColor = "green"
        }
        
       
   }

   
async function selection()
{
    
  const arrbars = document.getElementsByClassName("arr-block")
  
  for(let i=0;i<arr.length-1;i++)
  {
      
    let min = i;

      let trackmin = min;
    for(let j=i+1;j<arr.length;j++)
    {   
      arrbars[j].style.backgroundColor = "red"

      if(min !== trackmin)
      {
        arrbars[trackmin].style.backgroundColor = "blue"
        trackmin = min
      }
      await wait();
      arrbars[min].style.backgroundColor = "yellow"
      arrbars[i].style.backgroundColor = "black"

      if(arr[j]<arr[min])
       {   
        min = j;
       }

      arrbars[j].style.backgroundColor = "blue"

     
    }

    arrbars[trackmin].style.backgroundColor = "blue"
    if(min !== i)
    {    
       arrbars[min].style.height = `${arr[i]}px`;
       arrbars[i].style.height = `${arr[min]}px`;

      [arr[min] , arr[i]] = [arr[i] , arr[min]]
      
    }

    arrbars[i].style.backgroundColor = "green"
  }
   
  console.log(arr)
}


  return (
    <div className="array-container">
      <div>
        {arr.map((value, idx) => {
          return (
            <div style={{ height: `${value}px` }} className="arr-block">
              {" "}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button onClick={reset}>reset array</button>
        <button onClick={mergesort} >mergesort</button>
        <button onClick={quicksort} >quicksort</button>
        <button onClick={bubble} >bubblesort</button>
        <button onClick={selection} >selections</button>



      </div>
    </div>
  );

  function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
