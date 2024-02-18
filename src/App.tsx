import { useEffect, useState } from "react";
import { TrafficLights } from "./TrafficLights";
import { TrafficLightCol } from "./enums/TrafficLightCol";
import { TrafficLightsState } from "./types/TrafficLightsState";

import { LeftCars } from "./Cars/LeftCars";

import { Movements } from "./enums/MovementSides";

import { BottomCars } from "./Cars/BottomCars";
import { RightCars } from "./Cars/RightCars";
import { TopCars } from "./Cars/TopCars";

import { getRandomInt } from "./getMinMax";

import bg from "./intersection.jpg";

function App() {
  const [trafficLights, setTrafficLights] = useState<TrafficLightsState>({
    vertical: TrafficLightCol.green,
    horizontal: TrafficLightCol.red,
  });
  const activeSide =
    trafficLights.vertical === TrafficLightCol.green
      ? Movements.vertical
      : Movements.horizontal;

  const [leftCarsCount, setLeftCarsCount] = useState<number>(0);
  const [rightCarsCount, setRightCarsCount] = useState<number>(0);
  const [topCarsCount, setTopCarsCount] = useState<number>(0);
  const [bottomCarsCount, setBottomCarsCount] = useState<number>(0);

  useEffect(() => {
    const totalSecs = [
      {
        duration: 5000,
        green: Movements.horizontal,
        left: 3,
        right: 4,
        top: 6,
        bottom: 7,
      },
      {
        duration: 10000,
        green: Movements.vertical,
        left: 20,
        right: 20,
        top: 6,
        bottom: 6,
      },
      {
        duration: 5000,
        green: Movements.horizontal,
        left: 3,
        right: 4,
        top: 6,
        bottom: 7,
      },
    ].reduce((counter, item) => {
      const afterSec = counter + item.duration;
      setTimeout(() => {
        setTrafficLights({
          horizontal:
            item.green == Movements.horizontal
              ? TrafficLightCol.green
              : TrafficLightCol.red,
          vertical:
            item.green == Movements.vertical
              ? TrafficLightCol.green
              : TrafficLightCol.red,
        });

        setLeftCarsCount(item.left);
        setRightCarsCount(item.right);
        setTopCarsCount(item.top);
        setBottomCarsCount(item.bottom);
      }, counter);

      return afterSec;
    }, 0);

    setTimeout(() => {
      setTrafficLights({
        horizontal: TrafficLightCol.red,
        vertical: TrafficLightCol.green,
      });
    }, totalSecs);
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
