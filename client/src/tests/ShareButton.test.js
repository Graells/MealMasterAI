import React from "react";
import {
  render,
  fireEvent
} from "@testing-library/react";
import ShareButton from "./ShareButton";

describe("ShareButton", () => {
  test("clicking on the WhatsApp share button should open the WhatsApp share dialog with the correct message", () => {
    const diet = {
      id: "1",
      mealInfo: {
        title: "Test Diet Plan"
      },
      description: "This is a test diet plan"
    };
    const { getByTestId } = render(<ShareButton diet={diet} />);
    const whatsappShareButton = getByTestId("whatsapp-share-button");
    fireEvent.click(whatsappShareButton);
    expect(window.location.href).toContain(`whatsapp://send?text=Check%20out%20this%20diet%20plan%20created%20using%20AI%20tech%3A%20${encodeURIComponent(diet.mealInfo.title)}`);
  });
})