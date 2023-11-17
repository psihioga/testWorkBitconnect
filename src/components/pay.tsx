import { useFormik } from "formik";
import { setCoinTransfer } from "../api/coins";
import { useTranslation } from "react-i18next";

export const PayForm = (props: {
  amount: number;
  id: number;
  balance: number;
  price: number;
  handle: (state: boolean) => void;
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: props.amount,
    },
    onSubmit: async () => {
      const status = await setCoinTransfer(
        props.id,
        formik.values.amount,
        props.balance,
        props.price
      );

      if (status === 200) {
        alert("Покупка прошла успешно");
      } else {
        alert(status.errors.toString());
      }
      props.handle(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 md:p-5 space-y-4">
        <label
          htmlFor="amount"
          className="block mb-2 text-sm font-medium text-gray-100"
        >
          {t("price")} {props.price}
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step=".001"
          value={formik.values.amount}
          onChange={formik.handleChange}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
        />
      </div>
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          {t("buy")}
        </button>
      </div>
    </form>
  );
};
