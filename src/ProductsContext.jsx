import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try{
        // const response = await fetch('https://fakestoreapi.com/products')
        const response = await fetch("https://jsonfakery.com/games/random/100");

        if (response.status >= 400) {
            throw new Error("server error");
        }

        const json = await response.json();
        if(json){
          const editedJson = json.filter(item => {
              return item.platforms.some(platform =>["pc","linux","macos","playstation","xbox","nintendo"].includes(platform.name.toLowerCase().split(" ")[0]))
            })
          .map(item => {
            item.price = (Math.random() * (item.rating * 10 + 5)).toFixed(2);
            return item;
          });
          console.log(editedJson);
          setData(editedJson);
        }        
      
      } catch(err){
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    getData() 

  }, []);

  return (
    <ProductsContext.Provider value={{data, error, isLoading}}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}