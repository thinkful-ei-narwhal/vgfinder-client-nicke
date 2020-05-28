import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GameItem from "./GameItem";
import GameFixtures from "./../../../testhelpers/GameFixtures";

describe(`GameItem component`, () => {
  it("renders a GameItem with supplied props", () => {
    const wrapper = shallow(<GameItem game={GameFixtures.stubGameData} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
