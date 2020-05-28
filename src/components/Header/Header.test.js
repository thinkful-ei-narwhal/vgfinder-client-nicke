import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Header from "./Header";

describe(`Header component`, () => {
  it("renders a Header component without supplied props", () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders a Header component with supplied props", () => {
    const testPath = "/homepage";
    const wrapper = shallow(<Header pathName={testPath} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
