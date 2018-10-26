import axios from "axios";

const X_API_KEY = "l7xx0a43088fe6254712b10787646d1b298e";
const USER_AGENT = "Southwest/3.6.16 (iPhone; iOS 9.3.2; Scale/2.00)";

export const handler = (event, context, callback) =>
  axios
    .get(event.queryStringParameters.url, {
      headers: {
        "X-API-Key": X_API_KEY,
        "User-Agent": USER_AGENT,
        Accept: "*/*"
      }
    })
    .then(results => {
      console.log("========================================================");
      console.log(results);
      if (!results.status) {
        callback(null, {
          statusCode: 500,
          body: "Error fetching results"
        });
      } else if (results.status !== 200) {
        callback(null, {
          statusCode: results.status,
          body:
            "Sorry, I'm blocked from fetching results. They probably blocked the app ☹️"
        });
      } else {
        callback(null, {
          statusCode: results.status,
          body: JSON.stringify(results.data),
          headers: {
            "content-type": "application/json"
          }
        });
      }
    })
    .catch(callback);
