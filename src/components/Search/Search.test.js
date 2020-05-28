import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Search from "./Search";
import GameFixtures from "./../../../testhelpers/GameFixtures";

describe(`Search component`, () => {
  it("renders a Search component with supplied props", () => {
    const wrapper = shallow(
      <Search gamesList={GameFixtures.stubGameListData} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
