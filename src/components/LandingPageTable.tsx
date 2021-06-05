/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-05-04 20:36:05
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-27 10:35:37
 * @FilePath: /play-back/src/components/LandingPageTable.tsx
 */
import { FC, Fragment, useEffect, useState } from "react";
//import style from "../containers/landingPage.module.less"
import style from "./landingPageTable.module.less";
import TableResult from "./tableResult/TableResult";
import JsonData from "../test/test.json";
import { FilterProps } from "../containers/LandingPage";
import { Button, Pagination } from "antd";
import useWebstackCycleLogQuery from "../hooks/WebstackCycleLogQuery";
import {
  TableCycleInfo,
  TableOrderDetails,
  TableOrderInfo,
  TableTime,
} from "./tableResult/TableInformationCollection";
import { TableIdle } from "./tableResult/TooltipAndInterval";

const LandingPageTable: FC<FilterProps> = (props) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const { params } = props;
  const { result, params: queryParams, setParams } = useWebstackCycleLogQuery(
    "http://controller433.mujin.co.jp"
  );
  console.log(result)

  const handleCopyJson = (v: any) => {
    console.log(v);
    console.log();
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.value = JSON.stringify(v);
    input.focus();
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  };

  useEffect(() => {
    const webstackData = result?.data as { objects: any[] };
    if (!!webstackData?.objects) {
      if (
        !params.cycleIndexInput &&
        !params.finishCodeInput &&
        !params.cycleTypes.length &&
        !params.groupIdInput &&
        !params.partTypeInput
      ) {
        setDataSource(webstackData.objects);
      } else {
        setDataSource(
          webstackData.objects.filter((v) => {
            return (
              (v.cycleIndex === params.cycleIndexInput ||
                !params.cycleIndexInput) &&
              params.cycleTypes.includes(v.cycleType) &&
              (v.finishCode === params.finishCodeInput ||
                !params.finishCodeInput) &&
              (v.orderIds.orderGroupId === params.groupIdInput ||
                !params.groupIdInput) &&
              (v.targetname === params.partTypeInput || !params.partTypeInput)
            );
          })
        );
      }
    }
  }, [result, params]);

  const [pageParams, setPageParams] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 5,
  });

  useEffect(() => {
    if (!queryParams.limit) {
      setParams({
        limit: 20,
      });
    }
  });

  const handlePageChange = (
    page: number | undefined,
    pageSize: number | undefined
  ) => {
    console.log(page, pageSize);
    setPageParams({
      page: page!,
      pageSize: pageSize!,
    });
  };

  useEffect(() => {
    //console.log(JsonData.objects?.filter((_, i) => i > pageParams.pageSize * (pageParams.page - 1)))
    setDataSource(
      JsonData?.objects?.filter(
        (_, i) =>
          i > pageParams.pageSize * (pageParams.page - 1) &&
          i < pageParams.pageSize * pageParams.page + 1
      )
    );
  }, [pageParams]);

  return (
    <div className={style.tableBox}>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Cycle info</th>
            <th>Order info</th>
            <th>Order details</th>
            <th colSpan={2}>Result</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((v: any, i: number) => {
            return (
              <Fragment key={i}>
                <tr>
                  <td>
                    <TableTime
                      cycleStartProcessingTime={v.cycleStartProcessingTime}
                      cycleFinishProcessingTime={v.cycleFinishProcessingTime}
                      cycleElapsedProcessingTime={v.cycleElapsedProcessingTime}
                    />
                  </td>
                  <td>
                    <TableCycleInfo
                      cycleIndex={v.cycleIndex}
                      cycleType={v.cycleType}
                    />
                  </td>
                  <td>
                    <TableOrderInfo
                      controllerclientindex={v.controllerclientindex}
                      isPrepared={v.isPrepared}
                      ignoreFinishPosition={v.ignoreFinishPosition}
                    />
                  </td>
                  <td>
                    <TableOrderDetails
                      targetname={v.targetname}
                      details={v.orderIds}
                    />
                  </td>
                  <td>
                    <TableResult detail={v} />
                  </td>
                  <td>
                    <div className={style.tableButton}>
                      <Button
                        onClick={() => handleCopyJson(v)}
                        //text="Copy Json"
                        //variant="secondary"
                        style={{
                          backgroundColor: "#2D2E31",
                          borderRadius: "5px",
                          fontSize: "14px",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}
                      />
                    </div>
                  </td>
                </tr>
                {i !== dataSource.length - 1 && (
                  <tr>
                    {Math.abs(
                      dataSource[i].cycleFinishProcessingTime -
                        dataSource[i + 1].cycleStartProcessingTime
                    ) > 1 ? (
                      <td colSpan={6}>
                        <TableIdle
                          startTime={dataSource[i].cycleFinishProcessingTime}
                          endTime={dataSource[i + 1].cycleStartProcessingTime}
                        />
                      </td>
                    ) : null}
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <Pagination
        style={{ marginTop: "20px" }}
        defaultCurrent={2}
        //pageSize={8}
        //total={50}
        showQuickJumper
        showSizeChanger
        pageSize={pageParams.pageSize}
        total={JsonData.objects?.length}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default LandingPageTable;
