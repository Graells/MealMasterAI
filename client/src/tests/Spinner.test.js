import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../components/Spinner";

describe("Spinner", () => {
  it("Should be shown when the info is loading", () => {
    const { container, querySelector } = render(<Spinner />);
    const spinnerDiv = container.querySelector(".spinner");
    expect(spinnerDiv).toBeInTheDocument();
  });
});
