import { CurrencyDTO } from "./dto/currency.dto";
import { API_BANK_URL } from "./urls";

export async function getAllCurrencies() {
    const res = await fetch(API_BANK_URL)

    if (!res.ok)  throw new Error("Ошибка при загрузке данных о валюте")

    return (await res.json()) as CurrencyDTO[]
}

