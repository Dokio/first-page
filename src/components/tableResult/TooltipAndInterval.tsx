/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-05-09 20:41:47
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-20 17:44:30
 * @FilePath: /play-back/src/components/tableResult/TooltipAndInterval.tsx
 */
import { FC } from "react";
//import style from '../../containers/landingPage.module.less';
import style from "./tooltipAndInterval.module.less";
//interface of IdleTime(interval between tew lines)
interface TableIdleProps {
  startTime: number;
  endTime: number;
}

//interface of Tooltip(detail information of Table result)
interface DetailResultProps {
  finishCode: string;
  placedInDest: number;
  orderNumber: number;
  targetstatus: any[];
  status: string;
  cycleElapsedProcessingTime: number;
}

//IdleTime Subcomponent
const TableIdle: FC<TableIdleProps> = ({ startTime, endTime }) => {
  return (
    <div className={style.tableIdle}>
      <p>
        <span>idle time </span>
        <span>{Math.abs(startTime - endTime).toFixed(2)}</span>
        <span> [sec]</span>
      </p>
    </div>
  );
};

//DetailResult Subcomponent
const DetailResult: FC<DetailResultProps> = ({
  finishCode,
  placedInDest,
  orderNumber,
  targetstatus,
  status,
  cycleElapsedProcessingTime,
}) => {
  let warningList: string[] = [];
  for (const v of targetstatus) {
    if (v.targetstatus !== "success") {
      warningList.push(v.targetstatus);
    }
  }
  //input[a, b, c, a] output {a:2, b:1, c:1}
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
          <span style={{ textAlign: "center" }}>{finishCode}</span>
        </p>
        <p>
          <span className={style.labelName}>Error</span>
          {Object.keys(obj).map((v, i) => {
            return (
              <span key={i}>
                <br />
                <span>
                  {v}×{Object.values(obj)[i]}
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
              {(cycleElapsedProcessingTime / placedInDest).toFixed(1)}
            </span>
            <span className={style.unit}>sec/pick</span>
            <span style={{ display: "inline-block", width: "15px" }} />
            <span>
              {(3600 / (cycleElapsedProcessingTime / placedInDest)).toFixed(1)}
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
