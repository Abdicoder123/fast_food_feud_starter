import * as React from "react";
import Chip from "./components/Chip/Chip";
import Instructions from "./components/Instructions/Instructions";
import { createDataSet } from "./data/dataset";
import "./App.css";
import Header from "./components/Header/Header";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";
// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet();

export function App() {

  const [restaurantList, setRestaurantList] = React.useState(null);
  const [categoriesList, setCategoriesList] = React.useState(null);
  const [menuList, setMenuList] = React.useState(null);
  //console.log("hey")
  let currMenuItems = data.filter((m) => {
    return(
        m.food_category === categoriesList &&
        m.restaurant === restaurantList
    );
  });

  let instructions = "";

  if (
    categoriesList == null && restaurantList == null && menuList == null
  ){
    instructions = appInfo.instructions.start;
  } else if (
    categoriesList != null && restaurantList == null && menuList == null
  ){
    instructions = appInfo.instructions.onlyCategory;
  } else if (
    categoriesList == null && restaurantList != null && menuList == null
  ){
    instructions = appInfo.instructions.onlyRestaurant;
  } else if (
    categoriesList != null && restaurantList != null && menuList == null
  ){
    instructions = appInfo.instructions.noSelectedItem;
  } else if (
    categoriesList != null && restaurantList != null && menuList == null
  ){
    instructions = appInfo.instructions.allSelected;
  }
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((item, idx) => (
            <Chip key={idx} chip={idx} label ={item} isActive = {item === categoriesList} inclick = {() => {
                  setCategoriesList(item);
            }}/>
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header title = {appInfo.title} > </Header>
        <Header tagline = {appInfo.tagline}></Header>
        <Header description = {appInfo.description}></Header>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">{restaurants.map((rsnt, idx)=>(
            <Chip key={idx} chip={idx} label = {rsnt} isActive = {rsnt === restaurantList} inclick = {() => {
                  setRestaurantList(rsnt);
            }} />
          ))}</div>
        </div>

        <Instructions instruction = {appInfo.instructions}/>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
           {currMenuItems.map((menuItems) => {
              return(
                <Chip key={menuItems.item_name} label ={menuItems.item_name} isActive={currMenuItems === menuItems}
                onClick={()=> setMenuList(menuItems)}
                />
              );
            })}
          </div> 

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
          {menuList != null && <NutritionalLabel ntrn={menuList}/>}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
