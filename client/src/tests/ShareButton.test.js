import React from "react";
import { render } from "@testing-library/react";
import { ShareButton } from "../components/ShareButton";
import "@testing-library/jest-dom/extend-expect";


describe("ShareButton", () => {
  const diet = {
    id: 1,
    mealInfo: {
      title: "Meals for Maria",
    },
    description: "Wine and cheese",
  };

  test("should render all share buttons", () => {
    const { getByRole } = render(<ShareButton diet={diet} />);
    const buttonWA = getByRole('button', { name: 'whatsapp' });
    const buttonTw = getByRole('button', { name: 'twitter' });
    const buttonE = getByRole('button', { name: 'email' });

    expect(buttonWA).toBeInTheDocument();
    expect(buttonTw).toBeInTheDocument();
    expect(buttonE).toBeInTheDocument();
  });


  // test("should have correct URLs for each share button", () => {
  //   const { getByRole, toHaveAttribute } = render(<ShareButton diet={diet} />);
    
  //   const mockWindow = {
  //     location: {
  //       origin: "http://codedoesntwork",
  //       location: "Barcelona"
  //     }
  //   };
  //   const windowlocation = mockWindow;

  //   const buttonWA = getByRole('button', { name: 'whatsapp' });
  //   const buttonTw = getByRole('button', { name: 'twitter' });
  //   const buttonE = getByRole('button', { name: 'email' });

  //   const getShareUrl = (dietId) => {
  //     return `${windowlocation.origin}/diet/${dietId}`;
  //   };
    
  //   expect(buttonWA).toHaveAttribute("url", getShareUrl(diet.id));
  //   expect(buttonTw).toHaveAttribute("url", getShareUrl(diet.id));
  //   expect(buttonE).toHaveAttribute("url", getShareUrl(diet.id));
  // });
})
