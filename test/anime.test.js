import React from "react";
import QuizAnime from "../src/components/Quizanime";
import SignInAnime from "../src/components/SignInAnime"
import renderer from "react-test-renderer";

it("render correctly", ()=>{
    const tree = renderer
    .create(<QuizAnime />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("render correctly", ()=>{
    const signInAnime = renderer
    .create(<SignInAnime />)
    .toJSON();
  expect(signInAnime).toMatchSnapshot();
});
