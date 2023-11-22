import { useEffect, useState } from "react";
import axios from "axios";
import { testAPI } from "../api";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
  statusCode?: number;
}

export const useFetch = <T>(url: string, type: 'GET' | 'POST' = 'GET', body?: any) => {
  const [data, setData] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
    statusCode: 200,
  });

  const fetchData = async () => {
    setData({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      let result = null;
      if (type === 'POST') { 
        const { data } = await testAPI.post(url, body);

        result = data;
      } else {
        const { data } = await testAPI.get(url);

        result = data;
      }
      setData({
        data: result,
        isLoading: false,
        error: null,
        statusCode: 200,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setData({
          data: null,
          isLoading: false,
          error: error.response?.data || 'Error del Servidor',
          statusCode: error.response?.status,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return ({
    ...data,
    refetch: fetchData,
  })
}
