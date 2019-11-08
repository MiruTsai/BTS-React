import React from "react";
import GetTicketGuide from "../src/components/GetTicketGuide";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(<GetTicketGuide />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

