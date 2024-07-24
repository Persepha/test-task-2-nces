import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CurrencyDTO } from "@/api/dto/currency.dto";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommandList } from "cmdk";

interface CurrencySelectorProps {
  currensies: CurrencyDTO[];
  setSelectedCurrency(currency: CurrencyDTO | null): void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currensies,
  setSelectedCurrency,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? currensies.find(
                (currency) =>
                  `${currency.Cur_ID.toString()}${currency.Cur_Name}` === value
              )?.Cur_Name
            : "Выберите валюту..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Поиск по ID валюты..." />
          <CommandList>
            <ScrollArea className="h-[400px] w-[300px]">
              <CommandEmpty>Валюты не найдено.</CommandEmpty>
              <CommandGroup>
                {currensies.map((currency) => (
                  <CommandItem
                    key={currency.Cur_ID}
                    value={currency.Cur_ID.toString() + currency.Cur_Name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setSelectedCurrency(
                        currensies.find(
                          (currency) =>
                            `${currency.Cur_ID.toString()}${currency.Cur_Name}` ===
                            currentValue
                        ) || null
                      );

                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === currency.Cur_ID.toString()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {`${currency.Cur_ID}: ${currency.Cur_Name} с ${currency.Cur_DateStart.slice(0, 4)} по ${currency.Cur_DateEnd.slice(0, 4)} `}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
