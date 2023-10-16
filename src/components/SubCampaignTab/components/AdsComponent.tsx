import { useState } from "react";
import { useCamPaign } from "../../../contexts/CampaignContext";
import css from "../sub_campaign.module.scss";
import { TrashIcon } from "../../../icons";

interface IAdsComponentProps {
  isValidated: boolean;
}

const AdsComponent: React.FC<IAdsComponentProps> = ({ isValidated }) => {
  const { campaign, setCampaign, activeSubCampaign, setActiveSubCampaign } =
    useCamPaign();
  const [checkedAds, setCheckedAds] = useState<string[]>([]);

  const isCheckBoxAll =
    activeSubCampaign.ads.length > 0 &&
    checkedAds.length === activeSubCampaign.ads.length;

  let newActiveSubCP = { ...activeSubCampaign };
  let newCampaign = { ...campaign };
  let newCheckedAds = [...checkedAds];

  const handleChangeAdsName = (
    e: React.ChangeEvent<HTMLInputElement>,
    adsName: string
  ) => {
    const isNameInput = e.target.getAttribute("id") === "ads_name";
    const newAdsProp = e.target.value;
    newActiveSubCP.ads.map((item) => {
      if (isNameInput) {
        if (item.name === adsName) {
          return (item.name = newAdsProp);
        } else {
          return item;
        }
      } else {
        if (item.name === adsName) {
          return (item.quantity = Number(newAdsProp));
        } else {
          return item;
        }
      }
    });
    newCampaign.subCampaigns.map((item) => {
      if (item.name === newActiveSubCP.name) {
        return (item = { ...newActiveSubCP });
      } else {
        return item;
      }
    });
    setActiveSubCampaign(newActiveSubCP);
    setCampaign(newCampaign);
  };
  const handleAddAds = () => {
    const adsCount = new Array(activeSubCampaign.ads.length + 1);
    newActiveSubCP.ads.push({
      name: `Quảng cáo ${adsCount.length}`,
      quantity: 0,
      // id: adsCount.length,
    });
    newCampaign.subCampaigns.map((item) => {
      if (item.name === newActiveSubCP.name) {
        return (item.ads = newActiveSubCP.ads);
      } else {
        return item;
      }
    });
    setActiveSubCampaign(newActiveSubCP);
    setCampaign(newCampaign);
  };
  const handleDeleteAds = (adsName: string) => {
    const idx = newActiveSubCP.ads.findIndex((item) => item.name === adsName);
    newActiveSubCP.ads.splice(idx, 1);
    newCheckedAds = newCheckedAds.filter((item) => item !== adsName);
    newCampaign.subCampaigns.map((item) => {
      if (item.name === newActiveSubCP.name) {
        return (item.ads = newActiveSubCP.ads);
      } else {
        return item;
      }
    });
    setCheckedAds(newCheckedAds);
    setActiveSubCampaign(newActiveSubCP);
    setCampaign(newCampaign);
  };
  const handleDeleteMultiAds = () => {
    for (let i = checkedAds.length - 1; i >= 0; i--) {
      const idx = newActiveSubCP.ads.findIndex(
        (item) => item.name === checkedAds[i]
      );
      newActiveSubCP.ads.splice(idx, 1);
    }
    setCheckedAds([]);
    setActiveSubCampaign(newActiveSubCP);
  };
  const handleAddCheckedAds = (
    e: React.ChangeEvent<HTMLInputElement>,
    adsName: string
  ) => {
    if (e.target.checked) {
      newCheckedAds.push(adsName);
      setCheckedAds(newCheckedAds);
    } else {
      newCheckedAds = newCheckedAds.filter((item) => item !== adsName);
      setCheckedAds(newCheckedAds);
    }
  };
  const handleIsChecked = (adsName: string) => {
    return checkedAds.some((item) => item === adsName);
  };
  const handleCheckAllAds = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      newCheckedAds = newActiveSubCP.ads.map((item) => item.name);
      setCheckedAds(newCheckedAds);
    } else {
      setCheckedAds([]);
    }
  };

  const isValidatedAdsQuantity = () => {
    return (
      activeSubCampaign.ads.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      ) > 0
    );
  };

  return (
    <div className={css.ads_container}>
      <h2>DANH SÁCH QUẢNG CÁO</h2>
      <table className={css.ads_table}>
        <thead>
          <tr>
            <th>
              <input
                checked={isCheckBoxAll}
                type="checkbox"
                onChange={(e) => {
                  handleCheckAllAds(e);
                }}
              />
            </th>
            <th>
              {checkedAds.length > 0 ? (
                <button
                  onClick={handleDeleteMultiAds}
                  className={css.btn_delete}
                >
                  <TrashIcon />
                </button>
              ) : (
                <span>Tên quảng cáo *</span>
              )}
            </th>
            <th>
              <span>{checkedAds.length > 0 ? "" : "Số lượng *"}</span>
            </th>
            <th>
              <button className={css.btn_add_ads} onClick={handleAddAds}>
                + THÊM
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {activeSubCampaign.ads.map((item, index) => (
            <tr
              key={index}
              className={`${handleIsChecked(item.name) ? css.checked : ""}`}
            >
              <td>
                <input
                  checked={handleIsChecked(item.name)}
                  type="checkbox"
                  id="ads_checkbox"
                  onChange={(e) => {
                    handleAddCheckedAds(e, item.name);
                  }}
                />
              </td>
              <td className={`${css.ads_item_input} `}>
                <input
                  id="ads_name"
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChangeAdsName(e, item.name)}
                  className={
                    !isValidated && !item.name ? css.input_ads_error : ""
                  }
                />
              </td>
              <td className={`${css.ads_item_input}`}>
                <input
                  id="ads_quantity"
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) => handleChangeAdsName(e, item.name)}
                  className={
                    !isValidated && !isValidatedAdsQuantity()
                      ? css.input_ads_error
                      : ""
                  }
                />
              </td>
              <td>
                <button
                  className={css.btn_delete}
                  disabled={checkedAds.length > 0}
                  onClick={() => handleDeleteAds(item.name)}
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdsComponent;
