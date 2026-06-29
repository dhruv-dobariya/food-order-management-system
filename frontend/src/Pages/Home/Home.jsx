import React, { useState } from 'react'
import './Home.css'
import Header from '../../Componet/Header/Header'
import ExploreMenu from '../../Componet/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Componet/FoodDisplay/Fooddisplay'
import AppDownload from '../../Componet/AppDownload/AppDownload'
const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <>
      <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload />
      </div>
    </>
  )
}

export default Home
