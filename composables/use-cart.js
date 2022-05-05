import wx from "wx-bridge";
import { useConsts } from "@/composables/use-consts";
import { store } from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";

export const useCart = () => {
  const { useState, useGetters, useActions } = createNamespacedHelpers(
    store,
    "cart"
  );
  const { products } = useState(["products"]);
  const { selectedProducts, totalPrice, allProductsSelected } = useGetters([
    "selectedProducts",
    "totalPrice",
    "allProductsSelected",
  ]);
  const {
    selectProduct,
    selectAllProducts,
    updateProductNumber: _updateProductNumber,
    clearProducts: _clearProducts,
  } = useActions([
    "updateProductNumber",
    "selectProduct",
    "selectAllProducts",
    "clearProducts",
  ]);

  // 在非 tab-bar 页面无法更新 TabBarBadge，
  // 所以必须在每个 tab-bar 页面的 onShow 中更新 TabBarBadge
  const renderProductsNumber = () => {
    const cartTabBarIndex = useConsts().CartTabBarIndex;
    const count = products.value.length;

    if (cartTabBarIndex) {
      if (count) {
        wx.setTabBarBadge({ index: cartTabBarIndex, text: count + "" });
      } else {
        wx.removeTabBarBadge({ index: cartTabBarIndex });
      }
    }
  };

  const updateProductNumber = (options) => {
    _updateProductNumber(options);
    renderProductsNumber();
  };

  const clearProducts = () => {
    _clearProducts();
    renderProductsNumber();
  };

  return {
    products,
    selectedProducts,
    totalPrice,
    allProductsSelected,
    selectProduct,
    selectAllProducts,
    renderProductsNumber,
    updateProductNumber,
    clearProducts,
  };
};
