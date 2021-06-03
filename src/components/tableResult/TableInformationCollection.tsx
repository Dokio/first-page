/*
 * @Descripttion: This file include 4 patt information, which are TableTime, CycleInfo, OrderInfo and OrderDetails
 * @Author: Wei
 * @Date: 2021-05-20 16:31:04
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-20 17:29:23
 * @FilePath: /play-back/src/components/table/TableInformationCollection.tsx
 */
import { FC } from "react";
import style from "./tableInformationCollection.module.less";

//TableTime Interface
interface TableTimeProps {
  cycleStartProcessingTime: number;
  cycleFinishProcessingTime: number;
  cycleElapsedProcessingTime: number;
}

//TableCycleInfo Interface
interface TableCycleInfoProps {
  cycleIndex: string;
  cycleType: string;
}

//TableOrderInfo Interface
interface TableOrderInfoProps {
  controllerclientindex: string;
  isPrepared: boolean;
  ignoreFinishPosition: boolean;
}

//TableOrderDetails Interface
interface TableOrderDetailsProps {
  targetname: string;
  details: OrderDetails;
}
interface OrderDetails {
  orderGroupId: string;
  orderNumPickLocations: number;
  orderPickContainerIds: string;
  orderPickContainerTypes: string;
  orderNumPlaceLocations: number;
  orderPlaceContainerIds: string;
  orderPlaceContainerTypes: string;
}

//TableTime Subcomponent
const TableTime: FC<TableTimeProps> = ({
  cycleStartProcessingTime,
  cycleFinishProcessingTime,
  cycleElapsedProcessingTime,
}) => {
  let started = new Date(cycleStartProcessingTime * 1000).toISOString();
  let ended = new Date(cycleFinishProcessingTime * 1000).toISOString();
  let interval = cycleElapsedProcessingTime;
  return (
    <div className={style.tableTime}>
      <div className={style.timeLabel}>
        <p>
          <span className={style.ballStart} />
          Start data & time
        </p>
        <p>
          <span className={style.ballEnd} />
          End data & time
        </p>
      </div>
      <div className={style.timeShow}>
        <div className={style.startEnd}>
          <p>{started.slice(11, 19)}</p>
          <p>
            {started.slice(5, 7)}/{started.slice(8, 10)}/{started.slice(2, 4)}
          </p>
        </div>
        <div className={style.interval}>
          <p>{interval.toFixed(2)}</p>
          <p className={style.unit}>sec</p>
        </div>
        <div className={style.startEnd}>
          <p>{ended.slice(11, 19)}</p>
          <p>
            {ended.slice(5, 7)}/{ended.slice(8, 10)}/{ended.slice(2, 4)}
          </p>
        </div>
      </div>
    </div>
  );
};

//TableCycleInfo Subcomponent
const TableCycleInfo: FC<TableCycleInfoProps> = ({ cycleIndex, cycleType }) => {
  let isOrder: boolean;
  if (cycleType === "preparation") {
    isOrder = false;
  } else {
    isOrder = true;
  }

  return (
    <div className={style.cycleInfo}>
      <ul>
        <li>
          <span>cycleIndex</span>
          <span className={style.pickSpan}>{cycleIndex}</span>
        </li>
        <li>
          <span className={style.typeSpan}>Type</span>
          <span
            className={
              isOrder ? style.statusSpanOrder : style.statusSpanPreparation
            }
          >
            {cycleType}
          </span>
        </li>
      </ul>
    </div>
  );
};

//TableOrderInfo Subcomponent
const TableOrderInfo: FC<TableOrderInfoProps> = ({
  controllerclientindex,
  isPrepared,
  ignoreFinishPosition,
}) => {
  return (
    <div className={style.orderInfo}>
      <div>
        <ul>
          <li>
            <span>ControllerIndex</span>
            <span className={style.numberSpan}>{controllerclientindex}</span>
          </li>
          <li>
            <span>isPrepared</span>
            <span
              className={
                isPrepared ? style.signalSpanTrue : style.signalSpanFalse
              }
            />
          </li>
          <li>
            <span>IgnoreFinish</span>
            <span
              className={
                ignoreFinishPosition
                  ? style.signalSpanTrue
                  : style.signalSpanFalse
              }
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

//TableOrderDetails Subcomponent
const TableOrderDetails: FC<TableOrderDetailsProps> = ({
  targetname,
  details,
}) => {
  return (
    <div className={style.orderDetails}>
      <div className={style.orderDetailsItem}>
        <p>
          <span>OrderGroupId</span>
          <span>{details.orderGroupId}</span>
        </p>

        <p>
          <span>OrderPartType</span>
          <span>{targetname}</span>
        </p>
      </div>

      <div className={style.pickAndPlace}>
        <div className={style.pickPlace}>
          <p>Pick</p>
          <ul>
            <li>
              <span>Location</span>
              <span>{details.orderNumPickLocations}</span>
            </li>
            <li>
              <span>ContainerID</span>
              <span>{details.orderPickContainerIds}</span>
            </li>
            <li>
              <span>ContainerType</span>
              <span>{details.orderPickContainerTypes}</span>
            </li>
          </ul>
        </div>
        <p>→</p>
        <div className={style.pickPlace}>
          <p>Place</p>
          <ul>
            <li>
              <span>Location</span>
              <span>{details.orderNumPlaceLocations}</span>
            </li>
            <li>
              <span>ContainerID</span>
              <span>{details.orderPlaceContainerIds}</span>
            </li>
            <li>
              <span>ContainerType</span>
              <span>{details.orderPlaceContainerTypes}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { TableTime, TableCycleInfo, TableOrderInfo, TableOrderDetails };
