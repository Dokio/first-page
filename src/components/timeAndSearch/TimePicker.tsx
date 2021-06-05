import { Button } from "antd";
import { Calendar, DatePicker } from "antd";
import { useState } from "react";
import { FC, Fragment } from "react";
import TimezoneSelect from "react-timezone-select";
import style from './timePicker.module.less';
import { Select } from 'antd';
import TimeZoneData from '../../test/timezone.json'


interface RelativeTimeProps {
  relativeTimeName: string;
  relativeNameChecked: boolean;
  handleClickRelativeTime: () => void;
}

interface RecentTimeProps {
  recentTimeName: string;
  recentNameChecked: boolean;
  handleClickRecentTime: () => void;
}

enum RelativeTimeNamesList {
  lastFiveMinutes = 'Last 5 minites',
  lastThirtyMinutes = 'Last 30 minites',
  lastOneHour = 'Last 1 hours',
  lastThreeHours = 'Last 3 hours',
  lastSixHours = 'Last 6 hours',
  lastTwelveHours = 'Last 12 hours',
  lastTwentyFourHours = 'Last 24 hours',
}

enum RecenTimeNamesList {
  recentTime1= '2021/01/11 00:00:00 to 2021/01/14 23:59:59',
  recentTime2 = '2021/04/08 10:00:00 to 2021/04/08 10:30:00',
  recentTime3 = '2021/08/15 10:00:00 to 2021/08/20 10:30:00',
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
              <RecentTime />
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
            <Option value="Coordinated" className="timezoneHeader">Coordinated Universal Time UTC, GMT</Option>
          </Fragment>

        </Select>,
      </div>
    </div>

  );
};

const RecentTime: FC = () => {
  const [recenTimeList, setRecenTimeList] = useState<RecentTimeProps[]>([
    {
      recentTimeName: RecenTimeNamesList['recentTime1'],
      recentNameChecked: false,
      handleClickRecentTime: () => handleClickRecentTime1(),
    },
    {
      recentTimeName: RecenTimeNamesList['recentTime2'],
      recentNameChecked: false,
      handleClickRecentTime: () => handleClickRecentTime2(),
    },
    {
      recentTimeName: RecenTimeNamesList['recentTime3'],
      recentNameChecked: false,
      handleClickRecentTime: () => handleClickRecentTime3(),
    },
    
  ]);

  const handleClickRecentTime1 = () =>{
    console.log('RecentTime1')
  }
  const handleClickRecentTime2 = () =>{
    console.log('RecentTime2')
  }
  const handleClickRecentTime3 = () =>{
    console.log('RecentTime3')
  }

  const handleSelectRecentTime = (recentTimeItem: RecentTimeProps) => {
    setRecenTimeList(
      recenTimeList.map((recentTimeElement) => {
        return {
          ...recentTimeElement,
          recentNameChecked: recentTimeElement.recentTimeName === recentTimeItem.recentTimeName,
        };
      })
    )

  }

  return (
    <div className={style['recent-time']}>
      <span>Recently used absoulte ranges</span>
      {
        recenTimeList.map((recentTimeElement)=>
          <span
            key={recentTimeElement.recentTimeName}
            onClick={()=>[recentTimeElement.handleClickRecentTime(),handleSelectRecentTime(recentTimeElement)]}
            className={recentTimeElement.recentNameChecked? style.checked:''}
          >
            {recentTimeElement.recentTimeName}
          </span>
        )
      }
    </div>
  );
};


const RelativeTime: FC = () => {
  const [relativeTimeList, setRelativeTimeList] = useState<RelativeTimeProps[]>([
    {
      relativeTimeName: RelativeTimeNamesList['lastFiveMinutes'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastFiveMinutes(),
    },
    {
      relativeTimeName: RelativeTimeNamesList['lastThirtyMinutes'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastThirtyMinutes(),
    },
    {
      relativeTimeName: RelativeTimeNamesList['lastOneHour'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastOneHour(),
    },
    {
      relativeTimeName: RelativeTimeNamesList['lastThreeHours'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastThreeHours(),
    },
    {
      relativeTimeName: RelativeTimeNamesList['lastSixHours'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastSixHours(),
    },
    {
      relativeTimeName: RelativeTimeNamesList['lastTwelveHours'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastTwelveHours(),
    },
    {
      relativeTimeName: RelativeTimeNamesList['lastTwentyFourHours'],
      relativeNameChecked: false,
      handleClickRelativeTime: () => handleClickLastTwentyFourHours(),
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
      relativeTimeList.map((relativeTimeElement) => {
        return {
          ...relativeTimeElement,
          relativeNameChecked: relativeTimeElement.relativeTimeName === relativeTimeItem.relativeTimeName,
        };
      })
    )
  }

  return (
    <div className={style['relative-time']}>
      <span>Relative Time Range</span>
      {
        relativeTimeList.map((relativeTimeElement) =>
          <span
            key={relativeTimeElement.relativeTimeName}
            onClick={()=>[relativeTimeElement.handleClickRelativeTime(), handleSelectRelativeTime(relativeTimeElement)]}
            className={relativeTimeElement.relativeNameChecked? style.checked:''}
          >
            {relativeTimeElement.relativeTimeName}
          </span>
        )
      }
    </div>
  );
};

export { TimeZone, TimePicker };
