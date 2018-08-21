import React, { Component } from "react";
import { Collapse, Slider, Radio } from "antd";
import { hourFormatter } from "../helpers/formatters";
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

class FlightFilters extends Component {
  onChange = e => {
    this.props.handleFilterChange(e.target.name, e.target.value);
  };

  onAfterSliderChange = sliderName => value => {
    this.props.handleFilterChange(sliderName, value);
  };

  render() {
    const { filters } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <Collapse
        style={{ background: "None" }}
        bordered={false}
        defaultActiveKey={["1", "2", "3"]}
      >
        <Panel header="Stops" key="1">
          <RadioGroup
            onChange={this.onChange}
            value={filters.stops}
            name="stops"
          >
            <Radio style={radioStyle} value="nonStop">
              Nonstop
            </Radio>
            <Radio style={radioStyle} value="oneStop">
              1 stop or fewer (no plane change)
            </Radio>
            <Radio style={radioStyle} value="anyStops">
              Any stops
            </Radio>
          </RadioGroup>
        </Panel>
        <Panel header="Time" key="2">
          <p>Take-off</p>
          <Slider
            range
            max={24}
            step={1}
            defaultValue={filters.takeOffTime}
            // marks={{ 0: "12:00 AM", 12: "12:00 PM", 24: "12:00 AM" }}
            tipFormatter={hourFormatter}
            onAfterChange={this.onAfterSliderChange("takeOffTime")}
          />
          <p>Landing</p>
          <Slider
            range
            max={24}
            step={1}
            defaultValue={filters.landingTime}
            // marks={{ 0: "12:00 AM", 12: "12:00 PM", 24: "12:00 AM" }}
            tipFormatter={hourFormatter}
            onAfterChange={this.onAfterSliderChange("landingTime")}
          />
        </Panel>
      </Collapse>
    );
  }
}

export default FlightFilters;
