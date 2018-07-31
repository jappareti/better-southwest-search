import axios from "axios";

const DEFAULT_PARAMS = { "number-adult-passengers": 1 };

// Get Flights
export const getFlights = searchFilters => {
  const params = { ...DEFAULT_PARAMS, ...searchFilters };
  return axios.get("/.netlify/functions/getflights", {
    params,
    headers: { "content-type": "application/json" }
  });
};
