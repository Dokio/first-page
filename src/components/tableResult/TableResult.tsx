/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-05-05 13:46:47
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-20 17:37:21
 * @FilePath: /play-back/src/components/tableResult/TableResult.tsx
 */

import { FC, useState } from "react";
import style from "./tableResult.module.less";
import { DetailResult } from "./TooltipAndInterval";

interface TableResultProps {
  detail: ResultDetailProps;
}

interface ResultDetailProps {
  cycleType: string;
  finishCode: string;
  placedInDest: number;
  orderNumber: number;
  targetstatus: any[];
  //targetstatus:Array<any>;
  status: string;
  cycleElapsedProcessingTime: number;
  [other: string]: any;
}

interface PreparationProps {
  finishCode: string;
}

interface OrderProps {
  finishCode: string;
  placedInDest: number;
  OrderNumber: number;
  targetstatus: any[];
  status: string;
  cycleElapsedProcessingTime: number;
}

const Preparation: FC<PreparationProps> = ({ finishCode }) => {
  let isSuccess: boolean;
  if (finishCode === "PreparationFinishedSuccess") {
    isSuccess = true;
  } else {
    isSuccess = false;
  }
  return (
    <div>
      <span className={style.labelName} style={{ paddingLeft: "10px" }}>
        Order Status
      </span>
      <span
        className={
          isSuccess ? style.statusSpanSuccess : style.statusSpanNoSuccess
        }
        style={{ marginLeft: "35px" }}
      >
        {finishCode}
      </span>
    </div>
  );
};

const Order: FC<OrderProps> = ({
  finishCode,
  placedInDest,
  OrderNumber,
  targetstatus,
  status,
  cycleElapsedProcessingTime,
}) => {
  const renderWarning = (targetstatus: any[]) => {
    let warningList: string[] = [];
    for (const v of targetstatus) {
      if (v.targetstatus !== "success") {
        warningList.push(v.targetstatus);
      }
    }

    const fun = (arr: string[]): object => {
      const obj: any = {};
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = 1;
        } else {
          obj[arr[i]] = obj[arr[i]] + 1;
        }
      }
      return obj;
    };
    const obj: object = fun(warningList);

    if (Object.keys(obj).length) {
      return (
        <li>
          <span className={style.labelName}>Error</span>
          {Object.keys(obj).length > 3 ? (
            <>
              {Object.keys(obj).map((v, i) => {
                if (i > 2) {
                  return null;
                }
                return (
                  <span key={i}>
                    <br />
                    <span>
                      {v}×{Object.values(obj)[i]}
                    </span>
                  </span>
                );
              })}
              <br />
              <span>
                <span>+more</span>
              </span>
            </>
          ) : (
            Object.keys(obj).map((v, i) => {
              return (
                <span key={i}>
                  <br />
                  <span>
                    {v}×{Object.values(obj)[i]}
                  </span>
                </span>
              );
            })
          )}
        </li>
      );
    }
  };
  return (
    <div>
      <ul>
        <li>
          <span className={style.labelName}>Picked/total</span>
          <span className={style.pickSpan}>
            {placedInDest}/{OrderNumber}
          </span>
        </li>
        <li>
          <span className={style.labelName}>Order Status</span>
          <span
            className={
              finishCode === "FinishedOrderComplete"
                ? style.statusSpanSuccess
                : style.statusSpanNoSuccess
            }
          >
            {finishCode}
          </span>
        </li>

        {placedInDest ? (
          <li>
            <span className={style.labelName}>Pick speed</span>
            <span className={style.pickSpan}>
              {(cycleElapsedProcessingTime / placedInDest).toFixed(1)}
            </span>
            <span className={style.unit}> sec/pick</span>
            <br />
            <span className={style.pickSpan} style={{ marginLeft: "95px" }}>
              {(3600 / (cycleElapsedProcessingTime / placedInDest)).toFixed(1)}
            </span>
            <span className={style.unit}> pick/hour</span>
          </li>
        ) : (
          <span />
        )}
        {renderWarning(targetstatus)}
      </ul>
    </div>
  );
};

const TableResult: FC<TableResultProps> = ({ detail }) => {
  const [mouseEvent, setMouseEvent] = useState<boolean>(false);
  const renderChild = (detail: ResultDetailProps) => {
    if (detail.cycleType === "preparation") {
      return <Preparation finishCode={detail.finishCode} />;
    } else if (detail.cycleType === "order") {
      return (
        <Order
          finishCode={detail.finishCode}
          placedInDest={detail.placedInDest}
          OrderNumber={detail.orderNumber}
          targetstatus={detail?.cycleStatistics?.executed}
          status={detail.status}
          cycleElapsedProcessingTime={detail.cycleElapsedProcessingTime}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <div
      onMouseEnter={() => setMouseEvent(true)}
      onMouseLeave={() => setMouseEvent(false)}
      className={style.tableResult}
      style={
        detail.cycleType === "order" && mouseEvent
          ? { backgroundColor: "black" }
          : {}
      }
    >
      <div
        style={{
          display:
            detail.cycleType === "order" && mouseEvent ? "block" : "none",
        }}
      >
        <DetailResult
          finishCode={detail.finishCode}
          placedInDest={detail.placedInDest}
          orderNumber={detail.orderNumber}
          targetstatus={detail?.cycleStatistics?.executed}
          status={detail.status}
          cycleElapsedProcessingTime={detail.cycleElapsedProcessingTime}
        />
      </div>
      {renderChild(detail)}
    </div>
  );
};

export default TableResult;
