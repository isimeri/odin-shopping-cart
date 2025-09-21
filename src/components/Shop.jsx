import { useEffect, useState, Fragment } from 'react';
import { useProducts } from '../ProductsContext';
import { Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiMicrosoftWindows, mdiPenguin, mdiApple, mdiMicrosoftXbox, mdiSonyPlaystation, mdiNintendoSwitch } from '@mdi/js';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import './shop.css'

function Shop() {
  const {data, error, isLoading} = useProducts();

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

  return (
    <>
      <Nav />
      <div className="hwrapper">
        <Sidebar />
        <div className="products-container">
          {data.map(item => {
            const url = "/shop/" + item.slug;
            return (
              <Link to={url} key={item.id} className='product-link'>
                <div className="product-card">
                  <div className='product-card-image' style={{backgroundImage: `url(${item.background_image})`}} ></div>
                  <div className="product-card-text">
                    <p className="product-card-platforms">
                      {item.platforms.map((platform, i) => {
                        const name = platform.name.toLowerCase().split(" ")[0];
                        let icon;

                        if(PLATFORM_ICONS[name] === undefined) return null;
                        if(PLATFORM_ICONS[name].used === false){
                          icon = PLATFORM_ICONS[name].icon || null;
                        } else {
                          icon = null
                        }
                        if(icon !== null) PLATFORM_ICONS[name].used = true;

                        return icon ? <Icon key={i} path={icon} size={0.8} /> : null;
                      })}             
                    </p>
                    <p className="product-card-name">{item.name}</p>
                    <div className="hwrapper">
                      <p className="product-card-price">${item.price}</p>
                      <button>Add to cart</button>
                    </div>
                  </div>
                </div>
                {resetIcons()}
              </Link>
            );
          })}
        </div>
      </div>
      
    </>
  )
}

export default Shop