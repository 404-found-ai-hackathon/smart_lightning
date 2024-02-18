import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CAR_HEIGHT, CAR_MARGIN, CAR_WIDTH } from "../constants/CAR";
import { LINES_COUNT, WRAPPER_WIDTH } from "../constants/TEMPLATE";

import { Car } from "./Car";
import { HorizontalCar } from "./HorizontalCar";
import { CarMovementLength, Interval } from "../constants/IntervalCount";

interface ICarPositions {
  id: number;
  top: number;
  left: number;
}

interface ILeftCarsProps {
  moving: boolean;
  count: number;
}

const LEFT = 820;
const STOP_LINE = 166;

export const TopCars: FC<ILeftCarsProps> = ({ moving, count }) => {
  const [carsPositions, setCarsPositions] = useState<ICarPositions[]>([]);
  const carsRef = useRef<ICarPositions[]>([]);
  const countRef = useRef<number>(0);

  useEffect(() => {
    const newCarsPositions = [
      ...carsPositions,
      ...Array(Math.abs(count - countRef.current))
        .fill(null)
        .map((_, index) => ({
          id: uuidv4(),
          top:
            0 -
            Math.floor(index / LINES_COUNT) * CAR_HEIGHT -
            Math.floor(index / LINES_COUNT) * CAR_MARGIN,
          left: LEFT + (index % LINES_COUNT) * CAR_WIDTH,
        })),
    ] as ICarPositions[];

    countRef.current = count;
    carsRef.current = newCarsPositions;
    setCarsPositions(newCarsPositions);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarsPositions((prev) => {
        const firstStoppedCarIndex = carsRef.current.findIndex(
          (car) => car.top > STOP_LINE
        );

        const nextMovements = prev
          .map((item, index) => {
            if (
              moving ||
              (!moving &&
                item.top <
                  STOP_LINE -
                    Math.floor(
                      Math.abs(firstStoppedCarIndex - index) / LINES_COUNT
                    ) *
                      CAR_WIDTH -
                    Math.floor(
                      Math.abs(firstStoppedCarIndex - index) / LINES_COUNT
                    ) *
                      CAR_MARGIN) ||
              item.top >= STOP_LINE + CAR_WIDTH
            ) {
              return {
                ...item,
                top: item.top + CarMovementLength,
              };
            }
            return item;
          })
          .filter((car) => car.top < WRAPPER_WIDTH);

        carsRef.current = nextMovements;
        return nextMovements;
      });
    }, Interval);

    return () => {
      clearInterval(interval);
    };
  }, [moving, count]);

  return carsPositions.map((car) => (
    <HorizontalCar key={car.id} top={car.top} left={car.left} />
  ));
};
