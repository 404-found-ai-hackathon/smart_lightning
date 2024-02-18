import { FC } from "react";

import { CAR_HEIGHT, CAR_WIDTH } from "../constants/CAR";

import carImg from "../Car.png";

interface ICarProps {
  top?: number | "auto";
  left?: number | "auto";
  right?: number | "auto";
}

export const Car: FC<ICarProps> = ({
  top = "auto",
  left = "auto",
  right = "auto",
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${carImg}')`,
        width: CAR_WIDTH,
        height: CAR_HEIGHT,
        position: "absolute",
        top,
        left,
        right,
      }}
    />
  );
};
