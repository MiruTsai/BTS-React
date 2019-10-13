import React from "react";
import GetTicketGuide from "../src/components/guide";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(<GetTicketGuide></GetTicketGuide>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

