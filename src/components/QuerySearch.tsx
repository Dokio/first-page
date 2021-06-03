/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-05-01 16:26:22
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-28 09:16:28
 * @FilePath: /play-back/src/components/QuerySearch.tsx
 */
import { FC, useState } from "react";
import style from "./querySearch.module.less";
import { Dropdown } from "antd";
import { Button, Icons } from "@mujin/uicomponents";
import { FilterProps } from "../containers/LandingPage";
import FilterSearch from "./timeAndSearch/FilterSearch";
import { TimePicker } from "./timeAndSearch/TimePicker";

interface QuerySearchTab {
  name: string;
  checked: boolean;
  fun: () => void;
  iconChecked: any;
  iconNotChecked: any;
}

enum E_TAB {
  timeline = "Timeline",
  list = "List",
}
const QuerySearch: FC<FilterProps> = (props) => {
  const { params } = props;
  const [tab, setTab] = useState<QuerySearchTab[]>([
    {
      name: E_TAB["timeline"],
      checked: true,
      fun: () => handleClickTimeline(),
      iconChecked: (
        <Icons.ListView className={style.mujinIcon} primaryColor={"#FF5C33"} />
      ),
      iconNotChecked: (
        <Icons.ListView className={style.mujinIcon} primaryColor={"#7F8392"} />
      ),
    },
    {
      name: E_TAB["list"],
      checked: false,
      fun: () => handleClickList(),
      iconChecked: (
        <Icons.TimelineOutlined
          className={style.mujinIcon}
          primaryColor={"#FF5C33"}
        />
      ),
      iconNotChecked: (
        <Icons.TimelineOutlined
          className={style.mujinIcon}
          primaryColor={"#7F8392"}
        />
      ),
    },
  ]);

  const handleClickTimeline = () => {
    console.log("Click Timeline");
  };

  const handleClickList = () => {
    console.log("Click List");
  };

  const handleClick = (v: QuerySearchTab) => {
    setTab(
      tab.map((item) => {
        return {
          ...item,
          checked: item.name === v.name,
        };
      })
    );
  };

  const renderChild = (params: any) => {
    if (
      params.cycleTypes.length ||
      params.cycleIndexInput ||
      params.groupIdInput ||
      params.finishCodeInput
    ) {
      return (
        <div className={style.queryInformation}>
          {params.cycleTypes.length ? (
            <div className={style.informationItem}>
              <span>Type : </span>
              {params.cycleTypes.length === 3 ? (
                <span>
                  {params.cycleTypes[0]}, {params.cycleTypes[1]},{" "}
                  {params.cycleTypes[2]}
                </span>
              ) : (
                <span>
                  {params.cycleTypes.length === 2 ? (
                    <span>
                      {params.cycleTypes[0]}, {params.cycleTypes[1]}
                    </span>
                  ) : (
                    <span>{params.cycleTypes}</span>
                  )}
                </span>
              )}
            </div>
          ) : null}

          {params.finishCodeInput ? (
            <div className={style.informationItem}>
              <span>Code finish : </span>
              <span>{params.finishCodeInput}</span>
            </div>
          ) : null}

          {params.groupIdInput ? (
            <div className={style.informationItem}>
              <span>Group ID : </span>
              <span>{params.groupIdInput}</span>
            </div>
          ) : null}

          {params.cycleIndexInput ? (
            <div className={style.informationItem}>
              <span>CycleIndex : </span>
              <span>{params.cycleIndexInput}</span>
            </div>
          ) : null}

          {params.partTypeInput ? (
            <div className={style.informationItem}>
              <span>PartType : </span>
              <span>{params.partTypeInput}</span>
            </div>
          ) : null}
        </div>
      );
    }
  };

  return (
    <div className={style.query}>
      <div className={style.queryTimeRange}>
        <div className={style.pAndItems}>
          <p>Date and time range:</p>
          <div className={style.queryTimeRangeItems}>
            {/* <TimePicker /> */}

            <div className={style.iconBorder}>
              <Icons.CaretDownOutlined
                className={style.mujinLeftIcon}
                primaryColor={"#7F8392"}
              />
            </div>

            {/* <div className={style.timezoneBorder}> */}
              <TimePicker />
            {/* </div> */}

            <div className={style.iconBorder}>
              <Icons.CaretDownOutlined
                className={style.mujinRightIcon}
                primaryColor={"#7F8392"}
              />
            </div>

            <div className={style.iconBorder2}>
              <Icons.ZoomOutOutlined
                className={style.mujinIcon}
                primaryColor={"#7F8392"}
              />
            </div>

            <div className={style.iconBorder2}>
              <Icons.RefreshOutlined
                className={style.mujinIcon}
                primaryColor={"#7F8392"}
              />
            </div>

            <Dropdown overlay={<FilterSearch {...props} />} trigger={["click"]}>
              <div className={style.filterButton}>
                <Button
                  onClick={function noRefCheck() {}}
                  text={"Filters"}
                  variant="secondary"
                  icon={<Icons.FilterFilled primaryColor={"#7F8392"} />}
                  style={{ backgroundColor: "#000000", borderRadius: "2px" }}
                />
              </div>
            </Dropdown>
          </div>
        </div>

        {renderChild(params)}
      </div>

      <div className={style.querySignal}>
        {tab.map((v, i) => {
          return (
            <div
              className={style.querySignalButton}
              key={i}
              onClick={() => [v.fun(), handleClick(v)]}
            >
              {v.checked ? v.iconChecked : v.iconNotChecked}

              <p
                key={v.name}
                className={v.checked ? style.checked : ""}
                //onClick={() => [(v.fun)(), handleClick(v)]}
              >
                {v.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default QuerySearch;
