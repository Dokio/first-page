/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-05-21 10:46:40
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-21 12:11:21
 * @FilePath: /play-back/src/hooks/WebstackCycleLogQuery.tsx
 */
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface CycleLogParams {
  limit?: number;
  cursor?: string;
  endcursor?: string;
}

const useWebstackCycleLogQuery = (baseUrl: string) => {
  const [params, setParams] = useState<CycleLogParams>({});
  const [result, setResult] = useState<AxiosResponse<any> | null>(null);
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
        params: params,
      })
      .then((newResult) => setResult(newResult));
  }, [params, baseUrl]);

  return { result, params, setParams };
};

export default useWebstackCycleLogQuery;
