import { createContext, useContext, useEffect, useState } from "react";
import { mdiMicrosoftWindows, mdiPenguin, mdiApple, mdiMicrosoftXbox, mdiSonyPlaystation, mdiNintendoSwitch } from '@mdi/js';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const PLATFORM_ICONS = {
    pc: {
      icon: mdiMicrosoftWindows,
      used: false
    },
    linux: {
      icon: mdiPenguin,
      used: false
    },
    macos: {
      icon: mdiApple,
      used: false
    },
    playstation: {
      icon: mdiSonyPlaystation,
      used: false
    },
    xbox: {
      icon: mdiMicrosoftXbox,
      used: false
    },
    nintendo: {
      icon: mdiNintendoSwitch,
      used: false
    }
  };

  function resetIcons(){
    for(let prop in PLATFORM_ICONS){
      PLATFORM_ICONS[prop].used = false;
    }
  }

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
            item.price = parseFloat((Math.random() * (item.rating * 10 + 5)).toFixed(2));
            return item;
          });

          const maset = new Set(editedJson.reduce((acc, item) => {
            return acc.concat(item.genres.map(g => g.name));
          },[]))
          console.log(maset);
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
    <ProductsContext.Provider value={{data, error, isLoading, PLATFORM_ICONS, resetIcons}}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}