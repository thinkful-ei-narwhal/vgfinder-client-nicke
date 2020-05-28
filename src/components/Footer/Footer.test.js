import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Footer from "./Footer";

describe(`Footer component`, () => {
  //test pushing the buttons cause redirects

  it("renders a form.Footer by default", () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
