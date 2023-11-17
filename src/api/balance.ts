import { balance, Tbalance } from "../mocks/balance";

export async function getBalance() {
  const data: Tbalance = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(balance);
    }, 1000);
  });

  return data;
}
