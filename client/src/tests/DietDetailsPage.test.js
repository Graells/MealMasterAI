import React, { useContext } from "react";
import {
  render,
  fireEvent,
  getByTestId,
  screen,
  window,
  getByLabelText,
  toHaveBeenCalledWith,
  toHaveBeenCalledTimes,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DietDetailsPage from "../components/DietDetailsPage";
import { DietProvider } from "./mocks/diestProvider";
import { DietContext } from "./mocks/diestProvider";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe.only("DietDetailsPage", () => {
  it("Should be shown when the info is loading", () => {
    const Dummy = () => {
      const diets = useContext(DietContext);
      console.log(diets);
      return <div></div>;
    };
    const { container, getByText } = render(
      <Provider store={store}>
      <DietProvider>
        <Dummy />
        <DietDetailsPage />
      </DietProvider>
      </Provider>
    );
    const button = getByText("Go to Dashboard");
    expect(button).toBeInTheDocument();
  });
});
