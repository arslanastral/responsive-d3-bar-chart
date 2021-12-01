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
  const [currentData, setcurrentData] = useState([]);
  const [dataType, setdataType] = useState("GDP");

  return (
    <BarChartContext.Provider
      value={{ currentData, setcurrentData, dataType, setdataType }}
    >
      {children}
    </BarChartContext.Provider>
  );
}

export const BarChartContext = React.createContext();
export default App;
