import React, { useContext, useEffect } from "react";
import * as d3 from "d3";
import { BarChartContext } from "../App";

const BarChart = () => {
  const { data, setData, currentData } = useContext(BarChartContext);

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

  return <div></div>;
};

export default BarChart;
