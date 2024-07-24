import * as React from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

import { CurrencyDTO } from "@/api/dto/currency.dto";
import { CurrencyDynamicDTO } from "@/api/dto/currency_dynamic.dto";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface CurrencyChartProps {
  chartData: CurrencyDynamicDTO[];
  selectedCurrency: CurrencyDTO | null;
  startDate: Date | null;
  endDate: Date | null;
}

export const CurrencyChart: React.FC<CurrencyChartProps> = ({
  chartData,
  selectedCurrency,
  endDate,
  startDate,
}) => {
  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>Динамика курса валюты</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(8, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="Cur_OfficialRate"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {selectedCurrency && (
          <div className="flex gap-2 font-medium leading-none">
            Динамика валюты {selectedCurrency.Cur_Name}
            <TrendingUp className="h-4 w-4" />
          </div>
        )}

        {startDate && endDate && (
          <div className="leading-none text-muted-foreground">
            За период с {startDate.toLocaleDateString()} до{" "}
            {endDate.toLocaleDateString()}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
