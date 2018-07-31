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
      console.log("Received values of form: ", values);
      this.props.getFlights(values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
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
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout}>
          {getFieldDecorator("departureAirports", departureConfig)(
            <Select
              mode="multiple"
              size="large"
              placeholder="Departure Airport(s)"
              optionLabelProp="value"
              style={{ width: 200 }}
            >
              {airportOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator("arrivalAirports", arrivalConfig)(
            <Select
              mode="multiple"
              size="large"
              placeholder="Arrival Airport(s)"
              optionLabelProp="value"
              style={{ width: "200px" }}
            >
              {airportOptions}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator("departureDates", rangeConfig)(
            <RangePicker
              size="large"
              disabledDate={disabledDate}
              style={{ width: "300px" }}
            />
          )}
          <div style={{ marginTop: -9, textAlign: "center" }}>
            Departure date range
          </div>
        </FormItem>

        <FormItem {...formItemLayout} />
        {getFieldDecorator("currencyType", currencyConfig)(
          <RadioGroup size="large">
            <RadioButton value="Dollars">$</RadioButton>
            <RadioButton value="Points">Pts</RadioButton>
          </RadioGroup>
        )}
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={this.props.loading}
            icon="search"
            style={{ paddingRight: 15, paddingLeft: 15 }}
          />
        </FormItem>
      </Form>
    );
  }
}

const WrappedFlightSearchForm = Form.create()(FlightSearchForm);

export { WrappedFlightSearchForm as default };
