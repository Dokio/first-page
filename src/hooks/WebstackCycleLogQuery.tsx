import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { CycleInformationProps } from "../components/LandingPageTable";

interface CycleLogParams {
  limit?: number;
  cursor?: string;
  endcursor?: string;
}

const useWebstackCycleLogQuery = (baseUrl: string) => {
  const [filterSearchParams, setFilterSearchParams] = useState<CycleLogParams>({});
  const [result, setResult] = useState<AxiosResponse<{ objects: CycleInformationProps[] }> | null>(null);
  useEffect(() => {
    const apiClient = axios.create({
      baseURL: `${baseUrl}/api/v1/cycleLog/?cycleType__neq=production`,
      auth: {
        username: "mujin",
        password: "mujin",
      },
    });
    apiClient
      .get("", {
        params: filterSearchParams,
      })
      .then((newResult) => setResult(newResult));
  }, [filterSearchParams, baseUrl]);

  return { result, filterSearchParams, setFilterSearchParams };
};

export default useWebstackCycleLogQuery;
