import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GamesHomePage from "./GamesHomePage";
import { GamesListProvider } from "./../../contexts/GamesListContext";

describe(`GamesHomePage component`, () => {
  it("renders a GamesHomePage component", () => {
    const wrapper = shallow(
      <GamesListProvider>
        <GamesHomePage />
      </GamesListProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
