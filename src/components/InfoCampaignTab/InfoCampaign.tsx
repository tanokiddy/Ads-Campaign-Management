import { useCamPaign } from "../../contexts/CampaignContext";
import css from "./info_campaign.module.scss";

const InfoCampaign = () => {
  const { campaign, setCampaign } = useCamPaign();
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNameInput = e.target.getAttribute("id")?.includes("name");
    if (isNameInput) {
      const newCampaign = { ...campaign };
      newCampaign.campaign.information.name = e.target.value;
      setCampaign(newCampaign);
    } else {
      const newCampaign = { ...campaign };
      newCampaign.campaign.information.describe = e.target.value;
      setCampaign(newCampaign);
    }
  };

  return (
    <div className="container">
      <div className={css.info_name}>
        <input
          value={campaign.campaign.information.name}
          onChange={(e) => {
            handleChangeInput(e);
          }}
          required
          type="text"
          id="info_name_input"
          className={`${
            campaign.campaign.information.name ? css.info_name_input_active : ""
          } ${css.info_name_input}`}
        />
        <label className={css.label_info} htmlFor="info_name_input">
          Tên chiến dịch *
        </label>
      </div>
      <div className={css.info_des}>
        <input
          value={campaign.campaign.information.describe}
          onChange={(e) => {
            handleChangeInput(e);
          }}
          required
          type="text"
          id="info_des_input"
          className={`${
            campaign.campaign.information.describe ? css.info_des_input_active : ""
          } ${css.info_des_input}`}
        />
        <label className={css.label_info} htmlFor="info_des_input">
          Mô tả *
        </label>
      </div>
    </div>
  );
};

export default InfoCampaign;
