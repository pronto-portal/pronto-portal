import React from "react";
import { MetricLoadingStates } from "../MetricLoadingStates";
import dynamic from "next/dynamic";
import useLanguagesPerAssignmentLocation from "../MetricFormatters/LanguagesPerAssignmentLocation";
import nivoChartColors from "../../theme/nivoChartColor";

const ResponsiveCirclePacking = dynamic(
  () => import("@nivo/circle-packing").then((m) => m.ResponsiveCirclePacking),
  { ssr: false }
);

const LanguagesPerAssignmentLocation: React.FC = () => {
  const { data, isError, isLoading, isEmpty } =
    useLanguagesPerAssignmentLocation();

  return (
    <MetricLoadingStates
      isError={isError}
      isLoading={isLoading}
      isEmpty={isEmpty}
    >
      <ResponsiveCirclePacking
        data={data || []}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        value="count"
        padding={20}
        colors={nivoChartColors}
        enableLabels={true}
        labelsFilter={(label) => label.node.depth >= 2}
        labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        label={(e) => e.id + ": " + e.formattedValue}
      />
    </MetricLoadingStates>
  );
};

export default LanguagesPerAssignmentLocation;
