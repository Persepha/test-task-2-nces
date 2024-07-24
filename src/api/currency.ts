import { CurrencyDTO } from "./dto/currency.dto";
import { CurrencyDynamicDTO } from "./dto/currency_dynamic.dto";
import { API_BANK_RATES_DYNAMIC, API_BANK_URL } from "./urls";

export async function getAllCurrencies() {
    const res = await fetch(API_BANK_URL)

    if (!res.ok)  throw new Error("Ошибка при загрузке данных о валюте")

    return (await res.json()) as CurrencyDTO[]
}

export async function getRateDynamics(cur_ID: number, startDate: Date, endDate: Date ) {
    const res = await fetch(`${API_BANK_RATES_DYNAMIC}/${cur_ID}?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}`)

    if (!res.ok)  throw new Error("Ошибка при загрузке данных о динамике валюты")

    return (await res.json()) as CurrencyDynamicDTO[]
}