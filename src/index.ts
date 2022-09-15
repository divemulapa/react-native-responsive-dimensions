import { useState, useEffect, useRef } from "react";
import { Dimensions, ScaledSize } from "react-native";

const useDimensionsListener = () => {
  const [screenDimension, setScreenDimension] = useState(
    Dimensions.get("screen")
  );
  const [windowDimension, setWindowDimension] = useState(
    Dimensions.get("window")
  );

  useEffect(() => {
    function handleDimensionChange({
      window,
      screen
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) {
      setWindowDimension(window);
      setScreenDimension(screen);
    }

    Dimensions.addEventListener("change", handleDimensionChange);
    return () => {
      Dimensions.removeEventListener("change", handleDimensionChange);
    };
  }, []);

  return {
    screen: screenDimension,
    window: windowDimension
  };
};

type EffectParams = {
  screen: ScaledSize;
  window: ScaledSize;
};

type EffectCallback =
  | ((opts: EffectParams) => () => any)
  | ((opts: EffectParams) => undefined)
  | ((opts: EffectParams) => void);

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (height: number, width: number, val: number) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2)
    ),
    val
  );
};

export const useDimensionsChange = (effect: EffectCallback) => {
  const hasMountRef = useRef(false);
  const dimensions = useDimensionsListener();

  useEffect(() => {
    if (hasMountRef.current) {
      const destroy = effect(dimensions);
      let cleanUp: any = () => null;
      if (typeof destroy === "function") {
        cleanUp = destroy;
      }
      return () => cleanUp();
    } else {
      hasMountRef.current = true;
    }
  }, [dimensions, effect]);
};

export const responsiveHeight = (h: number) => {
  let { height, width } = Dimensions.get("window");
  if (height < width) {
    height = width
  }
  return percentageCalculation(height, h);
};

export const responsiveWidth = (w: number) => {
  let { width, height } = Dimensions.get("window");
  if (width > height) {
    width = height
  }
  return percentageCalculation(width, w);
};

export const responsiveFontSize = (f: number) => {
  let { height, width } = Dimensions.get("window");
  if(height < width) {
    const temp = height
    height = width
    width = temp
  }
  return fontCalculation(height, width, f);
};

export const responsiveScreenHeight = (h: number) => {
  let { height, width } = Dimensions.get("screen");
  if (height < width) {
    height = width
  }
  return percentageCalculation(height, h);
};

export const responsiveScreenWidth = (w: number) => {
  let { width, height } = Dimensions.get("screen");
  if (width > height) {
    width = height
  }
  return percentageCalculation(width, w);
};

export const responsiveScreenFontSize = (f: number) => {
  let { height, width } = Dimensions.get("screen");
  if(height < width) {
    const temp = height
    height = width
    width = temp
  }
  return fontCalculation(height, width, f);
};

export const useResponsiveHeight = (h: number) => {
  let { height, width } = useDimensionsListener().window;
  if (height < width) {
    height = width
  }
  return percentageCalculation(height, h);
};

export const useResponsiveWidth = (w: number) => {
  let { height, width } = useDimensionsListener().window;
  if (width > height) {
    width = height
  }
  return percentageCalculation(width, w);
};

export const useResponsiveFontSize = (f: number) => {
  let { height, width } = useDimensionsListener().window;
  if(height < width) {
    const temp = height
    height = width
    width = temp
  }
  return fontCalculation(height, width, f);
};

export const useResponsiveScreenHeight = (h: number) => {
  let { height, width } = useDimensionsListener().screen;
  if (height < width) {
    height = width
  }
  return percentageCalculation(height, h);
};

export const useResponsiveScreenWidth = (w: number) => {
  let { height, width } = useDimensionsListener().screen;
  if (width > height) {
    width = height
  }
  return percentageCalculation(width, w);
};

export const useResponsiveScreenFontSize = (f: number) => {
  let { height, width } = useDimensionsListener().screen;
  if(height < width) {
    const temp = height
    height = width
    width = temp
  }
  return fontCalculation(height, width, f);
};
