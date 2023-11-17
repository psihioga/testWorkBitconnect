import { price, TPrice } from "../mocks/coinprice";
import { coins, TCoin } from "../mocks/coins";

export async function getCoins(page: number, limit: number, filter: string) {
  const data: TCoin[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(coins);
    }, 500);
  });

  const filteredData: TCoin[] = data.filter((coin) => {
    return filter.toLowerCase() === ""
      ? coin
      : coin.title.toLowerCase().includes(filter.toLowerCase());
  });

  const croppedData: TCoin[] =
    filteredData.length > limit
      ? filteredData.slice((page - 1) * limit, (page - 1) * limit + limit)
      : filteredData;

  const total = filteredData.length;

  const page_count = filteredData.length / limit;

  return {
    data: croppedData,
    meta: {
      page,
      limit: 5,
      total,
      page_count,
    },
  };
}

export async function getCoinPrice(id: number) {
  const data: TPrice = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(price);
    }, 500);
  });

  return data;
}

export const setCoinTransfer = (
  id: number,
  amount: number,
  balance: number,
  price: number
) => {
  if (balance - price * amount >= 0) return 200;

  return {
    errors: ["Недостаточно средств"],
  };
};
