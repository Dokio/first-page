import React, { FC, Fragment, useEffect, useState } from "react";
import style from "./landingPageTable.module.less";
import TableResult from "./tableResult/TableResult";
import { FilterProps } from "../containers/LandingPage";
import { Button, Pagination } from "@mujin/uicomponents";
import useWebstackCycleLogQuery from "../hooks/WebstackCycleLogQuery";
import {
  OrderDetails,
  TableCycleInfo,
  TableOrderDetails,
  TableOrderInfo,
  TableTime,
} from "./tableResult/TableInformationCollection";
import { TableIdle } from "./tableResult/TooltipAndInterval";

const TABLE_PAGE = 1;
const TABLE_PAGE_SIZE = 5;
const TABLE_PAGE_LIMIT = 20;
export interface CycleInformationProps {
  finishCode:string;
  cycleStartProcessingTime:number;
  cycleFinishProcessingTime:number;
  cycleElapsedProcessingTime:number;
  cycleIndex:string;
  cycleType:string;
  controllerclientindex:string
  isPrepared:boolean;
  ignoreFinishPosition:boolean;
  targetname: string;
  placedInDest:number;
  targetstatus:Record<string, unknown>[];
  orderNumber:number;
  status:string;
  orderIds?: OrderDetails;
  cycleStatistics: { executed: Record<string, unknown>[] };
}

const LandingPageTable: FC<FilterProps> = (filterSearchProps) => {
  const [dataSource, setDataSource] = useState<CycleInformationProps[]>([]);
  const { filterSearchParams } = filterSearchProps;
  const { result, filterSearchParams: queryParams, setFilterSearchParams } = useWebstackCycleLogQuery(
    "http://controller433.mujin.co.jp"
  );


  const handleCopyJson = (cycleJsonDetail: CycleInformationProps) => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.value = JSON.stringify(cycleJsonDetail);
    input.focus();
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  };

  useEffect(() => {
    const webstackData = result?.data as { objects: CycleInformationProps[] };
    if (webstackData?.objects) {
      if (
        !filterSearchParams.cycleIndexInput &&
        !filterSearchParams.finishCodeInput &&
        !filterSearchParams.cycleTypes.length &&
        !filterSearchParams.groupIdInput &&
        !filterSearchParams.partTypeInput
      ) {
        setDataSource(webstackData.objects);
      } else {
        setDataSource(
          webstackData.objects.filter((cycleItem) => {
            return (
              (cycleItem.cycleIndex === filterSearchParams.cycleIndexInput ||
                !filterSearchParams.cycleIndexInput) &&
              filterSearchParams.cycleTypes.includes(cycleItem.cycleType as string) &&
              (cycleItem.finishCode === filterSearchParams.finishCodeInput ||
                !filterSearchParams.finishCodeInput) &&
              ((cycleItem.orderIds as {orderGroupId: string}).orderGroupId === filterSearchParams.groupIdInput ||
                !filterSearchParams.groupIdInput) &&
              (cycleItem.targetname === filterSearchParams.partTypeInput || !filterSearchParams.partTypeInput)
            );
          })
        );
      }
    }
  }, [result, filterSearchParams]);

  const [pageParams, setPageParams] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: TABLE_PAGE,
    pageSize: TABLE_PAGE_SIZE,
  });

  useEffect(() => {
    if (!queryParams.limit) {
      setFilterSearchParams({
        limit: TABLE_PAGE_LIMIT,
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
          {dataSource.map((cycleInformation: CycleInformationProps, cycleNumber: number) => {
            return (
              <Fragment key={cycleNumber}>
                <tr>
                  <td>
                    <TableTime
                      cycleStartProcessingTime={cycleInformation.cycleStartProcessingTime}
                      cycleFinishProcessingTime={cycleInformation.cycleFinishProcessingTime}
                      cycleElapsedProcessingTime={cycleInformation.cycleElapsedProcessingTime}
                    />
                  </td>
                  <td>
                    <TableCycleInfo
                      cycleIndex={cycleInformation.cycleIndex}
                      cycleType={cycleInformation.cycleType}
                    />
                  </td>
                  <td>
                    <TableOrderInfo
                      controllerclientindex={cycleInformation.controllerclientindex}
                      isPrepared={cycleInformation.isPrepared}
                      ignoreFinishPosition={cycleInformation.ignoreFinishPosition}
                    />
                  </td>
                  <td>
                    <TableOrderDetails
                      targetname={cycleInformation.targetname}
                      details={cycleInformation.orderIds}
                    />
                  </td>
                  <td>
                    <TableResult detail={  cycleInformation} />
                  </td>
                  <td>
                    <div className={style.tableButton}>
                      <Button
                        onClick={() => handleCopyJson(cycleInformation)}
                        text="Copy Json"
                        variant="secondary"
                        className={style.copyJsonButton}
                      />
                    </div>
                  </td>
                </tr>
                {cycleNumber !== dataSource.length - 1 && (
                  <tr>
                    {Math.abs(
                      (dataSource[cycleNumber].cycleFinishProcessingTime as number) ?? 0 -
                      (dataSource[cycleNumber + 1].cycleStartProcessingTime as number) ?? 0
                    ) > 1 ? (
                      <td colSpan={6}>
                        <TableIdle
                          startTime={dataSource[cycleNumber].cycleFinishProcessingTime as number ?? 0}
                          endTime={dataSource[cycleNumber + 1].cycleStartProcessingTime as number ?? 0}
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
        className={style.paginationStyle}  
        defaultCurrent={2}
        showQuickJumper
        showSizeChanger
        pageSize={pageParams.pageSize}
        total={result?.data?.objects?.length}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default LandingPageTable;
