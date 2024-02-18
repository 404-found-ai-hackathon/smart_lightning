import { Movements } from "../enums/MovementSides";
import { TrafficLightCol } from "../enums/TrafficLightCol";

export type TrafficLightsState = Record<Movements, TrafficLightCol>;
