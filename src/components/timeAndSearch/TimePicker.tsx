import { Button } from "antd";
import { Calendar, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { FC, Fragment } from "react";
import TimezoneSelect from "react-timezone-select";
import style from './timePicker.module.less';
import { Select } from 'antd';
import TimeZoneData from '../../test/timezone.json'
import moment from "moment";


const YEARMONTHDAY_START: number = 0;
const YEARMONTHDAY_END: number = 10;
const DAYHOURMINUTE_START: number = 11;
const DAYHOURMINUTE_END: number = 19;

interface RecentAndRelativeProps {
  setTimeValue: React.Dispatch<React.SetStateAction<any[]>>;
}

interface RelativeTimeProps {
  relativeTimeLabel: string;
  relativelabelChecked: boolean;
  timeScale: moment.unitOfTime.DurationConstructor;
  timeValue: number;
}

interface RecentTimeProps {
  recentTimeLabel: string;
  recentLabelChecked: boolean;
  recentTimeValue: string;
}


enum relativeTimeLabelsList {
  lastFiveMinutes = 'Last 5 minites',
  lastThirtyMinutes = 'Last 30 minites',
  lastOneHour = 'Last 1 hours',
  lastThreeHours = 'Last 3 hours',
  lastSixHours = 'Last 6 hours',
  lastTwelveHours = 'Last 12 hours',
  lastTwentyFourHours = 'Last 24 hours',
}
enum RelativeTimeScale {
  timeMinute = "minute",
  timeHour = "hour",
}

const { RangePicker } = DatePicker;

const TimePicker: FC = () => {
  const [timeValue, setTimeValue] = useState<any>([]) //timeValue={[moment('2015/01/01'), moment('2015/01/01')]}
  return (
    <div>
      <RangePicker
        value={timeValue}
        onChange={(selectedTimeValue) => setTimeValue(selectedTimeValue)}
        renderExtraFooter={() =>
          <Fragment>
            <TimeZone />
            <RecentAndRelative setTimeValue={setTimeValue} />

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
  //console.log(TimeZoneData)
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

export const RecentAndRelative: FC<RecentAndRelativeProps> = ({ setTimeValue }) => {
  ///////////////////////////////// Relative Time
  const [relativeTimeList, setRelativeTimeList] = useState<RelativeTimeProps[]>([
    {
      relativeTimeLabel: relativeTimeLabelsList['lastFiveMinutes'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeMinute'],
      timeValue: 5
    },
    {
      relativeTimeLabel: relativeTimeLabelsList['lastThirtyMinutes'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeMinute'],
      timeValue: 30
    },
    {
      relativeTimeLabel: relativeTimeLabelsList['lastOneHour'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeHour'],
      timeValue: 1
    },
    {
      relativeTimeLabel: relativeTimeLabelsList['lastThreeHours'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeHour'],
      timeValue: 3
    },
    {
      relativeTimeLabel: relativeTimeLabelsList['lastSixHours'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeHour'],
      timeValue: 6
    },
    {
      relativeTimeLabel: relativeTimeLabelsList['lastTwelveHours'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeHour'],
      timeValue: 12
    },
    {
      relativeTimeLabel: relativeTimeLabelsList['lastTwentyFourHours'],
      relativelabelChecked: false,
      timeScale: RelativeTimeScale['timeHour'],
      timeValue: 24
    },
  ]);

  const updateHistoryOnLocalSession = (relativeTimeItem: RelativeTimeProps) => {
    const selectedTime: string = JSON.stringify([moment().subtract(relativeTimeItem.timeValue, relativeTimeItem.timeScale), moment()])
    console.log(selectedTime)
    //const selectedTime: string = JSON.stringify([moment().subtract(1.5, 'months'), moment()])

    //得到loca session中存储的历史时间列表
    //[
    //	"[\"2021-06-06T04:34:07.766Z\",\"2021-06-06T04:39:07.766Z\"]",
    //	"[\"2021-06-05T04:39:07.290Z\",\"2021-06-06T04:39:07.290Z\"]",
    //  "[\"2021-05-17T04:39:06.792Z\",\"2021-06-06T04:39:06.792Z\"]"
    //]

    //const currentHistoryList: string[] = !localStorage.getItem('historyTimeList') ? [] : JSON.parse(localStorage.getItem('historyTimeList')!);
    let currentHistoryList: string[];
    if (typeof (localStorage.getItem('historyTimeList')) === "undefined" || localStorage.getItem('historyTimeList') === null) {
      currentHistoryList = ["[\"2021-06-06T04:34:07.766Z\",\"2021-06-06T04:39:07.766Z\"]"]
    } else {
      currentHistoryList = JSON.parse(localStorage.getItem('historyTimeList')!)
    }
    //currentHistoryList = ["[\"2021-06-06T04:34:07.766Z\",\"2021-06-06T04:39:07.766Z\"]"]

    //将选中的时间范围，放入loca session中存储的历史时间列表中
    //1.当将选中的时间范围在列表中已经存在，那就将存在的值过滤掉，然后合并选中的时间和处理后的列表
    //2.当选中时间不存在，那就直接合并选中的时间和处理后的列表，然后做切片操作
    if (currentHistoryList.some(currentHistoryListElement => currentHistoryListElement === selectedTime)) {
      //filter:把满足条件的留下来
      currentHistoryList = currentHistoryList.filter(currentHistoryListElement => currentHistoryListElement !== selectedTime)
      currentHistoryList = [selectedTime].concat(currentHistoryList)
    } else {
      currentHistoryList = [selectedTime].concat(currentHistoryList)
      currentHistoryList = currentHistoryList.slice(0, 3)
    }

    //最后更新local session
    localStorage.setItem('historyTimeList', JSON.stringify(currentHistoryList))
  }

  const handleSelectRelativeTime = (relativeTimeItem: RelativeTimeProps) => {
    setRelativeTimeList(
      relativeTimeList.map((relativeTimeElement) => {
        return {
          ...relativeTimeElement,
          relativelabelChecked: relativeTimeItem.relativeTimeLabel === relativeTimeElement.relativeTimeLabel,
        };
      })
    )

    setRecenTimeList(
      recentTimeList.map((recentTimeElement) => {
        return {
          ...recentTimeElement,
          recentNameChecked: false,
        };
      })
    )
    //2.将选中的值存储到local session中
    updateHistoryOnLocalSession(relativeTimeItem)

    ////1.让输入框显示的值为我们选中的值
    setTimeValue([moment().subtract(relativeTimeItem.timeValue, relativeTimeItem.timeScale), moment()])
  }

  ///////////////////////////////// Recent Time
  const [recentTimeList, setRecenTimeList] = useState<RecentTimeProps[]>([])

  // Every time When begin render, recent used time will get the history record from local session and renew the recenTimeList
  useEffect(() => {
    if (localStorage.getItem('historyTimeList')) {
      const historyTimeListString: string[] = JSON.parse(localStorage.getItem('historyTimeList')!);
      const historyTimeListStringParse: string[] = historyTimeListString.map(historyTimeItem => JSON.parse(historyTimeItem))
      setRecenTimeList(historyTimeListStringParse.map(historyTimeItem => ({
        recentTimeLabel: historyTimeItem[0].slice(YEARMONTHDAY_START, YEARMONTHDAY_END) + ' ' + historyTimeItem[0].slice(DAYHOURMINUTE_START, DAYHOURMINUTE_END) + ' to ' + historyTimeItem[1].slice(YEARMONTHDAY_START, YEARMONTHDAY_END) + ' ' + historyTimeItem[1].slice(DAYHOURMINUTE_START, DAYHOURMINUTE_END),
        recentLabelChecked: false,
        recentTimeValue: historyTimeItem,
      })))
      //console.log(localStorage.getItem('historyTimeList')!)
      //string: ["[\"2021-06-07T00:16:10.497Z\",\"2021-06-07T00:21:10.497Z\"]"]

      //console.log(historyTimeListString)
      //object; ["["2021-06-07T00:16:10.497Z","2021-06-07T00:21:10.497Z"]"]

      //console.log(historyTimeListStringParse)
      //object [["2021-06-07T00:16:10.497Z","2021-06-07T00:21:10.497Z"]]
    }
  }, [])
  // recentTimeLabel: string;
  // recentLabelChecked: boolean;
  // recentTimeValue: string;


  const handleSelectRecentTime = (recentTimeItem: RecentTimeProps) => {
    setRecenTimeList(recentTimeList.map(recentTimeElement => (
      {
        ...recentTimeElement,
        recentLabelChecked :recentTimeElement.recentTimeLabel === recentTimeItem.recentTimeLabel
      }
    )))

    setRelativeTimeList(relativeTimeList.map(relativeTimeElement => (
      {
        ...relativeTimeElement,
        relativelabelChecked:false,
      }
    )))


    //2.将选中的值存储到local session中
    //updateHistoryOnLocalSession(recentTimeItem)

    ////1.让输入框显示的值为我们选中的值
    //setTimeValue([moment().subtract(relativeTimeItem.timeValue, relativeTimeItem.timeScale), moment()])



  }

  return (
    <Fragment>
      <div className={style['recent-time']}>
        <span>Recently used absoulte ranges</span>
        {
          recentTimeList.map(recentTimeItem=>(
            <span
              key={recentTimeItem.recentTimeValue}
              className={recentTimeItem.recentLabelChecked ? style.checked : ''}
              onClick={() => [handleSelectRecentTime(recentTimeItem)]}
            >
              {recentTimeItem.recentTimeLabel}

            </span>
          ))
        }
        
      </div>
      <div className={style['relative-time']}>
        <span>Relative Time Range</span>
        {
          relativeTimeList.map((relativeTimeElement) =>
            <span
              key={relativeTimeElement.relativeTimeLabel}
              onClick={() => handleSelectRelativeTime(relativeTimeElement)}
              className={relativeTimeElement.relativelabelChecked ? style.checked : ''}
            >
              {relativeTimeElement.relativeTimeLabel}
            </span>
          )
        }
      </div>
    </Fragment>
  )

}



export { TimeZone, TimePicker };
