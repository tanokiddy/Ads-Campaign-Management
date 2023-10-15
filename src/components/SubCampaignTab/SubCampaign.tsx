import AdsComponent from "./components/AdsComponent";
import SubCampaignComponent from "./components/SubCampaignComponent";

interface ISubCampaignProps {
  isValidated: boolean
}

const SubCampaign = ({isValidated}: ISubCampaignProps) => {
  return (
    <div className="container">
      <SubCampaignComponent isValidated={isValidated}/>
      <AdsComponent isValidated={isValidated}/>
    </div>
  );
};

export default SubCampaign;
