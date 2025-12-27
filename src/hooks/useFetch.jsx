import { useState } from "react";
import { _get } from "../utils/api";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async (url, options) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await _get(url, { ...options });
      setData(res?.data?.data);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, fetch };
};

export default useFetch
