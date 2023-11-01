import Campaign from "src/components/Campaign";
import "./styles/main.scss";
import { RecoilRoot } from "recoil";
import { CampaignProvider } from "./contexts/CampaignContext";

function App() {
  return (
    <main className="container">
      <RecoilRoot>
        <CampaignProvider>
          <Campaign />
        </CampaignProvider>
      </RecoilRoot>
    </main>
  );
}

export default App;
