import React, { FC } from "react";
import style from "./tooltipAndInterval.module.less";

const CALCULATE_ACCURACY = 1;
const INTERVAL_ACCURACY = 2;
//  interface of IdleTime(interval between tew lines)
interface TableIdleProps {
  startTime: number;
  endTime: number;
}

//  interface of Tooltip(detail information of Table result)
interface DetailResultProps {
  finishCode: string;
  placedInDest: number;
  orderNumber: number;
  targetstatus: Record<string, unknown>[];
  status: string;
  cycleElapsedProcessingTime: number;
}

//  IdleTime Subcomponent
const TableIdle: FC<TableIdleProps> = ({ startTime, endTime }) => {
  return (
    <div className={style.tableIdle}>
      <p>
        <span>idle time </span>
        <span>{Math.abs(startTime - endTime).toFixed(INTERVAL_ACCURACY)}</span>
        <span> [sec]</span>
      </p>
    </div>
  );
};

//  DetailResult Subcomponent
const DetailResult: FC<DetailResultProps> = ({
  finishCode,
  placedInDest,
  orderNumber,
  targetstatus,
  status,
  cycleElapsedProcessingTime,
}) => {
  
  let warningList: string[] = [];
  for (const status of targetstatus) {
    if (status.targetstatus !== "success") {
      warningList.push((status as {targetstatus:string}).targetstatus);
    }
  }
  
  //  input [a, b, c, a], output {a:2, b:1, c:1}
  const countWarnings = (warningList: string[]): object => {
    const warningToTimes: Record<string,number> = {};
    for (let warningIndex = 0; warningIndex < warningList.length; warningIndex++) {
      if (!warningToTimes[warningList[warningIndex]]) {
        warningToTimes[warningList[warningIndex]] = 1;
      } else {
        warningToTimes[warningList[warningIndex]] = warningToTimes[warningList[warningIndex]] + 1;
      }
    }
    return warningToTimes;
  };



  const warningToTimes: object = countWarnings(warningList);

  return (
    <div className={style.detailResult}>
      <p className={style.detailResultTitle}>Result Detail</p>
      <div>
        <p>
          <span>Picked/total : </span>
          <span>
            {placedInDest}/{orderNumber}
          </span>
        </p>
        <p>
          <span>Order status : </span>
          <span className={style.orderStatusSpan}>{finishCode}</span>
        </p>
        <p>
          <span className={style.labelName}>Error</span>
          {Object.keys(warningToTimes).map((warningItem, warningIndex) => {
            return (
              <span key={warningIndex}>
                <br />
                <span>
                  {warningItem}×{Object.values(warningToTimes)[warningIndex]}
                </span>
              </span>
            );
          })}
          <span>{status}</span>
        </p>
        {placedInDest ? (
          <p>
            <span>PickSpeed :</span>
            <br />
            <span>
              {(cycleElapsedProcessingTime / placedInDest).toFixed(CALCULATE_ACCURACY)}
            </span>
            <span className={style.unit}>sec/pick</span>
            <span className={style.spanDisplay} />
            <span>
              {(3600 / (cycleElapsedProcessingTime / placedInDest)).toFixed(CALCULATE_ACCURACY)}
            </span>
            <span className={style.unit}>pick/hour</span>
          </p>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};
export { TableIdle, DetailResult };
