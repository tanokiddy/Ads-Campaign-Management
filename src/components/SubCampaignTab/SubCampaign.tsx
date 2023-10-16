import AdsComponent from "./components/AdsComponent";
import SubCampaignComponent from "./components/SubCampaignComponent";

interface ISubCampaignProps {
  isValidated: boolean;
}

const SubCampaign: React.FC<ISubCampaignProps> = ({ isValidated }) => {
  return (
    <div className="container">
      <SubCampaignComponent isValidated={isValidated} />
      <AdsComponent isValidated={isValidated} />
    </div>
  );
};

export default SubCampaign;
