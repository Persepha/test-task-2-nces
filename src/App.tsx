import { useEffect, useState } from "react";
import { getAllCurrencies, getRateDynamics } from "@/api/currency";
import { Button } from "@/components/ui/button";
import { CurrencyDTO } from "@/api/dto/currency.dto";
import { CurrencySelector } from "@/components/currency_selector";
import { DatePicker } from "./components/date_picker";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CurrencyChart } from "./components/currency_chart";
import { CurrencyDynamicDTO } from "./api/dto/currency_dynamic.dto";

function App() {
  const [currensies, setCurrensies] = useState<CurrencyDTO[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDTO | null>(
    null
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [chartData, setChartData] = useState<CurrencyDynamicDTO[]>([]);

  const fetchCurrencyDynamic = async () => {
    if (selectedCurrency && startDate && endDate) {
      try {
        const data = await getRateDynamics(
          selectedCurrency?.Cur_ID,
          startDate,
          endDate
        );
        setChartData(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getAllCurrencies();
        setCurrensies(data);
      } catch (error) {
        console.log;
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <main className="grid place-content-center py-16 gap-4">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Официальный курс валюты</CardTitle>
          <CardDescription>Тестовое задание</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex flex-col gap-2 justify-center items-baseline md:flex-row">
            <span>Валюта: </span>
            <CurrencySelector
              currensies={offl}
              setSelectedCurrency={setSelectedCurrency}
            />
          </div>

          <div className="flex flex-col gap-2 justify-center items-baseline md:flex-row">
            <span>Дата от:</span>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>

          <div className="flex flex-col gap-2 justify-center items-baseline md:flex-row">
            <span>Дата до:</span>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            disabled={selectedCurrency && startDate && endDate ? false : true}
            onClick={fetchCurrencyDynamic}
          >
            Выполнить
          </Button>
        </CardFooter>
      </Card>

      <CurrencyChart
        chartData={chartData}
        endDate={endDate}
        startDate={startDate}
        selectedCurrency={selectedCurrency}
      />
    </main>
  );
}

export default App;
