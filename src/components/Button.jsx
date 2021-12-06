import React from "react";
import styled from "styled-components";
import { BarChartContext } from "../App";

const DataButton = styled.button`
  border: 0;
  padding: 0;
  background-color: ${({ isActive }) => (isActive ? "blue" : "#eee")};
  border-radius: 5px;
  border: 1px solid blue;
  color: ${({ isActive }) => (isActive ? "white" : "blue")};
  margin: 10px;
  padding: 10px;
  font-family: Inter;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "blue" : "#f7f1f1")};
    color: ${({ isActive }) => (isActive ? "white" : "blue")};
  }

  &:active {
    transform: scale(0.9);
  }
`;

const Button = ({ type, url, isActive }) => {
  const { setcurrentData, setdataSources, dataSources } = React.useContext(
    BarChartContext
  );

  const handleButtonClick = () => {
    setcurrentData({ type: type, URL: url });
    setdataSources(
      dataSources.map((ele) =>
        ele.type === type
          ? { ...ele, isActive: true }
          : { ...ele, isActive: false }
      )
    );
  };

  return (
    <DataButton isActive={isActive} onClick={handleButtonClick}>
      {type}
    </DataButton>
  );
};

export default Button;
