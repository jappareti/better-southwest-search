import * as R from "ramda";
import axios from "axios";

const X_API_KEY = "l7xx12ebcbc825eb480faa276e7f192d98d1";
const BASE_URL =
  "https://mobile.southwest.com/api/extensions/v1/mobile/flights/products";
const USER_AGENT = "Southwest/3.6.16 (iPhone; iOS 9.3.2; Scale/2.00)";

export const handler = (event, context, callback) =>
  axios
    .get(BASE_URL, {
      headers: {
        "X-API-Key": X_API_KEY,
        "User-Agent": USER_AGENT,
        Accept: "*/*"
      },
      params: event.queryStringParameters
    })
    .then(results => {
      console.log("========================================================");
      console.log(results);
      if (!results.status) {
        callback(null, { statusCode: 500, body: "Error fetching results" });
      } else if (results.status !== 200) {
        callback(null, {
          statusCode: results.status,
          body:
            "Sorry, I'm blocked from fetching results. They probably blocked the app ☹️"
        });
      } else {
        callback(null, {
          statusCode: results.status,
          body: JSON.stringify(results.data)
        });
      }
    })
    .catch(callback);
