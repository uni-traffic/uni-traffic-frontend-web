import FilterSelect from "@/components/common/FilterSelect";
import { useTotalUniqueSignInsByRange } from "@/hooks/user-sign-activity/useTotalUniqueSignInsByRange";
import { getDateForRange } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import ChartCard from "./ChartCard";

interface UniqueSignInChartProps {
  className?: string;
}

const UniqueSignInChart = ({ className }: UniqueSignInChartProps) => {
  const currentDateISO = useMemo(() => new Date().toISOString(), []);
  const initialStartDate = useMemo(() => getDateForRange("7d").toISOString(), []);

  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [timeRange, setTimeRange] = useState(initialStartDate);
  const [groupBy, setGroupBy] = useState("DAY");

  const requestParams = useMemo(
    () => ({
      startDate: timeRange,
      endDate: currentDateISO,
      type: groupBy as "DAY" | "MONTH" | "YEAR"
    }),
    [groupBy, timeRange, currentDateISO]
  );

  const { data } = useTotalUniqueSignInsByRange(requestParams);

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
      title="Unique Sign In"
      description="Number of unique user sign-ins over time"
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
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#34D399" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default UniqueSignInChart;
