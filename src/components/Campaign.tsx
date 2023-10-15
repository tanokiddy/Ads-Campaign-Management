import React, { useState } from "react";
import InfoCampaignTab from "./InfoCampaignTab";
import SubCampaignTab from "./SubCampaignTab";
import css from "./campaign.module.scss";
import { useCamPaign } from "../contexts/CampaignContext";

const Campaign = () => {
  const [isSubCampaign, setSubCampaign] = useState<boolean>(false);
  const {campaign} = useCamPaign()
  const handleSubmit = () => {
    alert(JSON.stringify(campaign))
  }
  
  return (
    <>
      <button onClick={handleSubmit} className={css.button_submit}>Submit</button>
      <div className={css.campaign_container}>
        <div className={css.campaign_tabs_container}>
          <button
            className={`${!isSubCampaign ? css.isActive : ""} ${css.campaign_tab}`}
            onClick={() => {
              setSubCampaign(false);
            }}
          >
            THÔNG TIN
          </button>
          <button
            className={`${isSubCampaign ? css.isActive : ""} ${css.campaign_tab}`}
            onClick={() => {
              setSubCampaign(true);
            }}
          >
            CHIẾN DỊCH CON
          </button>
        </div>
        {isSubCampaign ? <SubCampaignTab /> : <InfoCampaignTab />}
      </div>
    </>
  );
};

export default Campaign;
