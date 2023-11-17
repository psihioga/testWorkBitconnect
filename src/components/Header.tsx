import { useContext } from "react";
import { Context } from "./context";
import { useTranslation } from "react-i18next";

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  const { t } = useTranslation();

  const balance = useContext(Context);
  return (
    <header>
      <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
        {t("balance")} {balance}
      </h1>
    </header>
  );
}
