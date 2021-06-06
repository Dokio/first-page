import React, { useEffect, useState, FC, Fragment } from "react";
import { Calendar, DatePicker, Button, Select } from "antd";
import TimezoneSelect from "react-timezone-select";
import style from './timePicker.module.less';
import TimeZoneData from '../../test/timezone.json'
import moment from "moment";
import { any } from "prop-types";


interface RelativeTimeProps {
  setTimeValue: React.Dispatch<React.SetStateAction<any[]>>;
}

interface RelativeTimeElementProps {
  relativeTimeLabel: string;
  relativelabelChecked: boolean;
  timeScale: moment.unitOfTime.DurationConstructor;
  timeValue: number;
}


interface RecentTimeProps {
  recentTimeName: string;
  recentNameChecked: boolean;
  handleClickRecentTime: () => void;
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

enum RecenTimeNamesList {
  recentTime1 = '2021/01/11 00:00:00 to 2021/01/14 23:59:59',
  recentTime2 = '2021/04/08 10:00:00 to 2021/04/08 10:30:00',
  recentTime3 = '2021/08/15 10:00:00 to 2021/08/20 10:30:00',
}


const { RangePicker } = DatePicker;
const TimePicker: FC = () => {
  const [timeValue, setTimeValue] = useState<any>([]) //timeValue={[moment('2015/01/01'), moment('2015/01/01')]}
  // const [open, setOpen] = useState<boolean>(true);

  // useEffect(() => {
  //   const otherclick = () => {
  //     setOpen(false)
  //   }
  //   window.addEventListener("click", () => otherclick())
  //   return window.removeEventListener("click", otherclick)
  // }, [])//阻止冒泡 捕获

  return (
    <div>
      <RangePicker
        dropdownClassName="aaaaaaaaa"
        // open={open}
        value={timeValue}
        onChange={(selectedTimeValue) => setTimeValue(selectedTimeValue)}
        renderExtraFooter={() =>
          <Fragment>
            <TimeZone />
            <RecentAndRelative setTimeValue={setTimeValue} />

            <Button
            type="primary"
              // text="Apply time range"
              // variant="secondary"
              className={style['time-range-button']}
            >
              Apply time range
            </Button>
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
  // console.log(TimeZoneData)

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


  //为了只执行一次所以用useEffect

  // useEffect(() => {
  //   console.log(TimeZoneData.countries)
  //   let timeZoneContries: any[] = []
  //   for (let i in (TimeZoneData.countries as any)) {
  //     console.log((TimeZoneData.countries)[i])
  //     // timeZoneContries.push((TimeZoneData.countries)[i])
  //   }
  // }, [])

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
            {/* <Option value="Andorra">Europe/Andorra <span style={{color:"red"}}>Andorra</span></Option> */}
            {/* {
              TimeZoneData.map((v: any) => {
                return <Option value="Andorra">Europe/Andorra <span style={{ color: "red" }}>Andorra</span></Option>
              })
            } */}
          </Fragment>

        </Select>,
      </div>
    </div>

  );
};



export const RecentAndRelative: FC<RelativeTimeProps> = ({ setTimeValue }) => {
  /////////////////////////////////
  const [relativeTimeList, setRelativeTimeList] = useState<RelativeTimeElementProps[]>([
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

  //time history
  const [timeHistoryList, setTimeHistoryList] = useState<any[]>([])

  const updateHistoryOnLocalSession = (relativeTimeItem: RelativeTimeElementProps) => {
    const selectedTime: string = JSON.stringify([moment().subtract(relativeTimeItem.timeValue, relativeTimeItem.timeScale), moment()])
    //const selectedTime: string = JSON.stringify([moment().subtract(1.5, 'months'), moment()])

    //得到loca session中存储的历史时间列表
    //[
    //	"[\"2021-06-06T04:34:07.766Z\",\"2021-06-06T04:39:07.766Z\"]",
    //	"[\"2021-06-05T04:39:07.290Z\",\"2021-06-06T04:39:07.290Z\"]",
    //  "[\"2021-05-17T04:39:06.792Z\",\"2021-06-06T04:39:06.792Z\"]"
    //]

    //const currentHistoryList: string[] = !localStorage.getItem('history_time_list') ? [] : JSON.parse(localStorage.getItem('history_time_list')!);
    let currentHistoryList: string[];
    if (typeof (localStorage.getItem('history_time_list')) !== "undefined") {
      currentHistoryList = JSON.parse(localStorage.getItem('history_time_list')!)
      // console.log(currentHistoryList)
    } else {
      currentHistoryList = []
    }


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
    localStorage.setItem('history_time_list', JSON.stringify(currentHistoryList))

    console.log(timeHistoryList)
  }

  const handleSelectRelativeTime = (relativeTimeItem: RelativeTimeElementProps) => {
    setRelativeTimeList(
      relativeTimeList.map((relativeTimeElement) => {
        return {
          ...relativeTimeElement,
          relativelabelChecked: relativeTimeItem.relativeTimeLabel === relativeTimeElement.relativeTimeLabel,
        };
      })
    )

    setRecenTimeList(
      recenTimeList.map((recentTimeElement) => {
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


  /////////////////////////////////
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

  const handleClickRecentTime1 = () => {
    console.log('RecentTime1')
  }
  const handleClickRecentTime2 = () => {
    console.log('RecentTime2')
  }
  const handleClickRecentTime3 = () => {
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

  useEffect(() => {
    if ((localStorage.getItem('history_time_list'))) {
      const timeStr: string[] = JSON.parse(localStorage.getItem('history_time_list')!);
      // console.log(timeStr.map(v => JSON.parse(v)))
      setTimeHistoryList(timeStr.map(v => JSON.parse(v)))
    }

  }, [])

  return (
    <Fragment>
      <div className={style['recent-time']}>
        <span>Recently used absoulte ranges</span>
        {
          timeHistoryList.map((v, i) => {
            return (
              <span key={i}>
                {v[0]} to {v[1]}
              </span>
            )
          })
        }
        {/* {
          recenTimeList.map((recentTimeElement) =>
            <span
              key={recentTimeElement.recentTimeName}
              onClick={() => [recentTimeElement.handleClickRecentTime(), handleSelectRecentTime(recentTimeElement)]}
              className={recentTimeElement.recentNameChecked ? style.checked : ''}
            >
              {recentTimeElement.recentTimeName}
            </span>
          )
        } */}
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
