import axios from "axios";

const DEFAULT_PARAMS = { "number-adult-passengers": 1 };
const BASE_URL =
  "https://mobile.southwest.com/api/mobile-air-booking/v1/mobile-air-booking/page/flights/products";

// Get Flights
export const getFlights = searchFilters => {
  const params = { ...DEFAULT_PARAMS, ...searchFilters };
  const queryString = Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
  const url = `${BASE_URL}?${queryString}`;
  return axios.get("/.netlify/functions/getflights", {
    params: {
      url
    }
  });
};
