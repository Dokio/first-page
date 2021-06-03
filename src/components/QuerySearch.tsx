import React, { FC, useState } from "react";
import style from "./querySearch.module.less";
import { Dropdown } from "antd";
import { Button, Icons } from "@mujin/uicomponents";
import { FilterProps } from "../containers/LandingPage";
import FilterSearch from "./timeAndSearch/FilterSearch";
import { TimeZone } from "./timeAndSearch/TimePicker";

interface NavigationTab {
  name: string;
  checked: boolean;
  clickEvent: () => void;
  iconChecked: JSX.Element;
  iconNotChecked: JSX.Element;
}

enum NavigationNames {
  timeline = "Timeline",
  list = "List",
}

interface FilterParams {
  cycleTypes: string[];
  cycleIndexCheckBox: boolean;
  cycleIndexInput: string;
  finishCodeCheckBox: boolean;
  finishCodeInput: string;
  groupIdCheckBox: boolean;
  groupIdInput: string;
  partTypeCheckBox: boolean;
  partTypeInput: string;
}


const QuerySearch: FC<FilterProps> = (filterSearchProps) => {
  const { filterSearchParams } = filterSearchProps;
  const [navigationList, setNavigationList] = useState<NavigationTab[]>([
    {
      name: NavigationNames["timeline"],
      checked: true,
      clickEvent: () => handleClickTimeline(),
      iconChecked: (
        <Icons.ListView className={style.mujinIcon} primaryColor={"#FF5C33"} />
      ),
      iconNotChecked: (
        <Icons.ListView className={style.mujinIcon} primaryColor={"#7F8392"} />
      ),
    },
    {
      name: NavigationNames["list"],
      checked: false,
      clickEvent: () => handleClickList(),
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

  const handleClick = (navigationElement: NavigationTab) => {
    setNavigationList(
      navigationList.map((navigationItem) => {
        return {
          ...navigationItem,
          checked: navigationItem.name === navigationElement.name,
        };
      })
    );
  };

  // FilterProps.params
  const renderChild = (filterInformation: FilterParams) => {
    if (
      filterInformation.cycleTypes.length ||
      filterInformation.cycleIndexInput ||
      filterInformation.groupIdInput ||
      filterInformation.finishCodeInput
    ) {
      return (
        <div className={style.queryInformation}>
          {filterInformation.cycleTypes.length ? (
            <div className={style.informationItem}>
              <span>Type : </span>
              {filterInformation.cycleTypes.length === 3 ? (
                <span>
                  {filterInformation.cycleTypes[0]}, {filterInformation.cycleTypes[1]},{" "}
                  {filterInformation.cycleTypes[2]}
                </span>
              ) : (
                <span>
                  {filterInformation.cycleTypes.length === 2 ? (
                    <span>
                      {filterInformation.cycleTypes[0]}, {filterInformation.cycleTypes[1]}
                    </span>
                  ) : (
                    <span>{filterInformation.cycleTypes}</span>
                  )}
                </span>
              )}
            </div>
          ) : null}

          {filterInformation.finishCodeInput ? (
            <div className={style.informationItem}>
              <span>Code finish : </span>
              <span>{filterInformation.finishCodeInput}</span>
            </div>
          ) : null}

          {filterInformation.groupIdInput ? (
            <div className={style.informationItem}>
              <span>Group ID : </span>
              <span>{filterInformation.groupIdInput}</span>
            </div>
          ) : null}

          {filterInformation.cycleIndexInput ? (
            <div className={style.informationItem}>
              <span>CycleIndex : </span>
              <span>{filterInformation.cycleIndexInput}</span>
            </div>
          ) : null}

          {filterInformation.partTypeInput ? (
            <div className={style.informationItem}>
              <span>PartType : </span>
              <span>{filterInformation.partTypeInput}</span>
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
            <div className={style.iconBorder}>
              <Icons.CaretDownOutlined
                className={style.mujinLeftIcon}
                primaryColor={"#7F8392"}
              />
            </div>

            <div className={style.timezoneBorder}>
              <TimeZone />
            </div>

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

            <Dropdown overlay={<FilterSearch {...filterSearchProps} />} trigger={["click"]}>
              <div className={style.filterButton}>
                <Button
                  onClick={function noRefCheck() {}}
                  text={"Filters"}
                  variant="secondary"
                  icon={<Icons.FilterFilled primaryColor={"#7F8392"} />}
                  className={style.iconFilter}
                />
              </div>
            </Dropdown>
          </div>
        </div>
        {renderChild(filterSearchParams)}
      </div>

      <div className={style.querySignal}>
        {navigationList.map((navigationItem) => {
          return (
            <div
              className={style.querySignalButton}
              key={navigationItem.name}
              onClick={() => [navigationItem.clickEvent(), handleClick(navigationItem)]}
            >
              {navigationItem.checked ? navigationItem.iconChecked : navigationItem.iconNotChecked}
              <p
                className={navigationItem.checked ? style.checked : ""}
              >
                {navigationItem.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default QuerySearch;
