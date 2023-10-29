import React, { useState } from "react";
import InfoCampaignTab from "./InfoCampaignTab";
import SubCampaignTab from "./SubCampaignTab";
import css from "./campaign.module.scss";
import { useCamPaign } from "@/contexts/CampaignContext";

const Campaign: React.FC = () => {
  const [isSubCampaign, setSubCampaign] = useState<boolean>(false);
  const [isValidated, setValidate] = useState<boolean>(true);
  const { campaign } = useCamPaign();
  const { name } = campaign.campaign.information;

  const isValidatedAdsQuantity = () => {
    return campaign.subCampaigns.every(
      (subCP) =>
        subCP.ads.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0
        ) > 0
    );
  };
  const isValidatedAdsName = () => {
    return campaign.subCampaigns.every((subCP) =>
      subCP.ads.every((ads) => !!ads.name)
    );
  };
  const isValidatedCPName = () => {
    return campaign.subCampaigns.every((subCP) => !!subCP.name);
  };

  const handleSubmit = () => {
    const isValidatedAllField =
      name &&
      isValidatedAdsQuantity() &&
      isValidatedAdsName() &&
      isValidatedCPName();
    if (isValidatedAllField) {
      setValidate(true);
      const filteredSubCP = campaign.subCampaigns.map((subCP) => {
        const { id: _, ...newSubCP } = subCP;
        return newSubCP;
      });
      const newCampaign = { ...campaign };
      newCampaign.subCampaigns = filteredSubCP;
      alert(JSON.stringify(newCampaign));
    } else {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
      setValidate(false);
    }
  };

  return (
    <>
      <button onClick={handleSubmit} className={css.button_submit}>
        Submit
      </button>
      <div className={css.campaign_container}>
        <div className={css.campaign_tabs_container}>
          <button
            className={`${!isSubCampaign ? css.isActive : ""} ${
              css.campaign_tab
            }`}
            onClick={() => {
              setSubCampaign(false);
            }}
          >
            THÔNG TIN
          </button>
          <button
            className={`${isSubCampaign ? css.isActive : ""} ${
              css.campaign_tab
            }`}
            onClick={() => {
              setSubCampaign(true);
            }}
          >
            CHIẾN DỊCH CON
          </button>
        </div>
        {isSubCampaign ? (
          <SubCampaignTab isValidated={isValidated} />
        ) : (
          <InfoCampaignTab isValidated={isValidated} />
        )}
      </div>
    </>
  );
};

export default Campaign;
