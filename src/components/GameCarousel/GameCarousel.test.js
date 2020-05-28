import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import GameCarousel from "./GameCarousel";

describe(`GameCarousel component`, () => {
  const propsGamesHomePage = {
    isSingleGame: false,
    reel: [
      {
        imgUrl:
          "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
        gameId: "2",
        title: "testGame",
      },
      {
        imgUrl:
          "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
        gameId: "3",
        title: "testGame",
      },
    ],
  };

  const propsGamePage = {
    isSingleGame: true,
    reel: [
      {
        imgUrl:
          "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
        gameId: "2",
      },
    ],
  };

  it("renders the GameCarousel given GamesHomePage props", () => {
    const wrapper = shallow(
      <GameCarousel
        reel={propsGamesHomePage.reel}
        isSingleGame={propsGamesHomePage.isSingleGame}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the GameCarousel given GamePage props", () => {
    const wrapper = shallow(
      <GameCarousel
        reel={propsGamePage.reel}
        isSingleGame={propsGamePage.isSingleGame}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
