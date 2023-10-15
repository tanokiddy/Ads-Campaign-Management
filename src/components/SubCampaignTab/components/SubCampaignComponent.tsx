import React from "react";
import css from "../sub_campaign.module.scss";
import { useCamPaign } from "../../../contexts/CampaignContext";
import { ISubCamPaign } from "@/types";
import { CheckIcon } from "../../../icons";

interface ISubCampaignComponentProps {
  isValidated: boolean;
}

const SubCampaignComponent: React.FC<ISubCampaignComponentProps> = ({
  isValidated,
}) => {
  const { campaign, setCampaign, activeSubCampaign, setActiveSubCampaign } =
    useCamPaign();
  let newCampaign = { ...campaign };
  let newActiveSubCP = { ...activeSubCampaign };

  const isCPActive = (subCampaign: ISubCamPaign) => {
    return subCampaign.id === activeSubCampaign.id;
  };

  const handleTotalAds = (item: ISubCamPaign) => {
    let totalAds = 0;
    item.ads.map((item) => (totalAds += item.quantity));
    return totalAds;
  };

  const handleChangeSubCPName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubCPName = e.target.value;
    newActiveSubCP.name = newSubCPName;
    newCampaign.subCampaigns.map((item) => {
      if (item.id === newActiveSubCP.id) {
        return (item.name = newActiveSubCP.name);
      } else {
        return item;
      }
    });
    setCampaign(newCampaign);
    setActiveSubCampaign(newActiveSubCP);
  };

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked;
    newActiveSubCP.status = newStatus;
    newCampaign.subCampaigns.map((item) => {
      if (item.id === newActiveSubCP.id) {
        return (item.status = newActiveSubCP.status);
      } else {
        return item;
      }
    });
    setCampaign(newCampaign);
    setActiveSubCampaign(newActiveSubCP);
  };

  const handleAddCampaign = () => {
    let adsCount = new Array(1);
    newCampaign.subCampaigns.push({
      name: `Chiến dịch con ${newCampaign.subCampaigns.length + 1}`,
      ads: [
        {
          name: "Quảng cáo 1",
          quantity: 0,
          id: adsCount.length,
        },
      ],
      status: true,
      id: newCampaign.subCampaigns.length + 1,
    });
    setCampaign(newCampaign);
  };

  const handleSetActiveSubCP = (item: ISubCamPaign) => {
    setActiveSubCampaign(item);
  };

  const handleIsValidatedAllField = (subCP: ISubCamPaign):boolean => {
    const isValidatedAdsName = subCP.ads.every((ads) => !!ads.name);
    const isValidatedAdsQuantity = subCP.ads.every((ads) => !!ads.quantity);
    console.log('!!subCP.name && isValidatedAdsName && isValidatedAdsQuantity: ', !!subCP.name && isValidatedAdsName && isValidatedAdsQuantity);
    return !!subCP.name && isValidatedAdsName && isValidatedAdsQuantity;
  };

  return (
    <>
      <div className={css.sub_cp}>
        <button onClick={handleAddCampaign} className={css.button_add_cp}>
          +
        </button>
        <div className={css.sub_cp_container}>
          {campaign.subCampaigns.map((item, index) => (
            <div
              className={`${css.sub_cp_item} ${
                isCPActive(item) ? css.sub_cp_item_active : ""
              }`}
              key={index}
              onClick={() => handleSetActiveSubCP(item)}
            >
              <div className={css.sub_cp_info}>
                <span
                  className={`${css.sub_cp_name} ${
                    !isValidated && !handleIsValidatedAllField(item)
                      ? css.sub_cp_error
                      : ""
                  }`}
                >
                  {item.name}
                </span>
                <span className={css.sub_cp_status}>
                  <CheckIcon color={item.status ? "#4FBA69" : ""} />
                </span>
              </div>
              <div className={css.sub_cp_ads}>{handleTotalAds(item)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={css.sub_cp_item_line2}>
        <div className={css.form_input_cp}>
          {!isValidated && !activeSubCampaign.name ? (
            <span className={css.input_error}>Dữ liệu không hợp lệ</span>
          ) : (
            null
          )}
          <input
            className={`${css.input_sub_cp} ${
              activeSubCampaign.name ? css.input_sub_cp_active : ""
            }`}
            type="text"
            id="sub_cp"
            value={activeSubCampaign.name}
            onChange={(e) => {
              handleChangeSubCPName(e);
            }}
          />
          <label className={css.label_sub_cp} htmlFor="sub_cp">
            Tên chiến dịch con
          </label>
        </div>
        <div className={css.form_status}>
          <label htmlFor="sub_cp_checkbox">Đang hoạt động</label>
          <input
            checked={activeSubCampaign.status}
            type="checkbox"
            id="sub_cp_checkbox"
            onChange={(e) => {
              handleChangeCheckBox(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SubCampaignComponent;
