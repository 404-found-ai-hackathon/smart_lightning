import { FC } from "react";

import { CAR_HEIGHT, CAR_WIDTH } from "../constants/CAR";

import carImg from "../HorizontalCar.png";

interface ICarProps {
  top?: number | "auto";
  left?: number | "auto";
  right?: number | "auto";
  bottom?: number | "auto";
}

export const HorizontalCar: FC<ICarProps> = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${carImg}')`,
        width: CAR_HEIGHT,
        height: CAR_WIDTH,
        position: "absolute",
        top,
        left,
        right,
        bottom,
      }}
    />
  );
};
