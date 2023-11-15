import React, { useState } from "react";
import { MetricLoadingStates } from "../MetricLoadingStates";
import dynamic from "next/dynamic";
import { max } from "d3-array";
import nivoChartColors from "../../theme/nivoChartColor";
import { useTranslatorNoShowToCompletionRatio } from "../MetricFormatters/TranslatorNoShowToCompletionRatio";
import { RangeSelectTabs } from "../RangeSelectTabs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ResponsiveBar = dynamic(
  () => import("@nivo/bar").then((m) => m.ResponsiveBar),
  { ssr: false }
);

const TranslatorNoShowToCompletionRatio: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("isComplete");

  const { data, isError, isLoading } =
    useTranslatorNoShowToCompletionRatio(sortBy);
  const maxValue = data && data.length > 0 ? max(data, (d) => d.total) || 1 : 1;

  const tickInterval = Math.ceil(maxValue / 10);

  return (
    <MetricLoadingStates isError={isError} isLoading={isLoading}>
      <Stack
        direction="column"
        spacing={2}
        width="100%"
        height="100%"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography>Sort By</Typography>
          <RangeSelectTabs
            onChange={setSortBy}
            options={[
              "isComplete",
              "translatorNoShow",
              "claimantNoShow",
              "total",
            ]}
          />
        </Stack>
        <ResponsiveBar
          data={data || []}
          margin={{ top: 20, right: 30, bottom: 150, left: 30 }}
          keys={["isComplete", "translatorNoShow", "claimantNoShow", "total"]}
          indexBy="translatorName"
          padding={0.5}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          enableGridY={true}
          axisBottom={{
            tickSize: 5,
            tickPadding: 20,
            tickRotation: 0,
            legendOffset: 50,
            legend: "Name",
            legendPosition: "middle",
          }}
          borderWidth={1}
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
          labelSkipHeight={5}
        />
      </Stack>
    </MetricLoadingStates>
  );
};

export default TranslatorNoShowToCompletionRatio;
