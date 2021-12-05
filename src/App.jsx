import React, { useState } from "react";
import styled from "styled-components";
import BarChart from "./components/BarChart";
import Controls from "./components/Controls";

const AppContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

function App() {
  return (
    <BarChartProvider>
      <BarChartWrapper />
    </BarChartProvider>
  );
}

// eslint-disable-next-line react/display-name
const BarChartWrapper = React.memo(() => {
  return (
    <AppContainer>
      <BarChart />
      <Controls />
    </AppContainer>
  );
});

function BarChartProvider({ children }) {
  const [data, setData] = useState([]);
  const [currentData, setcurrentData] = useState({
    type: "GDP",
    URL:
      "https://gist.githubusercontent.com/arslanastral/07260a81a2a1a0f6f811ac16f573e3bc/raw/93e7503fb0e3b807454094105565f695fb5c995b/world-gdp.csv",
  });

  return (
    <BarChartContext.Provider
      value={{ data, setData, currentData, setcurrentData }}
    >
      {children}
    </BarChartContext.Provider>
  );
}

export const BarChartContext = React.createContext();
export default App;
