import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "2025-04-03", violationCount: 35 },
  { date: "2025-04-04", violationCount: 42 },
  { date: "2025-04-05", violationCount: 28 },
  { date: "2025-04-06", violationCount: 36 },
  { date: "2025-04-07", violationCount: 51 },
  { date: "2025-04-08", violationCount: 47 },
  { date: "2025-04-09", violationCount: 32 }
];

const formattedData = data.map((item) => ({
  ...item,
  formattedDate: format(parseISO(item.date), "MMM dd")
}));

export function ViolationsByDateChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Violations by Date</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="formattedDate"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value) => [`${value} violations`, "Count"]}
              />
              <Bar
                dataKey="violationCount"
                name="Violations"
                fill="#7987FF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
