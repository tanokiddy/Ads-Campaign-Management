import { InfoCampaign } from "./InfoCampaign";
import { ISubCamPaign } from "./SubCampaign";

export interface ICampaign {
  campaign: {
    information: InfoCampaign;
  };
  subCampaigns: ISubCamPaign[];
}
