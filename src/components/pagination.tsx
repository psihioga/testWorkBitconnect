import * as React from "react";
import { Dispatch, SetStateAction } from "react";

export interface IPaginationProps {
  current: number;
  total: number;
  changeCurrent: Dispatch<SetStateAction<number>>;
}

export function Pagination(props: IPaginationProps) {
  const total = props.total | 1;

  const handlePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.target as HTMLAnchorElement;

    props.changeCurrent(Number(target.dataset.page));
  };

  return (
    <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
      {Array(total - 1)
        .fill(null)
        .map((u, i) => i + 1)
        .map((el) => {
          if (el === props.current) {
            return (
              <li
                key={el}
                className="block h-8 w-8 rounded border-black bg-black text-center leading-8 text-white"
              >
                {el}
              </li>
            );
          }

          return (
            <li key={el}>
              <a
                data-page={el}
                onClick={handlePage}
                href="#/2"
                className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
              >
                {el}
              </a>
            </li>
          );
        })}
    </ol>
  );
}
