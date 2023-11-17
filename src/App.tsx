import { useEffect, useState } from "react";

import "./App.css";
import { CardList } from "./components/cardlist";
import { Header } from "./components/Header";
import { getBalance } from "./api/balance";
import { Tbalance } from "./mocks/balance";

import { Context } from "./components/context";

import { useTranslation } from "react-i18next";
interface lng {
  [key: string]: {
    nativeName: string;
  };
}

const lngs: lng = {
  en: { nativeName: "English" },
  ru: { nativeName: "Русский" },
};

function App() {

  const { i18n } = useTranslation();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const response: Tbalance = await getBalance();

      setBalance(response.data.balance);
    };

    getData();

    return () => {};
  }, [balance]);

  return (
    <Context.Provider value={balance}>
      <div className="App">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Header />
          {Object.keys(lngs).map((lng) => {
          return (
            <button
              type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              {lngs[lng].nativeName}
            </button>
          );
        })} 
          <CardList />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
