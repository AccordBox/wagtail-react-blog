import React from "react";
import { BaseImage } from "../BaseImage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function ImageCarousel(props) {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
    >
      {props.value.map((item, index) => (
        <BaseImage img={item} key={`${index}.${item}`}/>
      ))}
    </Carousel>
  );
}

export { ImageCarousel };
