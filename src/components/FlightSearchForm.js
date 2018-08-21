import moment from "moment";
import React, { Component } from "react";
import { Form, DatePicker, Button, Select, Radio } from "antd";
import { airports } from "constants/airports";
const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const airportOptions = airports.map(airport => {
  return <Option key={airport.key}>{airport.label}</Option>;
});

const disabledDate = current => {
  // Disable days before today, today and 30 weeks from today
  return (
    current &&
    (current < moment().endOf("day") || current > moment().add(30, "weeks"))
  );
};

class FlightSearchForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue["departureDates"];
      const values = {
        ...fieldsValue,
        departureDates: [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD")
        ]
      };
      this.props.getFlights(values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const rangeConfig = {
      rules: [
        {
          type: "array",
          required: true,
          message: "Please select departure date"
        }
      ],
      initialValue: this.props.searchOptions.departureDates.map(date =>
        moment(date)
      ) || [moment().add(14, "days"), moment().add(14, "days")]
    };
    const airportConfig = {
      rules: [
        {
          type: "array",
          required: true,
          max: 5,
          message: "Please select an airport. Maximum 5 airports"
        }
      ]
    };
    const departureConfig = {
      ...airportConfig,
      initialValue: this.props.searchOptions.departureAirports
    };
    const arrivalConfig = {
      ...airportConfig,
      initialValue: this.props.searchOptions.arrivalAirports
    };
    const currencyConfig = {
      initialValue: this.props.searchOptions.currencyType
    };
    const formItemStyle = {
      marginBottom: "10px"
    };
    return (
      <Form
        layout="vertical"
        onSubmit={this.handleSubmit}
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gridColumnGap: "10px"
        }}
      >
        <FormItem {...formItemLayout} style={formItemStyle}>
          {getFieldDecorator("departureAirports", departureConfig)(
            <Select
              mode="multiple"
              size="large"
              placeholder="Departure Airport(s)"
              optionLabelProp="value"
            >
              {airportOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={formItemStyle}>
          {getFieldDecorator("arrivalAirports", arrivalConfig)(
            <Select
              mode="multiple"
              size="large"
              placeholder="Arrival Airport(s)"
              optionLabelProp="value"
            >
              {airportOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={formItemStyle}>
          {getFieldDecorator("departureDates", rangeConfig)(
            <RangePicker size="large" disabledDate={disabledDate} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={formItemStyle}>
          {getFieldDecorator("currencyType", currencyConfig)(
            <RadioGroup size="large" style={{ width: "100%" }}>
              <RadioButton
                value="Dollars"
                style={{ width: "50%", textAlign: "center" }}
              >
                $
              </RadioButton>
              <RadioButton
                value="Points"
                style={{ width: "50%", textAlign: "center" }}
              >
                Pts
              </RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={formItemStyle}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={this.props.loading}
            style={{ paddingRight: 15, paddingLeft: 15, width: "100%" }}
          >
            Find flights
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedFlightSearchForm = Form.create()(FlightSearchForm);

export { WrappedFlightSearchForm as default };
