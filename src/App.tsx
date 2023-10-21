import { CampaignProvider } from "src/contexts/CampaignContext";
import Campaign from "src/components/Campaign";
import './styles/main.scss'

function App() {
  return (
    <main className="container">
      <CampaignProvider>
        <Campaign />
      </CampaignProvider>
    </main>
  );
}

export default App;
