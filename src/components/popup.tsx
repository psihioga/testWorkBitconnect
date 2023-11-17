import * as React from "react";
import ReactDOM from "react-dom";
import { getCoinPrice } from "../api/coins";
import { TPrice } from "../mocks/coinprice";
import { Context } from "./context";
import { useContext, useEffect, useState } from "react";
import { PayForm } from "./pay";

export interface IPopupProps {
  title: string;
  id: number;
  handle: (state: boolean) => void;
}

const portal = document.getElementById("portal");

const Wrapper = (props: {
  toggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactElement;
}): React.ReactElement => {
  const Wrapper = (
    <div
      onClick={props.toggle}
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      {props.children}
    </div>
  );

  return Wrapper;
};

export function Popup(props: IPopupProps) {
  const balance = useContext(Context);

  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const price: TPrice = await getCoinPrice(props.id);

      setPrice(price.data.price);
      if (balance && price.data.price) {
        setAmount(balance / price.data.price);
      }
    };

    getData();

    return () => {};
  });

  const title = props.title;

  const toggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    if (target.id === "default-modal") props.handle(false);
  };

  if (portal) {
    return ReactDOM.createPortal(
      <Wrapper toggle={toggle}>
        <div className="relative p-4 w-96 max-w-2xl max-h-full">
          <div className="relative bg-gray-900 rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>
            </div>
            <PayForm
              amount={amount}
              id={props.id}
              price={price}
              balance={balance}
              handle={props.handle}
            />
          </div>
        </div>
      </Wrapper>,
      portal
    );
  }
  return <p>error</p>;
}
