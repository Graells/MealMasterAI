import React from "react";
import {
  render,
  fireEvent
} from "@testing-library/react";
import ShareButton from "./ShareButton";

describe("ShareButton", () => {
  test("clicking on the WhatsApp share button should open the WhatsApp share dialog with the correct message", () => {
    const diet = {
      mealInfo: {
        title: "Test Diet Plan"
      },
      description: "This is a test diet plan"
    };
    const { getByTestId } = render(<ShareButton diet={diet} />);
    const whatsappShareButton = getByTestId("whatsapp-share-button");
    fireEvent.click(whatsappShareButton);
  });
})