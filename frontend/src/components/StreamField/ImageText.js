import React from "react";
import { BaseImage } from "../BaseImage";
import { classNames } from "../../utils.js";

function ImageText(props) {
  const { value } = props;

  return (
    <div
      className={classNames(
        value.reverse ? "sm:flex-row-reverse" : "sm:flex-row",
        "flex items-center mx-auto flex-col"
      )}
    >
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-7/12 px-2">
        <BaseImage img={value.image} />
      </div>
      <div className="w-full sm:w-1/3 md:w-1/4 lg:w-5/12 px-2">
        <div dangerouslySetInnerHTML={{ __html: value.text }} />
      </div>
    </div>
  );
}

export { ImageText };
