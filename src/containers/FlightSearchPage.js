import React, { Component } from "react";
import { notification, Layout, Row, Col, Select } from "antd";
import FlightSearchForm from "FlightSearchForm";
import FlightFilters from "FlightFilters";
import FlightResult from "FlightResult";
import transformFlightData from "transformFlightData";
import createFlightSearches from "createFlightSearches";
import { sortFlights, filterFlights } from "sortAndFilters";
import * as R from "ramda";
import moment from "moment";
import * as api from "api";

import logo from "../logo.png";
// import sampleAPIresponse from "../data/2018-06-30-OAK-DEN-2018-01-12-14-49.json";

const { Content } = Layout;
const Option = Select.Option;

// const sampleFlightProducts = R.map(
//   transformFlightData,
//   sampleAPIresponse.trips[0].airProducts
// );

const openNotificationWithIcon = (type, msg, description) => {
  notification[type]({
    message: msg,
    description: description
  });
};

const defaultStartDate = moment().add(14, "days");
const defaultEndDate = moment().add(15, "days");

const defaultSearchOptions = {
  departureDates: [defaultStartDate, defaultEndDate],
  currencyType: "Dollars"
};

class FlightSearchPage extends Component {
  state = {
    // flightProducts: sampleFlightProducts,
    flightProducts: null,
    sortByOption: "fareValue",
    loading: false,
    loadingPriceAlert: false,
    searchOptions: defaultSearchOptions,
    filters: {
      stops: "anyStops",
      takeOffTime: [0, 24],
      landingTime: [0, 24]
    }
  };

  getFlights(searchOptions) {
    this.setState({ loading: true, searchOptions });
    const flightSearches = createFlightSearches(searchOptions);
    Promise.all(
      flightSearches.map(flightSearch => api.getFlights(flightSearch))
    )
      .then(response => {
        console.log(response);
        const flightProductsFlattened = R.flatten(
          response.map(result => result.data.trips[0].airProducts)
        );
        const flightProducts = R.map(
          transformFlightData,
          flightProductsFlattened
        );
        this.setState({ flightProducts, loading: false });
      })
      .catch(error => {
        console.log(error);
        openNotificationWithIcon(
          "error",
          `Error ${error.response.status}`,
          error.response.data
        );
        this.setState({ loading: false });
      });
  }
  handleSortChange(value) {
    this.setState({ sortByOption: value });
  }
  handleFilterChange(option, value) {
    const filters = { ...this.state.filters };
    filters[option] = value;
    this.setState({ filters });
  }

  render() {
    const { sortByOption, flightProducts, filters } = this.state;
    return (
      <Content>
        <Row
          type="flex"
          justify="center"
          style={{ background: "hsl(0, 0%, 5%)", paddingTop: "20px" }}
        >
          <Col span={24}>
            <FlightSearchForm
              getFlights={this.getFlights.bind(this)}
              loading={this.state.loading}
              searchOptions={this.state.searchOptions}
            />
          </Col>
        </Row>
        {flightProducts && (
          <Row>
            <Col xs={24} sm={10} md={8} style={{ padding: "10px 20px" }}>
              <FlightFilters
                filters={this.state.filters}
                handleFilterChange={this.handleFilterChange.bind(this)}
              />
            </Col>
            <Col xs={24} sm={14} md={16} style={{ padding: "10px 20px" }}>
              <div style={{ display: "grid", justifyItems: "end" }}>
                <div>
                  <span>Sorted by: </span>
                  <Select
                    defaultValue={this.state.sortByOption}
                    style={{ width: 200 }}
                    onChange={this.handleSortChange.bind(this)}
                  >
                    <Option value="fareValue">Price</Option>
                    <Option value="durationMinutes">Duration</Option>
                    <Option value="departureDateTime">Departure Time</Option>
                    <Option value="arrivalDateTime">Arrival Time</Option>
                  </Select>
                </div>
              </div>
              {sortFlights(
                sortByOption,
                filterFlights(filters)(flightProducts)
              ).map((flightProduct, i) => (
                <FlightResult key={i} flightProduct={flightProduct} />
              ))}
            </Col>
          </Row>
        )}
      </Content>
    );
  }
}

export default FlightSearchPage;
