import L from "leaflet";

import { PlanetProperties } from "./interfaces/planet";
import {
  featuresOfPlanet,
  findFactionForPlanetWithName,
  getDataForPlanetWithName,
  isFactionCapitol
} from "./utils/planets";

export const iconForPlanet = (planet: string) => {
  const { climate, terrain } = featuresOfPlanet(planet);
  const planetProperties: PlanetProperties = getDataForPlanetWithName(planet);
  const hasPlanetSpecificIcon = !!planetProperties && !!planetProperties.icon;
  const capitol = isFactionCapitol(planet);
  const faction = findFactionForPlanetWithName(planet);

  const url = () => {
    switch (hasPlanetSpecificIcon) {
      case true:
        return require(`./assets/planets/${planetProperties.icon}`);
      default:
        switch (capitol) {
          case true:
            switch (faction.factionName) {
              case "Alliance":
                return require("./assets/planets/lush-alliance-capital.png");
              // TODO: add for others
              default:
                return require("./assets/planets/city.png");
            }
          case false:
            switch (climate) {
              case "frozen":
                return require("./assets/planets/snow-world.png");
              case "tropical":
                return require("./assets/planets/lush.png");
              case "arid":
                return require("./assets/planets/desert.png");
              default:
                switch (terrain) {
                  case "cityscape":
                    return require("./assets/planets/city.png");
                  case "ocean":
                    return require("./assets/planets/waterworld.png");
                  case "gas giant":
                    return require("./assets/planets/gas-giant.png");
                  case "volcanoes":
                    return require("./assets/planets/volcanic.png");
                  default:
                    return require("./assets/planets/temperate.png");
                }
            }
        }
    }
  };

  return L.icon({
    iconUrl: url(),
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62] // the same for the shadow
  });
};

export const createClusterCustomIcon = cluster => {
  const count = cluster.getChildCount();
  let size = "LargeXL";

  if (count < 10) {
    size = "Small";
  } else if (count >= 10 && count < 100) {
    size = "Medium";
  } else if (count >= 100 && count < 500) {
    size = "Large";
  }
  const options = {
    cluster: `markerCluster${size}`
  };

  return L.divIcon({
    html: `<div>
        <img class=${options.cluster} src='https://raw.githubusercontent.com/jennygrahamjones/galaxy-map/master/map/src/assets/planets/temperate.png' />
      </div>`,
    className: `${options.cluster}`
  });
};
