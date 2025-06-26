import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

export const useAddressData = (address) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === address.country
    );
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    } else {
      setStates([]);
    }
    setCities([]);
  }, [address.country]);

  useEffect(() => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === address.country
    );
    const selectedState = states.find((s) => s.name === address.state);
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
    } else {
      setCities([]);
    }
  }, [address.state]);

  return { states, cities };
}