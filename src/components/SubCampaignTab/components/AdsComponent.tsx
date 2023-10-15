import { useState } from "react";
import { useCamPaign } from "../../../contexts/CampaignContext";
import css from "../sub_campaign.module.scss";

const AdsComponent: React.FC = () => {
  const { campaign, setCampaign, activeSubCampaign, setActiveSubCampaign } =
    useCamPaign();
  const [checkedAds, setCheckedAds] = useState<number[]>([]);

  const isCheckBoxAll = activeSubCampaign.ads.length > 0 && checkedAds.length === activeSubCampaign.ads.length

  let newActiveSubCP = { ...activeSubCampaign };
  let newCampaign = { ...campaign };
  let newCheckedAds = [...checkedAds];

  const handleChangeAdsName = (
    e: React.ChangeEvent<HTMLInputElement>,
    adsId: number
  ) => {
    const isNameInput = e.target.getAttribute("id") === "ads_name";
    const newAdsProp = e.target.value;
    newActiveSubCP.ads.map((item) => {
      if (isNameInput) {
        if (item.id === adsId) {
          return (item.name = newAdsProp);
        } else {
          return item;
        }
      } else {
        if (item.id === adsId) {
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
    const adsCount = new Array(activeSubCampaign.ads.length + 1)
    newActiveSubCP.ads.push({
      name: `Quảng cáo ${adsCount.length}`,
      quantity: 0,
      id: adsCount.length,
    });
    newCampaign.subCampaigns.map((item) => {
      if (item.id === newActiveSubCP.id) {
        return (item.ads = newActiveSubCP.ads);
      } else {
        return item;
      }
    });
    setActiveSubCampaign(newActiveSubCP);
    setCampaign(newCampaign);
  };
  const handleDeleteAds = (adsId: number) => {
    const idx = newActiveSubCP.ads.findIndex((item) => item.id === adsId);
    newActiveSubCP.ads.splice(idx, 1);
    newCheckedAds = newCheckedAds.filter((item) => item !== adsId);
    newCampaign.subCampaigns.map((item) => {
      if (item.id === newActiveSubCP.id) {
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
      const idx = newActiveSubCP.ads.findIndex(item => item.id === checkedAds[i])
      newActiveSubCP.ads.splice(idx, 1);
    }
    setCheckedAds([]);
    setActiveSubCampaign(newActiveSubCP);
  };
  const handleAddCheckedAds = (
    e: React.ChangeEvent<HTMLInputElement>,
    adsId: number
  ) => {
    if (e.target.checked) {
      newCheckedAds.push(adsId);
      setCheckedAds(newCheckedAds);
    } else {
      newCheckedAds = newCheckedAds.filter((item) => item !== adsId);
      setCheckedAds(newCheckedAds);
    }
  };
  const handleIsChecked = (adsId: number) => {
    return checkedAds.some((item) => item === adsId);
  };
  const handleCheckAllAds = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      newCheckedAds = newActiveSubCP.ads.map(item => item.id)
      setCheckedAds(newCheckedAds)
    } else {
      setCheckedAds([])
    }
  }

  return (
    <div className={css.ads_container}>
      <h2>DANH SÁCH QUẢNG CÁO</h2>
      <table>
        <thead>
          <tr>
            <th>
              <input checked={isCheckBoxAll} type="checkbox" onChange={(e) => {handleCheckAllAds(e)}}/>
            </th>
            <th>
              {checkedAds.length > 0 ? (
                <button onClick={handleDeleteMultiAds}>Empty</button>
              ) : (
                "Tên quảng cáo *"
              )}
            </th>
            <th>{checkedAds.length > 0 ? "" : "Số lượng *"}</th>
            <th>
              <button onClick={handleAddAds}>+ THÊM</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {activeSubCampaign.ads.map((item) => (
            <tr key={item.id} className={`${handleIsChecked(item.id) ? css.checked : ""}`}>
              <td>
                <input
                  checked={handleIsChecked(item.id)}
                  type="checkbox"
                  id="ads_checkbox"
                  onChange={(e) => {
                    handleAddCheckedAds(e, item.id);
                  }}
                />
              </td>
              <td>
                <input
                  id="ads_name"
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChangeAdsName(e, item.id)}
                />
              </td>
              <td>
                <input
                  id="ads_quantity"
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) => handleChangeAdsName(e, item.id)}
                />
              </td>
              <td>
                <button disabled={handleIsChecked(item.id)} onClick={() => handleDeleteAds(item.id)}>Empty</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdsComponent;
