

 export  function doquicksort(arr)
{      
    const animations = [];
       quicksort(arr,0,arr.length-1,animations) 
       return animations;
}

function quicksort(arr,s,end,animations)
{  
    if (s < end) {
    let pivot  = partition(arr,s,end,animations)   
    quicksort(arr,s,pivot-1,animations)
    quicksort(arr,pivot+1,end,animations)
    }
}

function partition(arr,s,end,animations)
{
    let pivot = arr[end]    //
     let i = s-1;
     //take pivot first to color it
     for(let j=s;j<=end-1;j++)
     {   
         
        if(arr[j]<pivot)
        {
            animations.push([i+1,j])
            animations.push([i+1,j])
  
            animations.push([i+1,arr[j]])
            animations.push([j,arr[i+1]])

            i++;
         [arr[i] , arr[j]] = [arr[j] , arr[i]]
        }
        else{
            animations.push([i,j])
            animations.push([i,j])

            animations.push([i , arr[i]])
            animations.push([j , arr[j]])
        }
        
     }
     [arr[i+1] , arr[end]] = [arr[end] , arr[i+1]]
        
     animations.push([i+1 , end])
     animations.push([i+1 , end])
     animations.push([i+1 , arr[end]])
     animations.push([end, arr[i+1]])

     
     
     return (i+1)
}
 
    let i =false
     if(1%4 == 0 || 1%4 ==1)  i =true;
 console.log(i)
