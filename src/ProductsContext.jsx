import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try{
        const response = await fetch('https://fakestoreapi.com/products')

        if (response.status >= 400) {
            throw new Error("server error");
        }

        const json = await response.json();
        setData(json);
      
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