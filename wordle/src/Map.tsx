import {
  ComposableMap,
  Geographies,
  Annotation,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { TEST_NAME } from "./TestConstants";

const geoUrl = "/countries-110m.json";

export default function MapChart() {
  return (
    <ComposableMap>
      <ZoomableGroup center={[0, 0]} zoom={9}>
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any }) =>
            geographies.map((geo: any) => {
              console.log(geo);
              return (
                <Geography
                  style={{
                    default: {
                      fill:
                        TEST_NAME.countryOrigin === geo.properties.name
                          ? "#E63946"
                          : "#D6D6DA",
                      outline: "none",
                      transition: "all 0.3s ease-in-out",
                    },
                    hover: {
                      fill: "#1D3557",
                      outline: "none",
                    },
                  }}
                  key={geo.rsmKey}
                  geography={geo}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
