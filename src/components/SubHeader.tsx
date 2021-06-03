/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-05-01 16:23:44
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-20 10:41:03
 * @FilePath: /finalversion-for-playback/src/pages/playBack/component/SubHeader.tsx
 */
import { FC, useState } from "react";
import style from "./subHeader.module.less";

interface SubHeaderTab {
  name: string;
  checked: boolean;
  fun: () => void;
}

enum E_TAB {
  summary = "Summary",
  orderCycle = "Order cycle",
  signal = "Signal",
}

const SubHeader: FC = () => {
  const [tab, setTab] = useState<SubHeaderTab[]>([
    {
      name: E_TAB["summary"],
      checked: true,
      fun: () => handleCLickSummary(),
    },
    {
      name: E_TAB["orderCycle"],
      checked: false,
      fun: () => handleCLickOrderCycle(),
    },
    {
      name: E_TAB["signal"],
      checked: false,
      fun: () => handleCLickSignal(),
    },
  ]);

  const handleCLickSummary = () => {
    console.log(1);
  };
  const handleCLickOrderCycle = () => {
    console.log(2);
  };
  const handleCLickSignal = () => {
    console.log(3);
  };

  const handleClick = (v: SubHeaderTab) => {
    setTab(
      tab.map((item) => {
        return {
          ...item,
          checked: item.name === v.name,
        };
      })
    );
  };

  return (
    <div className={style.subheader}>
      {tab.map((v) => {
        return (
          <span
            key={v.name}
            className={v.checked ? style.checked : ""}
            onClick={() => [v.fun(), handleClick(v)]}
          >
            {v.name}
          </span>
        );
      })}
    </div>
  );
};
export default SubHeader;
