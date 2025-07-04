/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use client";

import React from "react";
import Zoom from "react-medium-image-zoom";

import "../../styles/image-zoom.css";
import "react-medium-image-zoom/dist/styles.css";

type ImageZoomProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Zoom>;

const ImageZoom = (props: ImageZoomProps) => {
  const { children, ...rest } = props;

  return (
    <Zoom zoomMargin={10} {...rest}>
      {children}
    </Zoom>
  );
};

export {ImageZoom};