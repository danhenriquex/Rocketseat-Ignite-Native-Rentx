import {
  IconSpeed,
  IconAcceleration,
  IconForce,
  IconGasoline,
  IconEnergy,
  IconHybrid,
  IconExchange,
  IconPeople,
  IconCar,
} from "assets";

export function getAccessoryIcon(type: string) {
  switch (type) {
    case "speed":
      return IconSpeed;
    case "acceleration":
      return IconAcceleration;
    case "turning_diameter":
      return IconForce;
    case "gasoline_motor":
      return IconGasoline;
    case "electric_motor":
      return IconEnergy;
    case "hybrid_motor":
      return IconHybrid;
    case "exchange":
      return IconExchange;
    case "seats":
      return IconPeople;
    default:
      return IconCar;
  }
}
