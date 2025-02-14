
// creating the debounce function 
const debounce = (fn,delay)=>{
    let time

    return ((...args)=>{
        clearTimeout(time)
        time=setTimeout(()=>fn(...args),delay)
    })
}
export  {debounce} 