import { ICampaign, ISubCamPaign } from "@/types";
import React, { createContext, useContext, useState } from "react";


interface ISubCamPaignProvider {
  children: React.ReactNode;
}

interface ICampaignContextValue {
  campaign: ICampaign;
  setCampaign: (campaing: ICampaign) => void;
  activeSubCampaign: ISubCamPaign;
  setActiveSubCampaign: (activeSubCP: ISubCamPaign) => void;
}

const initialData: ICampaign = {
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
    },
  ],
};

const CampaignContext = createContext<ICampaignContextValue | null>(
  null
);

export const CampaignProvider = ({ children }: ISubCamPaignProvider) => {
  const [campaign, setCampaign] = useState<ICampaign>(initialData);
  const [activeSubCampaign, setActiveSubCampaign] = useState<ISubCamPaign>(
    initialData.subCampaigns[0]
  );

  const ContextValue: ICampaignContextValue = {
    campaign,
    setCampaign,
    activeSubCampaign,
    setActiveSubCampaign,
  };

  return (
    <CampaignContext.Provider value={ContextValue}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCamPaign = () => {
  const campaign = useContext(CampaignContext);
  if (!campaign) {
		throw Error(
			'__ERROR__: useCampaign must be inside a CampaignContextProvider with a value'
		)
	}
  return campaign as ICampaignContextValue;
};
