import * as R from "ramda";
import moment from "moment";

const sortFlights = (prop, flights) => {
  return R.sortBy(R.prop(prop), flights);
};

const filterStops = R.curry((stops, flight) => {
  // Any stops Filter
  if (stops === "anyStops") return true;

  // nonStop filter
  if (stops === "nonStop") {
    return flight.numberOfStops === 0;
  }

  // 1 stop or fewer (no plane change) filter
  // Should include non-stops
  if (stops === "oneStop") {
    return (
      flight.numberOfStops === 0 ||
      (flight.numberOfStops >= 1 && flight.connectionAirportCode === null)
    );
  }
});

const filterTimes = R.curry((time, takeOff, flight) => {
  const departureDateTime = takeOff
    ? moment(flight.departureDateTime)
    : moment(flight.arrivalDateTime);
  const departureTimeDecimal =
    departureDateTime.hour() + departureDateTime.minute() / 60;
  return time[0] <= departureTimeDecimal && time[1] >= departureTimeDecimal;
});

const filterFlights = R.curry((filters, flights) => {
  const { stops, takeOffTime, landingTime } = filters;
  return R.pipe(
    R.filter(filterStops(stops)),
    R.filter(filterTimes(takeOffTime, true)),
    R.filter(filterTimes(landingTime, false))
  )(flights);
});

export { sortFlights, filterStops, filterTimes, filterFlights };
