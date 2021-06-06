import { Button } from "antd";
import { Calendar, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { FC, Fragment } from "react";
import TimezoneSelect from "react-timezone-select";
import style from './timePicker.module.less';
import { Select } from 'antd';
import TimeZoneData from '../../test/timezone.json'

// 伪代码
import moment from "moment";


const TIMELIST = [
  {
    name: '最近5分钟',
    value: 5,
    level: 'minute'
  },
  {
    name: '最近1天',
    value: 1,
    level: 'day'
  },
  {
    name: '最近20tian',
    value: 20,
    level: 'day'
  }
]


interface RecentTimeProps {
  recentTimeName: string;
  recentNameChecked: boolean;
  handleClickRecentTime: () => void;
}


enum RecenTimeNamesList {
  recentTime1 = '2021/01/11 00:00:00 to 2021/01/14 23:59:59',
  recentTime2 = '2021/04/08 10:00:00 to 2021/04/08 10:30:00',
  recentTime3 = '2021/08/15 10:00:00 to 2021/08/20 10:30:00',
}


const { RangePicker } = DatePicker;

const TimePicker: FC = () => {

  const [timeValue, setTimeValue] = useState<any>([])

  // 变暗
  const [dark, setDark] = useState<boolean>(false)

  // 点击时间历史记录

  return (
    <div>
      <RangePicker
        value={timeValue}
        onChange={(val) => setTimeValue(val)} //数据更新->视图更新  react机制，绑定value（人工定义）后，进行视图显示，修改value->视图更新，
        renderExtraFooter={() =>
          <Fragment>
            <div style={{ display: 'flex' }}>
              <TimeZone />
              <RecentTime dark={dark} />
            </div>

            <RelativeTime
              setTimeValue={setTimeValue} />
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

interface IRecentTimeProps {
  dark: boolean;
}

const RecentTime: FC<IRecentTimeProps> = ({ dark }) => {

  const [historyList, setHistoryList] = useState<any[]>([
    {
      lable: '2019-19-21 12:12:12',
      checked: false
    },
    {
      lable: '2019-19-21 12:12:12',
      checked: false
    }
  ])

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
    console.log(localStorage.getItem('history_time_list'))
  }, [])


  useEffect(() => {
    if (dark) {
      setHistoryList(i => {
        return i.map(v => {
          return {
            ...v,
            checked: false
          }
        })
      })
    }
  }, [dark])

  return (
    <div className={style['recent-time']}>
      <span>Recently used absoulte ranges</span>
      {
        recenTimeList.map((recentTimeElement) =>
          <span
            key={recentTimeElement.recentTimeName}
            onClick={() => [recentTimeElement.handleClickRecentTime(), handleSelectRecentTime(recentTimeElement)]}
            className={recentTimeElement.recentNameChecked ? style.checked : ''}
          >
            {recentTimeElement.recentTimeName}
          </span>
        )
      }
    </div>
  );
};

interface IRelativeTimeProps {
  setTimeValue: React.Dispatch<React.SetStateAction<any[]>>
}

const RelativeTime: FC<IRelativeTimeProps> = ({ setTimeValue }) => {
  // 伪代码
  const handleTimeClick = (v: any) => {
    setTimeValue([moment().subtract(v.value, v.level), moment()]);

    const selectedTime: string = JSON.stringify([moment().subtract(v.value, v.level), moment()])

    // 伪代码
    const times: string[] = !localStorage.getItem('history_time_list') ? [] : JSON.parse(localStorage.getItem('history_time_list')!);

    // 判断当前点击的时间是否在里面
    // some() 判断数组李米娜是否有某个值，有的话返回一个true， 没有返回false
    if (times.some(v => v === selectedTime)) {
      localStorage.setItem('history_time_list', JSON.stringify([selectedTime].concat(times.filter(v => v !== selectedTime)))) //头部插入  //v !== selectedTime)把不等于的留下来
    } else {
      console.log('进行')
      localStorage.setItem('history_time_list', JSON.stringify([selectedTime].concat(times).slice(0, 3))) //头部插入
    }
  }

  return (
    <div className={style['relative-time']}>
      <span>Relative Time Range</span>
      {
        TIMELIST.map(v => {
          return <span key={v.value} onClick={() => handleTimeClick(v)}>{v.name}</span>
        })
      }
      {/* {
        relativeTimeList.map((relativeTimeElement) =>
          <span
            key={relativeTimeElement.relativeTimeName}
            onClick={()=>[relativeTimeElement.handleClickRelativeTime(), handleSelectRelativeTime(relativeTimeElement)]}
            className={relativeTimeElement.relativeNameChecked? style.checked:''}
          >
            {relativeTimeElement.relativeTimeName}
          </span>
        )
      } */}
    </div>
  );
};

export { TimeZone, TimePicker };
