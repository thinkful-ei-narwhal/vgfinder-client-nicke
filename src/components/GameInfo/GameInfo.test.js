import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GameInfo from "./GameInfo";
import stubGameData from "./../../../testhelpers/GameFixtures";

describe(`GameInfo component`, () => {
  it("renders a GameInfo with supplied props", () => {
    const wrapper = shallow(<GameInfo game={stubGameData} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
