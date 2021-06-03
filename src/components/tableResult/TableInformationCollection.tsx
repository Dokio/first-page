import React, { FC } from "react";
import style from "./tableInformationCollection.module.less";

// index of the time information of Json for slicing
enum TimeSliceIndex{
  START_TIME = 11,
  END_TIME = 19,
  START_MONTH = 5,
  END_MONTH = 7,
  START_DATE = 8,
  END_DATE = 10,
  START_YEAR = 2,
  END_YEAR = 4,
}
const TIME_TRANSFER = 1000;
const NUMBER_ACCURACY = 2;

// TableTime Interface
interface TableTimeProps {
  cycleStartProcessingTime: number;
  cycleFinishProcessingTime: number;
  cycleElapsedProcessingTime: number;
}

// TableCycleInfo Interface
interface TableCycleInfoProps {
  cycleIndex: string;
  cycleType: string;
}

// TableOrderInfo Interface
interface TableOrderInfoProps {
  controllerclientindex: string;
  isPrepared: boolean;
  ignoreFinishPosition: boolean;
}

// TableOrderDetails Interface
interface TableOrderDetailsProps {
  targetname: string;
  details?: OrderDetails;
}
export interface OrderDetails {
  orderGroupId: string;
  orderNumPickLocations: number;
  orderPickContainerIds: string;
  orderPickContainerTypes: string;
  orderNumPlaceLocations: number;
  orderPlaceContainerIds: string;
  orderPlaceContainerTypes: string;
}

// TableTime Subcomponent
const TableTime: FC<TableTimeProps> = ({
  cycleStartProcessingTime,
  cycleFinishProcessingTime,
  cycleElapsedProcessingTime,
}) => {
  let started = new Date(cycleStartProcessingTime * TIME_TRANSFER).toISOString();
  let ended = new Date(cycleFinishProcessingTime * TIME_TRANSFER).toISOString();
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
          <p>{started.slice(TimeSliceIndex.START_TIME, TimeSliceIndex.END_TIME)}</p>
          <p>
            {started.slice(TimeSliceIndex.START_MONTH, TimeSliceIndex.END_MONTH)}/{started.slice(TimeSliceIndex.START_DATE, TimeSliceIndex.END_DATE)}/{started.slice(TimeSliceIndex.START_YEAR, TimeSliceIndex.END_YEAR)}
          </p>
        </div>
        <div className={style.interval}>
          <p>{interval.toFixed(NUMBER_ACCURACY)}</p>
          <p className={style.unit}>sec</p>
        </div>
        <div className={style.startEnd}>
          <p>{ended.slice(TimeSliceIndex.START_TIME, TimeSliceIndex.END_TIME)}</p>
          <p>
            {ended.slice(TimeSliceIndex.START_MONTH, TimeSliceIndex.END_MONTH)}/{ended.slice(TimeSliceIndex.START_DATE, TimeSliceIndex.END_DATE)}/{ended.slice(TimeSliceIndex.START_YEAR, TimeSliceIndex.END_YEAR)}
          </p>
        </div>
      </div>
    </div>
  );
};

// TableCycleInfo Subcomponent
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

// TableOrderInfo Subcomponent
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

// TableOrderDetails Subcomponent
const TableOrderDetails: FC<TableOrderDetailsProps> = ({
  targetname,
  details,
}) => {
  return (
    <div className={style.orderDetails}>
      <div className={style.orderDetailsItem}>
        <p>
          <span>OrderGroupId</span>
          <span>{details?.orderGroupId}</span>
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
              <span>{details?.orderNumPickLocations}</span>
            </li>
            <li>
              <span>ContainerID</span>
              <span>{details?.orderPickContainerIds}</span>
            </li>
            <li>
              <span>ContainerType</span>
              <span>{details?.orderPickContainerTypes}</span>
            </li>
          </ul>
        </div>
        <p>→</p>
        <div className={style.pickPlace}>
          <p>Place</p>
          <ul>
            <li>
              <span>Location</span>
              <span>{details?.orderNumPlaceLocations}</span>
            </li>
            <li>
              <span>ContainerID</span>
              <span>{details?.orderPlaceContainerIds}</span>
            </li>
            <li>
              <span>ContainerType</span>
              <span>{details?.orderPlaceContainerTypes}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { TableTime, TableCycleInfo, TableOrderInfo, TableOrderDetails };
