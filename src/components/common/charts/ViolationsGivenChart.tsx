import FilterSelect from "@/components/common/FilterSelect";
import { useTotalViolationsByRange } from "@/hooks/violationRecord/useTotalViolationsByRange";
import { getDateForRange } from "@/lib/utils";
import type React from "react";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "./ChartCard";

interface ViolationsGivenChartProps {
  className?: string;
}

const ViolationsGivenChart: React.FC<ViolationsGivenChartProps> = ({ className }) => {
  const currentDateISO = useMemo(() => new Date().toISOString(), []);
  const initialStartDate = useMemo(() => getDateForRange("7d").toISOString(), []);

  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [timeRange, setTimeRange] = useState(initialStartDate);
  const [groupBy, setGroupBy] = useState("DAY");

  const requestParams = useMemo(
    () => ({
      startDate: timeRange.split("T")[0],
      endDate: currentDateISO.split("T")[0],
      type: groupBy as "DAY" | "MONTH" | "YEAR"
    }),
    [groupBy, timeRange, currentDateISO]
  );

  const { data } = useTotalViolationsByRange(requestParams);

  const timeRangeOptions = [
    { value: "7d", label: "Past 7 Days" },
    { value: "30d", label: "Past 30 Days" },
    { value: "6m", label: "Past 6 Months" },
    { value: "1y", label: "Past Year" }
  ];

  const groupByOptions = [
    { value: "DAY", label: "DAY" },
    { value: "MONTH", label: "MONTH" },
    { value: "YEAR", label: "YEAR" }
  ];

  const handleRangeChange = (range: string) => {
    const startDate = getDateForRange(range);
    setSelectedTimeRange(range);
    setTimeRange(startDate.toISOString());
  };

  useEffect(() => {
    console.log(data, groupBy, timeRange);
  }, [data, groupBy, timeRange]);

  return (
    <ChartCard
      title="Violations Given"
      description="Number of violations over time"
      className={className}
    >
      <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-end">
        <FilterSelect
          label="Time Range"
          value={selectedTimeRange}
          onChange={handleRangeChange}
          options={timeRangeOptions}
          className="min-w-64"
        />
        <FilterSelect
          label="Group By"
          value={groupBy}
          onChange={setGroupBy}
          options={groupByOptions}
          className="min-w-64"
        />
      </div>
      <div className="h-93">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#A78BFA" radius={[4, 4, 0, 0]} barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default ViolationsGivenChart;
