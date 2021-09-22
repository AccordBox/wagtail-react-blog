import React from "react";
import { BaseImage } from "../BaseImage";

function ThumbnailGallery(props) {
  const { value } = props;

  return (
    <div className="flex flex-row flex-wrap">
      {value.map((imageItem, index) => (
        <div
          className="w-full md:w-2/4 lg:w-1/3 px-2"
          key={`${index}.${imageItem}`}
        >
          <a
            href={imageItem.url}
            className="d-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BaseImage className="img-thumbnail" img={imageItem} />
          </a>
        </div>
      ))}
    </div>
  );
}

export { ThumbnailGallery };
