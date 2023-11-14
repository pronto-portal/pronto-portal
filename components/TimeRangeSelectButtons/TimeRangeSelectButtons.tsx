import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TimePeriodSelect from "../../types/timeperiodSelect";

interface TimeRangeSelectButtonsProps {
  onChange: (value: TimePeriodSelect) => void;
}

export const TimeRangeSelectButtons: React.FC<TimeRangeSelectButtonsProps> = ({
  onChange,
}) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriodSelect>("1 Month"); // ["1 Month", "3 Month", "6 Month", "1 Year", "All"

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Button
        variant="outlined"
        onClick={() => {
          setTimePeriod("1 Month");
          onChange("1 Month");
        }}
        disabled={timePeriod === "1 Month"}
      >
        1 Month
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setTimePeriod("3 Month");
          onChange("3 Month");
        }}
        disabled={timePeriod === "3 Month"}
      >
        3 Month
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setTimePeriod("6 Month");
          onChange("6 Month");
        }}
        disabled={timePeriod === "6 Month"}
      >
        6 Month
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setTimePeriod("1 Year");
          onChange("1 Year");
        }}
        disabled={timePeriod === "1 Year"}
      >
        1 Year
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setTimePeriod("All");
          onChange("All");
        }}
        disabled={timePeriod === "All"}
      >
        All
      </Button>
    </Stack>
  );
};
