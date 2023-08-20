import { useState } from "react";
import { State, City } from "country-state-city";

export const useSelectCityState = () => {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const states = State.getStatesOfCountry("US");
  const stateISOCodes: string[] = ["", ...states.map((s) => s.isoCode)];

  const cities: string[] = state
    ? City.getCitiesOfState("US", state).map((city) => city.name)
    : [];

  return { city, setCity, state, setState, states, stateISOCodes, cities };
};
