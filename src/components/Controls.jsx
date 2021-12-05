import React from "react";
import Button from "./Button";
import styled from "styled-components";

const ControlsContainer = styled.div`
  margin-top: 100px;
`;

let dataSources = [
  {
    type: "GDP",
    URL:
      "https://gist.githubusercontent.com/arslanastral/07260a81a2a1a0f6f811ac16f573e3bc/raw/93e7503fb0e3b807454094105565f695fb5c995b/world-gdp.csv",
  },
  {
    type: "GDP Per Capita",
    URL:
      "https://gist.githubusercontent.com/arslanastral/ad5735653b14aa17d51c3560d7990de3/raw/4d792fbe9285fcf7bb6dcf5a32e80289ca7c7013/world-gdp-per-capita.csv",
  },
];

const Controls = () => {
  return (
    <ControlsContainer>
      {dataSources.map((data, i) => (
        <Button key={i} type={data.type} url={data.URL} />
      ))}
    </ControlsContainer>
  );
};

export default Controls;
