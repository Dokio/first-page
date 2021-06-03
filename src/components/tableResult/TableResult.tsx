import React, { FC, useState } from 'react';
import style from './tableResult.module.less';
import { DetailResult } from './TooltipAndInterval';

const COUNT_ACCURACY = 1;
const WARNING_NUMBER_MAXIMUM = 3;
const WARNING_INDEX_MAXIMUM = 2;
interface TableResultProps {
  detail: ResultDetailProps;
}

interface ResultDetailProps {
  cycleType: string;
  finishCode: string;
  placedInDest: number;
  orderNumber: number;
  targetstatus: Record<string, unknown>[];
  status: string;
  cycleElapsedProcessingTime: number;
  cycleStatistics: { executed: Record<string, unknown>[] }
}

interface PreparationProps {
  finishCode: string;
}

interface OrderProps extends Record<string, unknown> {
  finishCode: string;
  placedInDest: number;
  OrderNumber: number;
  targetstatus: Record<string, unknown>[];
  status: string;
  cycleElapsedProcessingTime: number;
}

// This function is to extract the warning and its corresponding appear time
export const getWarningObject = (
  targetstatusList: Record<string, unknown>[],
): object => {
  if(!targetstatusList){
    const warningToTimes: Record<string, number> = {};
    return warningToTimes;
  }
  let warningList: string[] = [];
  for (const status of targetstatusList) {
    if (status.targetstatus !== 'success') {
      warningList.push((status as { targetstatus: string }).targetstatus);
      // targetstatus={(detail?.cycleStatistics as { executed: Record<string, unknown>[] })?.executed}
    }
  }
  // turn [a, b, c, a] into {a:2, b:1, c:1}
  const warningToTimes: Record<string, number> = {};
  for (
    let warningIndex = 0;
    warningIndex < warningList.length;
    warningIndex++
  ) {
    if (!warningToTimes[warningList[warningIndex]]) {
      warningToTimes[warningList[warningIndex]] = 1;
    } else {
      warningToTimes[warningList[warningIndex]] =
        warningToTimes[warningList[warningIndex]] + 1;
    }
  }
  return warningToTimes;
};

const Preparation: FC<PreparationProps> = ({ finishCode }) => {
  let isSuccess: boolean;
  if (finishCode === 'PreparationFinishedSuccess') {
    isSuccess = true;
  } else {
    isSuccess = false;
  }
  return (
    <div>
      <span className={style.labelOrderStatus}>Order Status</span>
      <span
        className={
          isSuccess
            ? style.statusPreparationSpanSuccess
            : style.statusPreparationSpanNoSuccess
        }
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
  const renderWarning = (targetstatus: Record<string, unknown>[]) => {

    

    const warningToTimes: object = getWarningObject(targetstatus);

    if (Object.keys(warningToTimes).length) {
      return (
        <li>
          <span className={style.labelName}>Error</span>
          {Object.keys(warningToTimes).length > WARNING_NUMBER_MAXIMUM ? (
            <>
              {Object.keys(warningToTimes).map((warningItem, waringIndex) => {
                if (waringIndex > WARNING_INDEX_MAXIMUM) {
                  return null;
                }
                return (
                  <span key={waringIndex}>
                    <br />
                    <span>
                      {warningItem}×{Object.values(warningToTimes)[waringIndex]}
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
            Object.keys(warningToTimes).map((warningItem, waringIndex) => {
              return (
                <span key={waringIndex}>
                  <br />
                  <span>
                    {warningItem}×{Object.values(warningToTimes)[waringIndex]}
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
              finishCode === 'FinishedOrderComplete'
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
              {(cycleElapsedProcessingTime / placedInDest).toFixed(
                COUNT_ACCURACY,
              )}
            </span>
            <span className={style.unit}> sec/pick</span>
            <br />
            <span className={style.pickSpeedSpan}>
              {(3600 / (cycleElapsedProcessingTime / placedInDest)).toFixed(
                COUNT_ACCURACY,
              )}
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
    if (detail.cycleType === 'preparation') {
      return <Preparation finishCode={detail.finishCode} />;
    } else if (detail.cycleType === 'order') {
      return (
        <Order
          finishCode={detail.finishCode}
          placedInDest={detail.placedInDest}
          OrderNumber={detail.orderNumber}
          targetstatus={
            (detail?.cycleStatistics as { executed: Record<string, unknown>[] })
              ?.executed
          }
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
      className={
        detail.cycleType === 'order' && mouseEvent
          ? style.tableResultMouse
          : style.tableResult
      }
    >
      <div
        className={
          detail.cycleType === 'order' && mouseEvent
            ? style.showDetailResult
            : style.noStyle
        }
      >
        <DetailResult
          finishCode={detail.finishCode}
          placedInDest={detail.placedInDest}
          orderNumber={detail.orderNumber}
          targetstatus={
            (detail?.cycleStatistics as { executed: Record<string, unknown>[] })
              ?.executed
          }
          status={detail.status}
          cycleElapsedProcessingTime={detail.cycleElapsedProcessingTime}
        />
      </div>
      {renderChild(detail)}
    </div>
  );
};

export default TableResult;
