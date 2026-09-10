import React from "react";
import {
  render,
  screen
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import App from "./App";


describe("PostPilot Application", () => {


  test("renders application title", () => {

    render(<App />);

    expect(
      screen.getByText("PostPilot")
    ).toBeInTheDocument();

  });


  test("renders content orbit", () => {

    render(<App />);

    expect(
      screen.getByText("Content Orbit")
    ).toBeInTheDocument();

  });


  test("renders performance center", () => {

    render(<App />);

    expect(
      screen.getByText("Performance Center")
    ).toBeInTheDocument();

  });


  test("renders calendar", () => {

    render(<App />);

    expect(
      screen.getByText("Content Calendar")
    ).toBeInTheDocument();

  });


  test("create post button opens form", async () => {

    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByText("＋ Create Post")
    );

    expect(
      screen.getByText("Schedule New Post")
    ).toBeInTheDocument();

  });


  test("shows optimization techniques", () => {

    render(<App />);

    expect(
      screen.getByText("React.memo")
    ).toBeInTheDocument();

    expect(
      screen.getByText("useMemo")
    ).toBeInTheDocument();

    expect(
      screen.getByText("useCallback")
    ).toBeInTheDocument();

  });

});