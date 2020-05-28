import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GamesList from "./GamesList";
import GameFixtures from "./../../../testhelpers/GameFixtures";

describe(`GamesList component`, () => {
  it("renders a GamesList without props", () => {
    const wrapper = shallow(<GamesList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders a GamesList with supplied games", () => {
    const wrapper = shallow(
      <GamesList gamesList={GameFixtures.stubGameListData} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
