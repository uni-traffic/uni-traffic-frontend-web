import { useViolationRecordTotals } from "@/hooks/violation/useViolationRecordTotals";
import { formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "./ChartCard";

interface ViolationRecordChartProps {
  className?: string;
}

const ViolationRecordChart = ({ className }: ViolationRecordChartProps) => {
  const { data } = useViolationRecordTotals();
  const [chartData, setChartData] = useState<{ type: string; amount: number; fill: string }[]>([]);

  useEffect(() => {
    if (data) {
      const { unpaidTotal, paidTotal } = data;

      setChartData([
        { type: "UNPAID", amount: unpaidTotal, fill: "#F87171" },
        { type: "PAID", amount: paidTotal, fill: "#34D399" }
      ]);
    }
  }, [data]);

  return (
    <ChartCard
      title="Violation Record"
      description="Unpaid and Paid Amount"
      className={`${className}`}
    >
      <div className="h-100 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              dataKey="amount"
              label={({ type, amount }) => `${type}: ${formatNumber(amount)}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}`, "Amount"]} />
            <Legend
              formatter={(value, entry, index) => formatNumber(chartData[index]?.amount ?? 0)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-around text-sm mt-2">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-dashboard-red">Unpaid</span>
          <span>{formatNumber(chartData[0]?.amount ?? 0)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-dashboard-green">Paid</span>
          <span>{formatNumber(chartData[1]?.amount ?? 0)}</span>
        </div>
      </div>
    </ChartCard>
  );
};

export default ViolationRecordChart;
