import { formatNumber } from "jt-helpers";

export const useProducts = () => {
  const getTotalPrice = (products) => {
    if (products.length) {
      return formatNumber(
        products
          .map(({ price, number }) => price * number)
          .reduce((prev, current) => prev + current)
      );
    } else {
      return 0;
    }
  };

  return {
    getTotalPrice,
  };
};
