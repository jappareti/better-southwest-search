import * as R from "ramda";

const getConnections = segments => {
  if (R.length(segments) > 1) {
    return R.last(segments).originationAirportCode;
  } else {
    return segments[0].stopAirportCodes[0];
  }
};

const getNumberOfStops = segments => {
  if (R.length(segments) > 1 || R.length(segments[0].stopAirportCodes) > 0) {
    return 1;
  } else {
    return 0;
  }
};

const hasDollars = R.has("currencyPrice");

const getCurrencyType = fareProduct => {
  return hasDollars(fareProduct) ? "Dollars" : "Points";
};

const getFareValue = fareProduct => {
  let fareValue;
  if (hasDollars(fareProduct)) {
    fareValue = fareProduct.currencyPrice.totalFareCents;
  } else {
    fareValue = fareProduct.pointsPrice.redemptionPoints;
  }
  return fareValue !== 0 ? fareValue : Infinity;
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
  return {
    departureDateTime: flight.segments[0].departureDateTime,
    departureAirportCode: flight.segments[0].originationAirportCode,
    arrivalDateTime: R.last(flight.segments).arrivalDateTime,
    arrivalAirportCode: R.last(flight.segments).destinationAirportCode,
    connectionAirportCode: getConnections(flight.segments),
    segments: flight.segments,
    durationMinutes: flight.durationMinutes,
    numberOfStops: getNumberOfStops(flight.segments),
    currencyType: getCurrencyType(flight.fareProducts[0]),
    fareValue: getFareValue(flight.fareProducts[2]),
    seatsAvailable: parseInt(flight.fareProducts[2].seatsAvailable, 10),
    productId: flight.fareProducts[2].productId
  };
};

export default transformFlightData;
