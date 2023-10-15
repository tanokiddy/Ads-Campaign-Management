import { CampaignProvider } from "./contexts/CampaignContext";
import Campaign from "./components/Campaign";
import "./App.css";

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
