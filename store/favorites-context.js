import { createContext, useState } from "react";
export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
})

function FavoritesContextProvider({children}){

const [favoritePlaceIds, setFavoritePlaceIds] = useState([])

function addFavorite(id){
    setFavoritePlaceIds((current)=>[...current,id])
}

function removeFavorite(id){
    setFavoritePlaceIds((current)=>current.filter((foodId) =>
    foodId !== id ))
}

const value ={
    ids:favoritePlaceIds,
    addFavorite:addFavorite,
    removeFavorite:removeFavorite,
}

    return <FavoritesContext.Provider value={value}>
            {children}
    </FavoritesContext.Provider>;
}

export default FavoritesContextProvider;