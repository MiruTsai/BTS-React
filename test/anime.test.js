import React from "react";
import QuizAnime from "../src/components/quizanime";
import SignInAnime from "../src/components/signInAnime"
import renderer from "react-test-renderer";

it("render correctly",()=>{
    const tree = renderer
    .create(<QuizAnime />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("render correctly",()=>{
    const signInAnime = renderer
    .create(<SignInAnime />)
    .toJSON();
  expect(signInAnime).toMatchSnapshot();
});
