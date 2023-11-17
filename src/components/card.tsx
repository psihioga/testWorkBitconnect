import * as React from "react";
import { Popup } from "./popup";
import { useState, useEffect } from "react";



export interface ICardProps {
  id: number;
  title: string;
  network: number;
  status: number;
}

export function Card(props: { coin: ICardProps }) {
  const { id, title, network, status } = { ...props.coin };
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setTogglePopup(true);
  };

  function toggle(state: boolean): void {
    setTogglePopup(false);
  }

  return (
    <li className="grid bg-sky-800 rounded-xl p-10" onClick={handleClick}>
      <a className="group block overflow-hidden">
        <img
          src="/pb.svg"
          alt=""
          className="h-[50px] object-cover transition duration-500 group-hover:scale-105 sm:h-[50px]"
        />

        <div className="relative  pt-3" id={id.toString()}>
          <h3 className="text-xs text-neutral-200 group-hover:underline group-hover:underline-offset-4">
            {title}
          </h3>

          <p className="mt-2">
            <span className="text-xs text-neutral-200">
              {" "}
              network {network}{" "}
            </span>
            <span className="text-xs text-neutral-200"> status {status} </span>
          </p>
        </div>
      </a>
      {togglePopup ? <Popup id={id} title={title} handle={toggle} /> : <></>}
    </li>
  );
}
