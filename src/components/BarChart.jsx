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
      .range([0, width])
      .nice();

    const xTimeScale = d3
      .scaleTime()
      .domain([
        d3.min(data.map((d) => d.Year)),
        d3.max(data.map((d) => d.Year)),
      ])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => d.GDP))])
      .range([height, 0])
      .nice();

    const xAxis = d3
      .axisBottom(xTimeScale)
      .ticks(10)
      .tickSize(0)
      .tickPadding(30);
    svg
      .select(".x-axis")
      .style("transform", "translateY(400px)")
      .attr("font-family", "Inter")
      .attr("font-size", "1rem")
      .attr("color", "grey")
      .call(xAxis);

    const yAxis = d3
      .axisLeft(yScale)

      .tickPadding(30)
      .tickSize(-800)
      .tickFormat((d) => " $" + d3.format(".1s")(d));
    svg
      .select(".y-axis")
      .attr("font-family", "Inter")
      .attr("font-size", "1rem")
      .attr("color", "grey")
      .call(yAxis);

    var myArea = d3
      .area()
      .x((value, index) => xScale(index))
      .y0(height)
      .y1((value) => yScale(value.GDP))
      .curve(d3.curveCardinal);

    svg
      .selectAll(".area")
      .data([data])
      .join("path")
      .attr("class", "area")
      .transition()
      .attr("d", myArea)
      .attr("fill", "blue");
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
        World {currentData.type} in <span style={{ color: "blue" }}>$</span>
      </Title>
      <br />
      <ChartSvg width={width} height={height} ref={GDPChart}>
        <g className="x-axis" />
        <g className="y-axis" />
      </ChartSvg>
    </BarChartContainer>
  );
};

export default BarChart;
