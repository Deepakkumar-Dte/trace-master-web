import axios, { AxiosResponse } from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 50000,
});

const Request = {
  async get(url: string, ...args: any[]) {
    return await Instance.get(url, ...args).then(responseHandler);
  },
  async post(url: string, ...args: any[]) {
    return await Instance.post(url, ...args).then(responseHandler);
  },
  async put(url: string, ...args: any[]) {
    return await Instance.put(url, ...args).then(responseHandler);
  },
  async delete(url: string, ...args: any[]) {
    return await Instance.delete(url, ...args).then(responseHandler);
  },
  async patch(url: string, ...args: any[]) {
    return await Instance.patch(url, ...args).then(responseHandler);
  },
};

const responseHandler = (
  res: AxiosResponse<{ data: any; message: string; success: boolean }>
) => {
  if (!res.data.success) {
    Promise.reject(res.data);
  }
  return res.data;
};

export const getTrackingData = async (id: string) =>
  await Request.get(`/process/${id}`);

export const getTrackingNodes = async (params: any) =>
  await Request.get("/node/mapping-nodes", { params });

export const getUserList = async () => await Request.get("/user");

export const createMappingNodes = async (data: any) =>
  await Request.post("/node/create/mapping", data);

export const getTrackingList = async () => await Request.get("/process");

export const upsertTracking = async (payload: any) =>
  await Request.put("/process", payload);

export const getNodeList = async (params: any) =>
  await Request.get("/node", { params });

export const getNodeData = async (id: string) =>
  await Request.get(`/node/${id}`);

export const upsertDefaultNode = async (payload: any) =>
  await Request.put("/node/upsert/default", payload);

export const getCategory = async () => await Request.get("/lookup/category");

export const getUnits = async () => await Request.get("/lookup/units");

export const getSubCategory = async (category: string) =>
  await Request.get("/lookup/subcategory", { params: { category } });

export const createCategory = async (payload: any) =>
  await Request.post("/lookup/category", payload);

export const createUnit = async (payload: any) =>
  await Request.put("/lookup/units", payload);

export const createSubCategory = async (payload: any) =>
  await Request.post("/lookup/subcategory", payload);

export const upsertProduct = async (payload: any) =>
  await Request.put("/inventory/upsert", payload);

export const getProductList = async (params: any) =>
  await Request.get("/inventory", { params });

export const getProductDetails = async (productId: string) =>
  await Request.get(`/inventory/${productId}`);

export const getHistory = async (params: any) =>
  await Request.get("inventory/history", { params });

export const getTransactions = async (params: any) =>
  await Request.get("inventory/tracking", { params });

export const getNodeOptions = async (params: any) =>
  await Request.get("/node/getOptions", { params });

export const createInventoryTracking = async (data: any) =>
  await Request.put("/inventory/tracking/upsert", data);

export const getInventoryTracking = async (params: any) =>
  await Request.get("/inventory/tracking", { params });

export const removeNode = async (id: string) => {
  await Request.delete(`/node/${id}`);
};

// Look up

export const getLookupList = async (params: any) =>
  await Request.get("/lookup", { params });

export const upsertLookup = async (body: any) =>
  await Request.put("/lookup", body);

export const getTrackingOptions = async () =>
  await Request.get("/process/getOptions");