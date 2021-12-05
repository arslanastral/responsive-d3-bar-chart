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

  const width = 800;
  const height = 400;

  useEffect(() => {
    const svg = d3.select(GDPChart.current);

    const xScale = d3
      .scaleTime()
      .domain([0, data.length - 1])
      .range([0, 800])
      .nice();

    const xTimeScale = d3
      .scaleTime()
      .domain([
        d3.min(data.map((d) => d.Year)),
        d3.max(data.map((d) => d.Year)),
      ])
      .range([0, 800]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => d.GDP))])
      .range([400, 0])
      .nice();
  }, [data]);

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
      <Title>
        World GDP in <span style={{ color: "blue" }}>$</span>
      </Title>
      <br />
      <ChartSvg width={width} height={height} ref={GDPChart}>
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
