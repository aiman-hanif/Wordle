import { NamedleContext } from "./NamedleContext";
import { useContext } from "react";
import { NamedleContextType } from "./types/Namedle";
import { TEST_NAME } from "./TestConstants";
import MapChart from "./Map";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
function GameResults() {
  const { name } = useContext(NamedleContext) as NamedleContextType;
  return (
    <div className="flex absolute h-full w-full items-center justify-center">
      <div className="rounded-md transition-all bg-ocean-02 h-[75%] md:w-1/2 lg:w-1/3 sm:w-1/2 z-100 ">
        <h1 className="text-center text-2xl font-bold text-white">
          Name of the day!
        </h1>
        <div className="flex flex-col ml-5 mt-5">
          <h2 className="text-xl text-white">{name}</h2>
          <p className="italic">{TEST_NAME.meaning}</p>
          <p>Country of origin: {TEST_NAME.countryOrigin}</p>
          <div className="w-full">
            <MapChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameResults;
