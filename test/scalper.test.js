import React from "react";
import Scalper from "../src/components/scalper";
import renderer from "react-test-renderer";

it("render correctly",()=>{
    const tree = renderer
    .create(<Scalper />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
