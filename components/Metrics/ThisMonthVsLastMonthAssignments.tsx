import React from "react";
import { useAssignmentCountPerMonth } from "../MetricFormatters/AssignmentCountPerMonth";
import { MetricLoadingStates } from "../MetricLoadingStates";
import dynamic from "next/dynamic";
import { max } from "d3-array";
import nivoChartColors from "../../theme/nivoChartColor";

const ResponsiveBar = dynamic(
  () => import("@nivo/bar").then((m) => m.ResponsiveBar),
  { ssr: false }
);

const ThisMonthVsLastMonthAssignments: React.FC = () => {
  const { data, isError, isLoading, isEmpty } = useAssignmentCountPerMonth();
  const maxValue = data && data.length > 0 ? max(data, (d) => d.value) || 1 : 1;

  const tickInterval = Math.ceil(maxValue / 10);

  return (
    <MetricLoadingStates
      isError={isError}
      isLoading={isLoading}
      isEmpty={isEmpty}
    >
      <ResponsiveBar
        data={data || []}
        margin={{ top: 20, right: 30, bottom: 100, left: 30 }}
        keys={["value"]}
        indexBy="month"
        padding={0.5}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        enableGridY={false}
        axisBottom={{
          tickSize: 5,
          tickPadding: 20,
          tickRotation: 0,
          legendOffset: 50,
          legend: "Month",
          legendPosition: "middle",
        }}
        borderWidth={1}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -10,
          tickValues: `every ${tickInterval}`,
          legend: "Value",
          legendPosition: "middle",
        }}
        colors={nivoChartColors}
      />
    </MetricLoadingStates>
  );
};

export default ThisMonthVsLastMonthAssignments;
