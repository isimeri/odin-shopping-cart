import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({imgArr}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {imgArr.map(imgObj => {
        return (<div key={imgObj.id}><img src={imgObj.image_url} alt=""/></div>);
      })}
    </Slider>
  );
}

export default Carousel;