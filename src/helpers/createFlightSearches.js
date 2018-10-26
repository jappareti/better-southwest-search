import * as R from "ramda";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// const CURRENCIES = ["Points"];

/**
 * Takes in list of dates and creates list of objects with the dates
 * @param {array} dates - list of dates. e.g. ['2018-04-22', '2018-04-23']
 * @return {array} an array of objects with "departure-date" keys
 *           [{"departure-date": '2018-04-22'}, {"departure-date":'2018-04-23'}]
 */
function addDates(dates) {
  return dates.map(date => {
    return {
      "departure-date": date
    };
  });
}
/**
 * Takes in list of objects of searches and adds currencies
 * @param {array} dates - list of objects. e.g. [{departureDate: '2018-04-22'}]
 * @return {array} list of objects with currencies added for each currency:
 * [{departureDate: '2018-04-22', currency: 'Points'},
 * {departureDate: '2018-04-22', currency: 'Dollars'}]
 */
// function addCurrencies(searches) {
//   return R.flatten(
//     CURRENCIES.map(currency => {
//       return searches.map(date => {
//         return { ...date, "currency-type": currency };
//       });
//     })
//   );
// }

/**
 * Takes in list of objects of searches and adds currencies
 * @param {array} dates - list of objects. e.g. [{departureDate: '2018-04-22'}]
 * @return {array} list of objects with currencies added for each currency:
 * [{departureDate: '2018-04-22', currency: 'Points'},
 * {departureDate: '2018-04-22', currency: 'Dollars'}]
 */
const addCurrency = R.curry((currency, searches) => {
  return R.flatten(
    searches.map(search => {
      return { ...search, currency };
    })
  );
});

/**
 * Adds airports to list of searches
 * @param {array} airports - list of airports, e.g. ['OAK', 'SFO']
 * @param {string} direction - either "origination-airport" or "destination-airport"
 * @param {array} searches - list of searches
 * @returns {array} updated list of searches with airports added
 */
const addAirports = R.curry((airports, direction, searches) => {
  return R.flatten(
    searches.map(search => {
      return airports.map(airport => {
        return { ...search, [direction]: airport };
      });
    })
  );
});

/**
 * Constructs a list of parameters to use in the API from the inputted query params
 * The goal is to request multiple searches, so this builds the list of searches
 * to get from the API.
 * @param {object} queryParams - object of query parameters
 * @return {array} list of searches with parameters:
 * [{ departureDate: '2018-04-18',
 *    currencyType: 'Dollars',
 *    originationAirport: 'OAK',
 *    destinationAirport: 'DEN'}]
 */
function createFlightSearches(queryParams) {
  const departureDateRange = moment().range(
    queryParams.departureDates[0],
    queryParams.departureDates[1]
  );
  const departureDateRangeArr = Array.from(departureDateRange.by("day")).map(
    date => date.format("YYYY-MM-DD")
  );
  const departureAirports = queryParams["departureAirports"];
  const arrivalAirports = queryParams["arrivalAirports"];
  const currency = queryParams["currency"];
  return R.pipe(
    addDates,
    addCurrency(currency),
    addAirports(departureAirports, "origination-airport"),
    addAirports(arrivalAirports, "destination-airport")
  )(departureDateRangeArr);
}

export default createFlightSearches;
