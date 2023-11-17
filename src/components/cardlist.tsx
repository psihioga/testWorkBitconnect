import { useEffect, useState } from "react";

import { Card } from "./card";
import { Pagination } from "./pagination";

import { getCoins } from "../api/coins";
import { TCoin } from "../mocks/coins";
import { useTranslation } from "react-i18next";

export interface ICardListProps {}

export interface ICoinListProps {
  data: TCoin[];
  meta: { page: number; limit: number; total: number; page_count: number };
}

export function CardList(props: ICardListProps) {
  const [coinData, setCoinData] = useState<TCoin[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const response: ICoinListProps = await getCoins(currentPage, 5, search);

      setCoinData(response.data);
      setCurrentPage(response.meta.page);
      setTotalPages(response.meta.page_count);
    };

    getData();

    return () => {};
  }, [search, currentPage]);

  return (
    <>
      <div>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t("coinSearch")}
        </label>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
        />
      </div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coinData.map((coin) => (
          <Card coin={coin} key={coin.id} />
        ))}
      </ul>

      <Pagination
        current={currentPage}
        total={totalPages}
        changeCurrent={setCurrentPage}
      />
    </>
  );
}
