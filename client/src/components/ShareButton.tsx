import React from "react";
import { Diet } from "./DietDetailsPage";

import {
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

interface Props {
  diet: Diet;
}

export const ShareButton: React.FC<Props> = ({ diet }) => {
  const getShareUrl = (dietId: string) => {
    return `${window.location.origin}/diet/${dietId}`;
  };

  return (
    <div className="share-buttons">
      <WhatsappShareButton
        url={getShareUrl(String(diet.id))}
        title={`Check out this diet plan created using AI tech: ${diet.mealInfo.title}`}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url={getShareUrl(String(diet.id))}
        title={`Check out this diet plan created using AI tech: ${diet.mealInfo.title}`}
        hashtags={["YourAppHashtag"]}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <EmailShareButton
        url={getShareUrl(String(diet.id))}
        subject={`Check out this diet plan created using AI tech: ${diet.mealInfo.title}`}
        body={`Hey, I found this diet plan and thought you might be interested: ${getShareUrl(
          String(diet.id)
        )}
        
        The diet:
        
         ${diet.description}`}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
};
