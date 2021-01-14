import React from "react";
import { Carousel } from "react-bootstrap";

function ImageCarousel(props) {
  return (
    <div className="my-4">
      <Carousel>
        {props.value.map((item, index) => (
          <Carousel.Item key={`${index}.${item}`}>
            <img className="d-block w-100" src={item.url} alt="" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export { ImageCarousel };
