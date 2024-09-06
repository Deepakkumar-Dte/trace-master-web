import { Dispatch, useEffect, useState } from "react";

type returnType = [
  loading: boolean,
  data: any,
  error: any,
  setData: Dispatch<any>,
  refresh: () => void
];

type apiType = {
  [key: string]: (...arg: any[]) => Promise<{ data: any; message: string; success: boolean }>;
};
type payload = {
  [key: string]: any[];
};

type UseFetch = (apiList: apiType, payload: payload) => returnType;
const useFetch: UseFetch = (apiList, payloadData) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      setLoading(true);
      const result: Record<string, any> = {};
      for (const key in apiList) {
        const payload = payloadData[key] ?? [];
        try {
          const api = apiList[key];
          result[key] = (await api(...payload)).data;
          console.log(result[key],"result")
        } catch (error) {
          console.error(error);
          result[key] = null;
        }
      }
      setData(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return [loading, data, error, setData, fetch];
};

export default useFetch;
