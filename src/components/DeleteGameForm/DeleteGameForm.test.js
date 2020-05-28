import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import DeleteGameForm from "./DeleteGameForm";

describe(`DeleteGameForm component`, () => {
  //add to the db and delete
  //Test the failures

  it("renders a form.DeleteGameForm by default", () => {
    const wrapper = shallow(<DeleteGameForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
