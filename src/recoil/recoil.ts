import { ROOT_STATE_KEY } from "../constants";
import { ICampaign } from "../types";
import { atom } from "recoil";

const initialState: ICampaign = {
  campaign: {
    information: {
      name: "",
      describe: "",
    },
  },
  subCampaigns: [
    {
      name: "Chiến dịch con 1",
      ads: [
        {
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
      status: true,
      id: 1,
    },
  ],
};

export const initialData = atom({
  key: ROOT_STATE_KEY,
  default: initialState,
});
