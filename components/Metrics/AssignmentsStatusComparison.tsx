import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MetricLoadingStates } from "../MetricLoadingStates";
import { useAssignmentStatusComparison } from "../MetricFormatters/AssignmentStatusComparison";
import Stack from "@mui/material/Stack";
import TimePeriodSelect from "../../types/timeperiodSelect";
import { RangeSelectTabs } from "../RangeSelectTabs";
import { max } from "d3-array";
import nivoChartColors from "../../theme/nivoChartColor";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((m) => m.ResponsiveLine),
  { ssr: false }
);

export const AssignmentsStatusComparison: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriodSelect>("1 Month"); // ["1 Month", "3 Month", "6 Month", "1 Year", "All"
  const { data, isError, isLoading, isEmpty } =
    useAssignmentStatusComparison(timePeriod);

  const completedAssignmentsData = data.find((datum) => datum.id === "Total");

  const maxValue =
    completedAssignmentsData && completedAssignmentsData.data.length
      ? max(completedAssignmentsData.data, (d) => d.y) || 1
      : 1;

  const tickInterval = Math.ceil(maxValue / 10);

  return (
    <MetricLoadingStates
      isError={isError}
      isLoading={isLoading}
      isEmpty={isEmpty}
    >
      <Stack
        direction="column"
        spacing={2}
        width="100%"
        height="100%"
        alignItems="center"
      >
        <RangeSelectTabs
          onChange={setTimePeriod}
          options={["1 Month", "3 Month", "6 Month", "1 Year", "All"]}
        />
        <ResponsiveLine
          data={data || []}
          margin={{ top: 40, right: 150, bottom: 150, left: 30 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 20,
            tickRotation: 0,
            legendOffset: 50,
            legend: "Date",
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -10,
            tickValues: `every ${tickInterval}`,
            legend: "Count",
            legendPosition: "middle",
          }}
          colors={nivoChartColors}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          enablePoints={false}
          enableGridY={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Stack>
    </MetricLoadingStates>
  );
};
