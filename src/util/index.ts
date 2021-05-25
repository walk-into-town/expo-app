import { SearchCampaign } from "@types";

// campaign rate
export const getRatedAvg = (campaign: SearchCampaign) => {
  if (campaign.comments.length === 0) return 0;

  const totalReted = campaign.comments.reduce((ac, v) => ac + Number(v.rated), 0);
  return totalReted / campaign.comments.length;
}

export * from "./check"
export * from "./time"
export * from "./objmaker"