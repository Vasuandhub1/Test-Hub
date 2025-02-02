import { RootState } from '@reduxjs/toolkit/query';
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

function CodingDescription() {
    const isDarkMode = useSelector((state:RootState)=>state.DarkLight.isDarkMode)
  useEffect(() => {
    // Apply theme based on darkMode state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <div className=' p-5 h-screen overflow-auto bg-white text-black dark:bg-inherit dark:text-white dark:from-zinc-900 dark:to-zinc-700'>
      <h1>hello</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus reprehenderit nam nulla rem veniam! Voluptatum error architecto iste sed odio consequatur temporibus aliquam deleniti labore impedit! Esse harum consequatur, necessitatibus error eligendi iste quasi facere totam, recusandae unde nam, atque amet! Nisi accusantium placeat laudantium harum totam eveniet ducimus. Mollitia est eius sapiente, suscipit adipisci, explicabo rem pariatur corporis repellat, repudiandae nulla hic vero totam inventore voluptas optio a possimus perspiciatis similique. Suscipit quo id doloremque? At repudiandae, consequuntur, expedita qui quia molestiae temporibus optio, quaerat doloribus culpa nemo unde voluptatem earum. Laborum officia id quasi porro reprehenderit autem cumque natus doloremque voluptate est unde ex, obcaecati delectus exercitationem laboriosam incidunt illo. Praesentium quis omnis, magnam exercitationem corporis commodi eos ullam numquam. Nesciunt officiis quas earum eligendi blanditiis nihil voluptatum voluptatibus illum dignissimos eius corrupti, reprehenderit est, dicta laborum aut vitae laboriosam dolor molestiae adipisci velit! Suscipit aspernatur maxime ex quisquam recusandae sequi quis rem possimus repudiandae iure excepturi officiis, nobis consectetur quae adipisci maiores? Similique illum atque, quia autem repudiandae non, voluptate ut beatae aperiam inventore fuga, obcaecati possimus esse modi provident magnam adipisci? Autem eveniet porro quidem explicabo non assumenda magnam debitis ea. Esse veniam velit aspernatur distinctio?</p>
    </div>
  )
}

export default CodingDescription
