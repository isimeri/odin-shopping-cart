import { useState } from 'react';
import { Link } from 'react-router';
import videoWallpaper from "../assets/homepage-wallpaper.mp4"
import Nav from './Nav';
import './Home.css';

function Home() {
  return (
    <div className='home-container'>
      <Nav />
      <div className="home-inner">
        <div className="homepage-left">
          <div className="vwrapper">
            <h1 className="title">GameBruh</h1>
            <p className="disclaimer">
              This is not a real store. You can't buy anything here. Prices seen here are generated more or less randomly, so they are not real either. All the products and product related data are either pulled from an external API or generated on the fly, without any regard to reality.
            </p>
          </div>
          <p className="credit">
            Video by <a href="https://pixabay.com/users/atipaats-26903854/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=123885">Atip Apibalsri</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=123885">Pixabay</a>
          </p>
          <p className="developer">Developed by <a href="https://github.com/isimeri" target='_blank'>isimeri</a></p>
        </div>
        <div className="homepage-right">
          <Link to="/shop">Go to store</Link>
        </div>
      </div>
      <video className='video-wallpaper' autoPlay loop muted playsInline>
        <source src={videoWallpaper} type='video/mp4'/>
      </video>
    </div>
  )
}

export default Home;