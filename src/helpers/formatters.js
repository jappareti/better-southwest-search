import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const formatDuration = minutes => {
  return moment.duration(minutes, "minutes").format("h[h] m[m]", {
    trim: "all"
  });
};

const formatDepartureDate = departureDateTime => {
  return moment(departureDateTime).format("ddd, MMM D");
};

const formatFareValue = (currencyType, fareValue) => {
  if (fareValue === Infinity) {
    return "Sold Out";
  }
  if (currencyType === "USD") {
    return fareValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  } else {
    return `${fareValue.toLocaleString()}pts`;
  }
};

const getLayoverDuration = segments => {
  const connectionArrival = moment(segments[0].arrivalDateTime);
  const connectionDeparture = moment(segments[1].departureDateTime);
  const layoverDuration = moment
    .duration(connectionDeparture.diff(connectionArrival))
    .asMinutes();
  return formatDuration(layoverDuration);
};

const hourFormatter = hour => {
  // Formats hour to standard time format
  // 1 -> 1:00 AM
  // 13 -> 1:00 PM
  // 0 -> 12:00 AM
  const hourStandard = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const meridiem = hour >= 12 && hour < 24 ? "PM" : "AM";
  return `${hourStandard}:00 ${meridiem}`;
};

export {
  formatDuration,
  formatDepartureDate,
  formatFareValue,
  getLayoverDuration,
  hourFormatter
};
