import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { BarChartContext } from "../App";

const BarChartContainer = styled.div`
  /* background-color: blue; */
  border-radius: 10px;
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
`;

const ChartSvg = styled.svg`
  /* background: #eee; */
  overflow: visible !important;
  margin-left: 40px;
`;

const BarChart = () => {
  const { data, setData, currentData } = useContext(BarChartContext);
  const GDPChart = useRef();

  useEffect(() => {
    let parseDate = d3.timeParse("%Y");
    const row = (d) => {
      d.Year = parseDate(d.Year);
      d.GDP = +d.GDP;
      return d;
    };

    d3.csv(currentData.URL, row).then(setData);
  }, [currentData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BarChartContainer>
      <Title></Title>
      <br />
      <ChartSvg width="800" height="400" ref={GDPChart}>
        <g className="x-axis" />
        <g className="y-axis" />
      </ChartSvg>
      <br />
      <br />
      <br />
    </BarChartContainer>
  );
};

export default BarChart;
