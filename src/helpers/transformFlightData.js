const getConnections = flight => {
  // response is something like: ""stopDescriptionOnSelect": "1 Stop, Change planes SNA"
  // this grabs the airport code from the string
  // SWA doesn't specify both airport codes for 2 stops, only one of them
  // So this should work with 2 stops as well.
  if (flight.stopDescription === "Nonstop") return null;

  // Splits the string "1 Stop, No plane change" to ['1 Stop', 'No plane change']
  if (flight.stopDescriptionOnSelect.split(", ")[1] === "No plane change")
    return null;

  return flight.stopDescription.slice(-3);
};

const getFareValue = meta => {
  // If 0, then all flights are sold out.
  // Return Infinity so that sorting works property on client
  if (meta.startingFromAmount === 0) return Infinity;
  return meta.startingFromAmount;
};

/**
 * Input is the airProduct from the API
 * Output is the transformed data, removing all fares except Wanna Get Away fares
 * @param {object} - flight data object
 * @return {object} - transformed flight data object
 * {
 *   departureDateTime
 *   departureAirportCode
 *   arrivalDateTime
 *   arrivalAirportCode
 *   connectionAirportCode {string} - undefined if nonstop
 *   durationMinutes
 *   numberOfStops {number} - 0 for nonstop
 *   segments {array}
 *   currencyType {string} - Dollars or Points
 *   fareValue {number} - in cents or points
 *   seatsAvailable {number}
 *   productId {string}
 * }
 */
const transformFlightData = flight => {
  // flight._meta.cardId is like the following string: "OAK:DEN:18:2018-11-23"
  // The extra comma in the array destructuring ignores the `18` value becuase I don't know what it represents
  const [
    departureAirportCode,
    arrivalAirportCode,
    ,
    departureDate
  ] = flight._meta.cardId.split(":");
  const { durationMinutes, numberOfStops } = flight._meta;
  return {
    departureDateTime: `${departureDate}T${flight.departureTime}`,
    arrivalDateTime: `${departureDate}T${flight.arrivalTime}`,
    departureAirportCode,
    arrivalAirportCode,
    connectionAirportCode: getConnections(flight),
    fareValue: getFareValue(flight._meta),
    durationMinutes,
    numberOfStops,
    flightNumbers: flight.flightNumbers,
    stopDescriptionOnSelect: flight.stopDescriptionOnSelect
  };
};

export default transformFlightData;
