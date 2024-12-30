export interface DirectionsResponse {
  code:      string;
  routes:    Route[];
  waypoints: Waypoint[];
}

export interface Route {
  legs:        Leg[];
  weight_name: string;
  weight:      number;
  duration:    number;
  distance:    number;
}

export interface Leg {
  steps:    Step[];
  summary:  string;
  weight:   number;
  duration: number;
  distance: number;
}

export interface Step {
  geometry:      Geometry;
  maneuver:      Maneuver;
  mode:          Mode;
  driving_side:  DrivingSide;
  name:          string;
  intersections: Intersection[];
  weight:        number;
  duration:      number;
  distance:      number;
}

export enum DrivingSide {
  Left = "left",
  None = "none",
  Right = "right",
  Straight = "straight",
}

export interface Geometry {
  coordinates: Array<number[]>;
  type:        Type;
}

export enum Type {
  LineString = "LineString",
}

export interface Intersection {
  out?:     number;
  entry:    boolean[];
  bearings: number[];
  location: number[];
  in?:      number;
  lanes?:   Lane[];
}

export interface Lane {
  valid:       boolean;
  indications: DrivingSide[];
}

export interface Maneuver {
  bearing_after:  number;
  bearing_before: number;
  location:       number[];
  type:           string;
  modifier?:      DrivingSide;
}

export enum Mode {
  Driving = "driving",
}

export interface Waypoint {
  hint:     string;
  distance: number;
  name:     string;
  location: number[];
}

