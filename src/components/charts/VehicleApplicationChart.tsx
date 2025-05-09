import { useVehicleApplicationCountByStatus } from "@/hooks/vehicleApplication/useVehicleApplicationCountByStatus";
import { getFormattedStatus, getStatusStyles } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "../common/ChartCard";

interface VehicleApplicationChartProps {
  className?: string;
}

const VehicleApplicationChart = ({ className }: VehicleApplicationChartProps) => {
  const { data } = useVehicleApplicationCountByStatus();
  const [chartData, setChartData] = useState<{ status: string; count: number; fill: string }[]>([]);

  useEffect(() => {
    if (data) {
      const pData: { status: string; count: number; fill: string }[] = (
        data as { status: string; count: number }[]
      ).map(({ status, count }) => {
        const formattedStatus = getFormattedStatus(status);
        const fill = getStatusStyles(status);

        return {
          count,
          status: formattedStatus,
          fill
        };
      });
      setChartData(pData);
    }
  }, [data]);

  const totalCount = chartData.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <ChartCard title="Vehicle Application" description="Count Per Status" className={className}>
      <div className="h-100 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="count"
              label={({ status, count }) => `${status}: ${count}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val, name, props) => {
                return [`${val}`, `${props.payload.payload.status}`];
              }}
            />
            <Legend formatter={(value, entry, index) => chartData[index]?.count} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center text-sm mt-2">
        <div className="flex flex-col items-center">
          <span className="font-semibold">Total Applications</span>
          <span>{totalCount}</span>
        </div>
      </div>
    </ChartCard>
  );
};

export default VehicleApplicationChart;
