import React , {forwardRef,useImperativeHandle} from 'react';
import "./App.css"

 const Navbar=(props,ref)=>{

 
    const [slideval,setslideval] = React.useState(100)

       function handlechange(e)
       {
          setslideval(e.target.value)
          props.setslidevalue(slideval)
         
       }

    

    return(
        <>

        <div className="menubar">
             <ul className="navlist">
                <li className="navitems"><button   onClick={props.bubble} className='navbuttons' href="">  bubble sort </button></li>
                <li className="navitems"><button  onClick={props.selection} className='navbuttons' href="">  selection sort </button></li>
                <li className="navitems"><button onClick={props.quick} className='navbuttons' href=""> quick sort </button> </li>
                <li className="navitems"><button  onClick={props.bubble} className=' navbuttons' href="">  merge sort </button></li>
                 <li>  <div className="size">
                               <span>size</span>
                               <span><input onChange={handlechange} type="range" min={50} max={150} value={slideval} /></span>
                      
                    </div> </li>
                  
                 <li className='navitems newarray'> <button onClick={props.newarray} className='btn btn-dark '>New array</button></li>
             </ul>
        </div>
 
        </>
    )
}

export default forwardRef(Navbar)