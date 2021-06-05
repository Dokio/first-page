/*
 * @Descripttion: TimeZone component is included in TimePicker component
 * @Author: Wei
 * @Date: 2021-05-03 23:24:09
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-28 15:01:20
 * @FilePath: /play-back/src/components/timeAndSearch/TimePicker.tsx
 */
// import { Button } from "@mujin/uicomponents";
import { Calendar, DatePicker,Button } from "antd";
import { useState } from "react";
import { FC, Fragment } from "react";
import TimezoneSelect from "react-timezone-select";
import style from './timePicker.module.less';
import { Select } from 'antd';
import TimeZoneData from '../../test/timezone.json'


interface RelativeTimeProps {
  name: string;
  checked: boolean;
  handleFun: () => void;
}
enum RelativeTimeNames {
  lastFiveMinutes = 'Last 5 minites',
  lastThirtyMinutes = 'Last 30 minites',
  lastOneHour = 'Last 1 hours',
  lastThreeHours = 'Last 3 hours',
  lastSixHours = 'Last 6 hours',
  lastTwelveHours = 'Last 12 hours',
  lastTwentyFourHours = 'Last 24 hours',
}

const { RangePicker } = DatePicker;
const TimePicker: FC = () => {
  return (
    <div>
      <RangePicker
        renderExtraFooter={() =>
          <Fragment>
            <div style={{ display: 'flex' }}>
              <TimeZone />
              <RecentlyTime />
            </div>

            <RelativeTime />
            {/* <Button
              text="Apply time range"
              variant="secondary"
              className={style['time-range-button']}
            /> */}
          </Fragment>
        }
        showTime
        showNow={false}
        inputReadOnly={true}
        popupStyle={{ height: "1000px", width: "800px" }}
      />
    </div>
  );
};


const TimeZone: FC = () => {
  console.log(TimeZoneData)
  const { Option } = Select;

  function onChange(value: any) {
    console.log(`selected ${value}`);
  }
  function onFocus() {
    console.log('focus');
  }
  function onBlur() {
    console.log('blur');
  }
  function onSearch(val: any) {
    console.log('search:', val);
  }
  return (
    <div className={style['time-zone-box']}>
      <span>Time zone</span>
      <div >
        <Select
          className={style['timezone-selector']}
          dropdownClassName="myTimezoneDropdown"
          showSearch
          style={{ width: 200 }}
          placeholder="Browser Time Japan, JST UTC + 09:00"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Fragment>
            <Option value="Default">Default Japan, JST</Option>
            <Option value="Browser">Browser Time Japan, JST</Option>
            <Option value="Coordinated" className="timezoneHeader">Coordinated Universal Time UTC, GMT</Option>S
          </Fragment>

        </Select>,
      </div>
    </div>

  );
};

const RecentlyTime: FC = () => {
  return (
    <div className={style['recently-time']}>
      <span>Recently used absoulte ranges</span>
      <span>2021/01/11 00:00:00 to 2021/01/14 23:59:59</span>
      <span>2021/04/08 10:00:00 to 2021/04/08 10:30:00</span>
      <span>2021/08/15 10:00:00 to 2021/08/20 10:30:00</span>
    </div>

  );
};


const RelativeTime: FC = () => {
  const [RelativeTimeList, setRelativeTimeList] = useState<RelativeTimeProps[]>([
    {
      name: RelativeTimeNames['lastFiveMinutes'],
      checked: false,
      handleFun: () => handleClickLastFiveMinutes(),
    },
    {
      name: RelativeTimeNames['lastThirtyMinutes'],
      checked: false,
      handleFun: () => handleClickLastThirtyMinutes(),
    },
    {
      name: RelativeTimeNames['lastOneHour'],
      checked: false,
      handleFun: () => handleClickLastOneHour(),
    },
    {
      name: RelativeTimeNames['lastThreeHours'],
      checked: false,
      handleFun: () => handleClickLastThreeHours(),
    },
    {
      name: RelativeTimeNames['lastSixHours'],
      checked: false,
      handleFun: () => handleClickLastSixHours(),
    },
    {
      name: RelativeTimeNames['lastTwelveHours'],
      checked: false,
      handleFun: () => handleClickLastTwelveHours(),
    },
    {
      name: RelativeTimeNames['lastTwentyFourHours'],
      checked: false,
      handleFun: () => handleClickLastTwentyFourHours(),
    },
  ]);
  const handleClickLastFiveMinutes = () => {
    console.log('lastFiveMinutes')
  }
  const handleClickLastThirtyMinutes = () => {
    console.log('lastThirtyMinutes')
  }
  const handleClickLastOneHour = () => {
    console.log('lastOneHour')
  }
  const handleClickLastThreeHours = () => {
    console.log('lastThreeHours')
  }
  const handleClickLastSixHours = () => {
    console.log('lastSixHours')
  }
  const handleClickLastTwelveHours = () => {
    console.log('lastTwelveHours')
  }
  const handleClickLastTwentyFourHours = () => {
    console.log('lastTwentyFourHours')
  }
  const handleSelectRelativeTime = (relativeTimeItem: RelativeTimeProps) => {
    setRelativeTimeList(
      RelativeTimeList.map((relativeTimeElement) => {
        return {
          ...relativeTimeElement,
          checked: relativeTimeElement.name === relativeTimeItem.name,
        };
      })
    )
  }

  return (
    <div className={style['relative-time']}>
      <span>Relative Time Range</span>
      {
        RelativeTimeList.map((relativeTimeElement) =>
          <span
            key={relativeTimeElement.name}
            onClick={()=>[relativeTimeElement.handleFun(), handleSelectRelativeTime(relativeTimeElement)]}
            className={relativeTimeElement.checked? style.checked:''}
          >
            {relativeTimeElement.name}
          </span>
        )
      }
    </div>
  );
};

export { TimeZone, TimePicker };
