import { FC, HTMLAttributes } from "react";

import { TrafficLightsState } from "./types/TrafficLightsState";

import { Sides } from "./enums/Sides";
import { TrafficLightCol } from "./enums/TrafficLightCol";

interface ITrafficLightsProps {
  trafficLights: TrafficLightsState;
}

const trafficLightsOffsets: Record<
  Sides,
  Record<TrafficLightCol, { x: number; y: number }>
> = {
  top: {
    red: {
      x: 847,
      y: 349,
    },
    yellow: {
      x: 872,
      y: 349,
    },
    green: {
      x: 897,
      y: 349,
    },
  },
  bottom: {
    red: {
      x: 1017,
      y: 711,
    },
    yellow: {
      x: 1042,
      y: 711,
    },
    green: {
      x: 1067,
      y: 711,
    },
  },
  left: {
    red: {
      x: 769,
      y: 597,
    },
    yellow: {
      x: 769,
      y: 622,
    },
    green: {
      x: 769,
      y: 647,
    },
  },
  right: {
    red: {
      x: 1131,
      y: 427,
    },
    yellow: {
      x: 1131,
      y: 452,
    },
    green: {
      x: 1131,
      y: 477,
    },
  },
};

export const TrafficLights: FC<ITrafficLightsProps> = ({ trafficLights }) => {
  return (
    <div style={{ position: "relative" }}>
      <TrafficLight
        id="top"
        top={trafficLightsOffsets.top[trafficLights.horizontal].y}
        left={trafficLightsOffsets.top[trafficLights.horizontal].x}
        col={trafficLights.horizontal}
      />
      <TrafficLight
        id="bottom"
        top={trafficLightsOffsets.bottom[trafficLights.horizontal].y}
        left={trafficLightsOffsets.bottom[trafficLights.horizontal].x}
        col={trafficLights.horizontal}
      />
      <TrafficLight
        id="left"
        top={trafficLightsOffsets.left[trafficLights.vertical].y}
        left={trafficLightsOffsets.left[trafficLights.vertical].x}
        col={trafficLights.vertical}
      />
      <TrafficLight
        id="right"
        top={trafficLightsOffsets.right[trafficLights.vertical].y}
        left={trafficLightsOffsets.right[trafficLights.vertical].x}
        col={trafficLights.vertical}
      />
    </div>
  );
};

interface ITrafficLightProps extends HTMLAttributes<HTMLDivElement> {
  top: number;
  left: number;
  col: TrafficLightCol;
}

export const TrafficLight: FC<ITrafficLightProps> = ({
  top,
  left,
  col,
  ...props
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        backgroundColor: col,
        width: 20,
        height: 20,
        borderRadius: "50%",
      }}
      {...props}
    ></div>
  );
};
