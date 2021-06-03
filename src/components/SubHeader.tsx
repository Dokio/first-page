import React, { FC, useState } from "react";
import style from "./subHeader.module.less";

interface SubHeaderTab {
  name: string;
  checked: boolean;
  clickEvent: () => void;
}

enum SubHeaderNames {
  summary = "Summary",
  orderCycle = "Order cycle",
  signal = "Signal",
}

const SubHeader: FC = () => {
  const [subHeaderList, setSubHeaderList] = useState<SubHeaderTab[]>([
    {
      name: SubHeaderNames["summary"],
      checked: true,
      clickEvent: () => handleClickSummary(),
    },
    {
      name: SubHeaderNames["orderCycle"],
      checked: false,
      clickEvent: () => handleClickOrderCycle(),
    },
    {
      name: SubHeaderNames["signal"],
      checked: false,
      clickEvent: () => handleClickSignal(),
    },
  ]);

  const handleClickSummary = () => {
    console.log('ClickSummary');
  };
  const handleClickOrderCycle = () => {
    console.log('ClickOrderCycle');
  };
  const handleClickSignal = () => {
    console.log('ClickSignal');
  };

  const handleClick = (subHeaderElement: SubHeaderTab) => {
    setSubHeaderList(
      subHeaderList.map((subHeaderItem) => {
        return {
          ...subHeaderItem,
          checked: subHeaderItem.name === subHeaderElement.name,
        };
      })
    );
  };

  return (
    <div className={style.subheader}>
      {subHeaderList.map((subHeaderItem) => {
        return (
          <span
            key={subHeaderItem.name}
            className={subHeaderItem.checked ? style.checked : style.emptyStyle}
            onClick={() => [subHeaderItem.clickEvent(), handleClick(subHeaderItem)]}
          >
            {subHeaderItem.name}
          </span>
        );
      })}
    </div>
  );
};
export default SubHeader;
