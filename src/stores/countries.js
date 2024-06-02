import { defineStore } from "pinia";
import axios from "axios";

export const useCountryStore = defineStore("countryStore", {
  state: () => ({
    countries: [],
    currentCountryCode: null,
    loading: true,
  }),
  getters: {
    currentCountry() {
      try {
        const country = this.countries.find(
          (c) => c.alpha3Code === this.currentCountryCode
        );

        if (country) {
          return {
            capital: country.capital[0],
            area: country.area,
            name: country.name.common,
            alpha2Code: country.alpha2Code.toLowerCase(),
            borders: country.borders.map((borderCountryCode) => {
              const borderCountry = this.countries.find(
                (c) => c.alpha3Code === borderCountryCode
              );
              return borderCountry ? borderCountry.name.common : "";
            }),
          };
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  actions: {
    async loadCountries() {
      const response = await axios.get(
        "https://ih-countries-api.herokuapp.com/countries "
      );
      this.countries = response.data;
      this.loading = false;
    },
    setCountryCode(code) {
      this.currentCountryCode = code;
    },
  },
});