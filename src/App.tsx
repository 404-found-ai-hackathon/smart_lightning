import { useEffect, useState } from "react";
import { TrafficLights } from "./TrafficLights";
import { TrafficLightCol } from "./enums/TrafficLightCol";
import { TrafficLightsState } from "./types/TrafficLightsState";

import { LeftCars } from "./Cars/LeftCars";

import { Movements } from "./enums/MovementSides";

import { BottomCars } from "./Cars/BottomCars";
import { RightCars } from "./Cars/RightCars";
import { TopCars } from "./Cars/TopCars";

import bg from "./intersection.jpg";
import { getRandomInt } from "./getMinMax";

function App() {
  const [trafficLights, setTrafficLights] = useState<TrafficLightsState>({
    vertical: TrafficLightCol.green,
    horizontal: TrafficLightCol.red,
  });
  const activeSide =
    trafficLights.vertical === TrafficLightCol.green
      ? Movements.vertical
      : Movements.horizontal;

  const [leftCarsCount, setLeftCarsCount] = useState<number>(
    getRandomInt(1, 20)
  );
  const [rightCarsCount, setRightCarsCount] = useState<number>(
    getRandomInt(1, 20)
  );
  const [topCarsCount, setTopCarsCount] = useState<number>(getRandomInt(1, 20));
  const [bottomCarsCount, setBottomCarsCount] = useState<number>(
    getRandomInt(1, 20)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficLights((prev) => ({
        horizontal: prev.vertical,
        vertical: prev.horizontal,
      }));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLeftCarsCount(getRandomInt(1, 5));
      setRightCarsCount(getRandomInt(1, 5));

      setTopCarsCount(getRandomInt(1, 5));
      setBottomCarsCount(getRandomInt(1, 5));
    }, 4000);
  }, []);

  return (
    <div style={{ backgroundImage: `url('${bg}')`, width: 1920, height: 1080 }}>
      <TrafficLights trafficLights={trafficLights} />
      <LeftCars
        count={leftCarsCount}
        moving={activeSide === Movements.vertical}
      />

      <RightCars
        count={rightCarsCount}
        moving={activeSide === Movements.vertical}
      />
      <TopCars
        count={topCarsCount}
        moving={activeSide === Movements.horizontal}
      />

      <BottomCars
        count={bottomCarsCount}
        moving={activeSide === Movements.horizontal}
      />

      {/* <button onClick={() => setLeftCarsCount(leftCarsCount + 47)}>
        {leftCarsCount}
      </button>
      <button
        onClick={() =>
          setTrafficLights({
            vertical: TrafficLightCol.red,
            horizontal: TrafficLightCol.red,
          })
        }
      >
        stop
      </button> */}
    </div>
  );
}

export default App;
