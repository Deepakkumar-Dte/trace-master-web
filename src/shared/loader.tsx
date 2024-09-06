import { LoaderFunction } from "react-router-dom";
import {
  getNodeData,
  getTrackingData,
  getCategory,
  getUnits,
  getProductList,
  getProductDetails,
  getTransactions,
  getHistory,
} from "./api";
import { convertStrArrToOptions } from "./utils";

export const trackerLoader: LoaderFunction = async ({ params }) => {
  const { id = "" } = params;
  try {
    const data = await getTrackingData(id);
    return data.data;
  } catch (err) {
    return {};
  }
};

export const trackingNodeLoader: LoaderFunction = async ({ params }) => {
  try {
    return [];
  } catch (err) {
    return [];
  }
};

export const nodeLoader: LoaderFunction = async ({ params }) => {
  const { nodeId = "" } = params;
  try {
    const data = await getNodeData(nodeId);
    return data.data;
  } catch (err) {
    return {};
  }
};

export const ProductUpsert: LoaderFunction = async ({ params }) => {
  const { productId } = params;

  try {
    const {
      data: { data: category },
    } = await getCategory();
    const {
      data: {
        data: { BaseUnit, SecondryUnit },
      },
    } = await getUnits();

    const result = {
      category: convertStrArrToOptions(category),
      baseUnit: convertStrArrToOptions(BaseUnit),
      secondryUnit: convertStrArrToOptions(SecondryUnit),
      formData: {},
    };
    if (productId) {
      const {
        data: { data: formData },
      } = await getProductDetails(productId);
      result["formData"] = formData;
    }
    return result;
  } catch (err) {
    console.log(err);
    return { category: [], baseUnit: [], secondryUnit: [] };
  }
};

export const InventoryGridLoader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await getProductList({ isAdmin: true });
    return data.data || [];
  } catch (err) {
    return [];
  }
};

export const ProductOverViewLoader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await getProductDetails(params.productId || "");
    return data.data || {};
  } catch (err) {
    return {};
  }
};

export const ProductTransactionsLoader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await getTransactions({ ...params });
    return data.data || [];
  } catch (err) {
    return {};
  }
};
export const ProductHistoryLoader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await getHistory(params);
    return data.data || [];
  } catch (err) {
    return {};
  }
};
