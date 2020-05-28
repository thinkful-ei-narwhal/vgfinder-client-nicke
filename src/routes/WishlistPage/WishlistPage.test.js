import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import WishlistPage from "./WishlistPage";
import { UserIdContextProvider } from "./../../contexts/UserIdContext";

describe(`WishlistPage component`, () => {
  it("renders a WishlistPage component", () => {
    const wrapper = shallow(
      <UserIdContextProvider>
        <WishlistPage />
      </UserIdContextProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
