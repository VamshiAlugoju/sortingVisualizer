import React, { forwardRef, useImperativeHandle,useRef } from "react";
import "./sortingvis.css";
import { getMergeSortAnimations } from "./mergesort";
// import { doquicksort } from "./quicksort";

const Sortingvis = (props, ref) => {
  const [arr, setarr] = React.useState([]);
  const [size, setsize] = React.useState(props.arrsize);
  
  const [slidespeed , setslidespeed] = React.useState(100)
  let speed = slidespeed; 

 
  function reset() {
    const arrr = [];
    for (let i = 1; i <= size; i++) {
      arrr.push(randomnum(1, 550));
    }
    setarr(arrr);
  }

  // for calling child components from parent
  useImperativeHandle(ref, () => ({
    bubble,
    selection,
    quicksort,
    mergesort,
    reset,
   
  }));

  ///useeffect for initial calling
  React.useEffect(() => {
    reset();
    setsize(props.arrsize)
  }, [size , props.arrsize]);

  function mergesort() {
    const animations = getMergeSortAnimations(arr);
    const arrbars = document.getElementsByClassName("arr-block");
    for (let i = 0; i < animations.length; i++) {
      const iscolor = i % 3 !== 2;
      if (iscolor) {
        const [oneidx, twoidx] = animations[i];
        const barone = arrbars[oneidx].style;
        const bartwo = arrbars[twoidx].style;

        const color = i % 3 == 0 ? "red" : "blue";
        setTimeout(() => {
          barone.backgroundColor = color;
          bartwo.backgroundColor = color;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [baridx, newheight] = animations[i];
          const bar = arrbars[baridx].style;
          bar.height = `${newheight}px`;
        }, i * 10);
      }
    }
  }

  /// quick sort function
  async function quicksort() {
    const arrbars = document.getElementsByClassName("arr-block");
    await doquicksort(arr, 0, arr.length - 1);

    for (let i = 0; i < arrbars.length; i++) {
      await wait();
      arrbars[i].style.backgroundColor = "green";
    }
  }

  async function doquicksort(arr, s, end) {
    if (s < end) {
      let pivot = await partion(arr, s, end);
      await doquicksort(arr, s, pivot - 1);
      await doquicksort(arr, pivot + 1, end);
    }
  }

  /// partition function for quick sort
  async function partion(arr, s, end) {
    const arrbars = document.getElementsByClassName("arr-block");

    let pivot = arr[end];
    arrbars[end].style.backgroundColor = "black";
    let i = s - 1;
    for (let j = s; j <= end - 1; j++) {
      i === -1 ? "" : (arrbars[i].style.backgroundColor = "yellow");

      arrbars[j].style.backgroundColor = "red";
      await wait(speed);
      if (arr[j] < pivot) {
        i === -1 ? "" : (arrbars[i].style.backgroundColor = "blue");

        arrbars[i + 1].style.height = `${arr[j]}px`;
        arrbars[j].style.height = `${arr[i + 1]}px`;

        i++;
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
      arrbars[j].style.backgroundColor = "blue";
    }
    i === -1 ? "" : (arrbars[i].style.backgroundColor = "blue");

    arrbars[i + 1].style.height = `${arr[end]}px`;
    arrbars[end].style.height = `${arr[i + 1]}px`;

    [arr[end], arr[i + 1]] = [arr[i + 1], arr[end]];

    return i + 1;
  }

  /// async function to make some delay
  let time;
  function wait(speed) {
    return new Promise((resolve) => {
       time =  setTimeout(() => {
        resolve("");
      }, speed);
    });
  }

  ///bubble sort

  async function bubble() {
    const arrbars = document.getElementsByClassName("arr-block");

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arrbars[j].style.backgroundColor = "black";
        arrbars[j + 1].style.backgroundColor = "black";

        if (arr[j] >= arr[j + 1]) {
          await wait();
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        arrbars[j].style.height = `${arr[j]}px`;
        arrbars[j + 1].style.height = `${arr[j + 1]}px`;

        arrbars[j].style.backgroundColor = "blue";
        arrbars[j + 1].style.backgroundColor = "blue";
      }

      arrbars[arr.length - i - 1].style.backgroundColor = "green";
    }
  }

  async function selection() {
    const arrbars = document.getElementsByClassName("arr-block");

    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;

      let trackmin = min;
      for (let j = i + 1; j < arr.length; j++) {
        arrbars[j].style.backgroundColor = "red";

        if (min !== trackmin) {
          arrbars[trackmin].style.backgroundColor = "blue";
          trackmin = min;
        }
        await wait(speed);
        arrbars[min].style.backgroundColor = "yellow";
        arrbars[i].style.backgroundColor = "black";

        if (arr[j] < arr[min]) {
          min = j;
        }

        arrbars[j].style.backgroundColor = "blue";
      }

      arrbars[trackmin].style.backgroundColor = "blue";
      if (min !== i) {
        arrbars[min].style.height = `${arr[i]}px`;
        arrbars[i].style.height = `${arr[min]}px`;

        [arr[min], arr[i]] = [arr[i], arr[min]];
      }

      arrbars[i].style.backgroundColor = "green";
    }
  }


  function handlespeed(e)
  {  
     setslidespeed( e.target.value);
     speed = slidespeed
    console.log(speed)
  }
   
        

  return (
    <div className="array-container">

      <div className="row">
      <div className="  col-9 " >
        <div className="array-bars " >{arr.map((value, idx) => {
          return (
            <div style={{ height: `${value}px` }} className="arr-block">
              {" "}
            </div>
          );
        })}
        </div>
      </div>
 

 <div className="speed-inputbar col">
  
  <input type="range" onChange={handlespeed} min={1} max={200} value = {slidespeed} />
 </div>
 </div>

    </div>
  );

  function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

export default forwardRef(Sortingvis);
