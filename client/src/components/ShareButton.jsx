import React from "react";
import {
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

export const ShareButton = ({ diet }) => {
  const getShareUrl = (dietId) => {
    return `${window.location.origin}/diet/${dietId}`;
  };

  return (
    <div className="share-buttons">
      <WhatsappShareButton
        url={getShareUrl(diet.id)}
        quote={`Check out this diet plan: ${diet.mealInfo.title}`}
        hashtag="#YourAppHashtag"
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url={getShareUrl(diet.id)}
        title={`Check out this diet plan: ${diet.mealInfo.title}`}
        hashtags={["YourAppHashtag"]}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <EmailShareButton
        url={getShareUrl(diet.id)}
        subject={`Check out this diet plan: ${diet.mealInfo.title}`}
        body={`Hey, I found this diet plan and thought you might be interested: ${getShareUrl(
          diet.id
        )}`}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
};
