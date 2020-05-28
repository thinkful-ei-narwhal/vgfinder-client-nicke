import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Alert from "./Alert";

describe(`Alert component`, () => {
  it("renders an alert by default", () => {
    const wrapper = shallow(<Alert />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders an alert with the correct message of the prop passed in", () => {
    const wrapper = shallow(<Alert message={{ error: "Test Error" }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders an alert with the correct message of the prop passed in, then executes the callback", () => {
    let stateDummy = 1;
    const wrapper = shallow(
      <Alert
        message={{ error: "Test Error" }}
        handleErrorClick={() => {
          stateDummy++;
        }}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();

    //timeout has to be just a little longer than the timeout inside of the alert
    setTimeout(() => {
      expect(stateDummy).toBe(2);
    }, 3000);
  });
});
