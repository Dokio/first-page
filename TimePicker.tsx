import { Button } from '@mujin/uicomponents';
import { Calendar, DatePicker } from 'antd';
import { useEffect, useState, ReactElement, useRef } from 'react';
import { FC, Fragment } from 'react';
import TimezoneSelect from 'react-timezone-select';
import style from './timePicker.module.less';
import { Select } from 'antd';
import 'moment-timezone';
import TimeZoneData from '../../test/timezone.json';
import moment, { Moment } from 'moment';
import type { RangeValue } from 'rc-picker/lib/interface.d';
import { updateHistoryOnLocalSession } from './common/updateHistoryOnLocalSession';
import { FilterParams } from '../../containers/LandingPage';

interface TimePickerProps {
  params: FilterParams;
  setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}
interface RecentAndRelativeProps {
  setTimeValue: React.Dispatch<React.SetStateAction<RangeValue<moment.Moment>>>;
}

interface CountryParams {
  countryName: string;
  countryZones: string[];
  countryAbbreviation: string;
  countryUtcOffset: string;
}

export interface RelativeTimeProps {
  relativeTimeLabel: string;
  relativelabelChecked: boolean;
  timeScale: moment.unitOfTime.DurationConstructor;
  timeValue: number;
}

export interface RecentTimeProps {
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
  timeMinute = 'minute',
  timeHour = 'hour',
}

const { RangePicker } = DatePicker;

const TimePicker: FC<TimePickerProps> = ({ params, setParams }) => {
  const [timeValue, setTimeValue] = useState<RangeValue<Moment>>([
    moment(),
    moment(),
  ]); //timeValue={[moment('2015/01/01'), moment('2015/01/01')]}

  const handleClickApplyTimeRange = () => {
    //1.update the historical record
    if (timeValue) {
      updateHistoryOnLocalSession(timeValue!);
    }

    //2.excute the search logic
    // let started = new Date(cycleStartProcessingTime * 1000).toISOString();
    // let ended = new Date(cycleFinishProcessingTime * 1000).toISOString();

    // const startInterval: number = moment(timeValue![0]).valueOf() / 1000;
    // const endInterval: number = moment(timeValue![1]).valueOf() / 1000;
    // console.log('startInterval, endInterval')
    // console.log(startInterval, endInterval)
    // setParams({
    //   ...params,
    //   cycleStartProcessingTime: startInterval,
    //   cycleFinishProcessingTime: endInterval
    // });

    //3.close the
    //setOpen(false)
  };

  return (
    <div>
      <RangePicker
        //open={true}
        value={timeValue} //?? [moment(), moment()]
        // onChange={(selectedTimeValue) => {
        //   console.log('rangepicker onChange', selectedTimeValue);
        //   setTimeValue(selectedTimeValue);
        // }}

        panelRender={originPanel => {
          if (typeof originPanel === 'object') {
            const rangedValue = (originPanel as ReactElement).props.children[0]
              .props.children.props.value.rangedValue;
            console.log(rangedValue[0].format(), rangedValue[1].format());
            if (
              !timeValue![0]!.isSame(rangedValue[0]) ||
              !timeValue![1]!.isSame(rangedValue[1])
            ) {
              setTimeValue([rangedValue[0], rangedValue[1]]);
            }
          }
          return originPanel;
        }}
        renderExtraFooter={() => (
          <Fragment>
            <TimeZone />
            <RecentAndRelative setTimeValue={setTimeValue} />

            <Button
              text="Apply time range"
              variant="secondary"
              className={style['time-range-button']}
              onClick={() => handleClickApplyTimeRange()}
            />
          </Fragment>
        )}
        showTime
        showNow={false}
        inputReadOnly={false}
        popupStyle={{ height: '1000px', width: '800px' }}
      />
    </div>
  );
};

const TimeZone: FC = () => {
  //console.log(TimeZoneData.countries.AD)
  const [countryInformationList, setCountryInformationList] = useState<
    CountryParams[]
  >([
    {
      countryName: 'country.name',
      countryZones: ['country.zones'],
      countryAbbreviation: 'countryAbbreviation',
      countryUtcOffset: 'countryOffsetTemp.utcOffsetStr',
    },
  ]);
  useEffect(() => {
    let countryInformationListTemp: CountryParams[] = [];
    const countryAndTimezones = require('countries-and-timezones');
    for (const country of Object.values(TimeZoneData.countries)) {
      const countryOffsetTemp: { utcOffsetStr: string } =
        countryAndTimezones.getTimezone(country.zones[0]);
      countryInformationListTemp.push({
        countryName: country.name,
        countryZones: country.zones,
        countryAbbreviation: moment.tz(country.zones[0]).zoneAbbr(), // PST
        countryUtcOffset: countryOffsetTemp.utcOffsetStr,
      });
    }

    console.log(
      'countryAndTimezones',
      countryAndTimezones.getTimezone(['America/Port_of_Spain']),
    );
    //const countryAndTimezones = require('countries-and-timezones');
    //const countryOffsetTemp: {utcOffsetStr:string}= countryAndTimezones.getTimezone(["America/Port_of_Spain", "America/Antigua"])
    //["America/Port_of_Spain", "America/Antigua"]
    console.log(countryInformationListTemp);
    setCountryInformationList(countryInformationListTemp);
  }, []);
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
      <div>
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
            option?.value?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Fragment>
            <Option value="Default">Default Japan, JST</Option>
            <Option value="Browser">Browser Time Japan, JST</Option>
            <Option value="Coordinated" className="timezoneHeader">
              Coordinated Universal Time UTC, GMT
            </Option>

            {countryInformationList.map(countryItem => (
              <Option
                key={countryItem.countryName}
                value={
                  countryItem.countryZones[0] +
                  countryItem.countryName +
                  countryItem.countryAbbreviation +
                  countryItem.countryUtcOffset
                }
              >
                <div className={style['timeZoneText']}>
                  <span>
                    <span className={style['countryZones']}>
                      {countryItem.countryZones[0]}
                    </span>
                    <span className={style['countryName']}>
                      {countryItem.countryName},{' '}
                      {countryItem.countryAbbreviation}
                    </span>
                  </span>
                  {/* <span className={style['countryAbbreviation']}>{countryItem.countryAbbreviation}</span> */}
                  <span className={style['countryUtcOffset']}>
                    UTC {countryItem.countryUtcOffset}
                  </span>
                </div>
              </Option>
              //, {countryItem.countryAbbreviation}, {countryItem.countryUtcOffset}
            ))}
          </Fragment>
        </Select>
        ,
      </div>
    </div>
  );
};

export const RecentAndRelative: FC<RecentAndRelativeProps> = ({
  setTimeValue,
}) => {
  ///////////////////////////////// Relative Time
  const [relativeTimeList, setRelativeTimeList] = useState<RelativeTimeProps[]>(
    [
      {
        relativeTimeLabel: relativeTimeLabelsList['lastFiveMinutes'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeMinute'],
        timeValue: 5,
      },
      {
        relativeTimeLabel: relativeTimeLabelsList['lastThirtyMinutes'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeMinute'],
        timeValue: 30,
      },
      {
        relativeTimeLabel: relativeTimeLabelsList['lastOneHour'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeHour'],
        timeValue: 1,
      },
      {
        relativeTimeLabel: relativeTimeLabelsList['lastThreeHours'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeHour'],
        timeValue: 3,
      },
      {
        relativeTimeLabel: relativeTimeLabelsList['lastSixHours'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeHour'],
        timeValue: 6,
      },
      {
        relativeTimeLabel: relativeTimeLabelsList['lastTwelveHours'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeHour'],
        timeValue: 12,
      },
      {
        relativeTimeLabel: relativeTimeLabelsList['lastTwentyFourHours'],
        relativelabelChecked: false,
        timeScale: RelativeTimeScale['timeHour'],
        timeValue: 24,
      },
    ],
  );

  const handleSelectRelativeTime = (relativeTimeItem: RelativeTimeProps) => {
    setRelativeTimeList(
      relativeTimeList.map(relativeTimeElement => {
        return {
          ...relativeTimeElement,
          relativelabelChecked:
            relativeTimeItem.relativeTimeLabel ===
            relativeTimeElement.relativeTimeLabel,
        };
      }),
    );

    setRecenTimeList(
      recentTimeList.map(recentTimeElement => ({
        ...recentTimeElement,
        recentLabelChecked: false,
      })),
    );
    //2.将选中的值存储到local session中
    //updateHistoryOnLocalSession(relativeTimeItem)

    // rencent time change
    // if (localStorage.getItem('historyTimeList')) {
    //   const historyTimeListString: string[] = JSON.parse(localStorage.getItem('historyTimeList')!);
    //   const historyTimeListStringParse: string[] = historyTimeListString.map(historyTimeItem => JSON.parse(historyTimeItem))
    //   setRecenTimeList(historyTimeListStringParse.map(historyTimeItem => ({
    //     recentTimeLabel: moment(historyTimeItem[0]).format('YYYY-MM-DD-HH:mm:ss') + " to " + moment(historyTimeItem[1]).format('YYYY-MM-DD-HH:mm:ss'),
    //     recentLabelChecked: false,
    //     recentTimeValue: historyTimeItem,
    //   })))
    // }

    ////3.让输入框显示的值为我们选中的值
    setTimeValue([
      moment().subtract(relativeTimeItem.timeValue, relativeTimeItem.timeScale),
      moment(),
    ]);
  };

  ///////////////////////////////// Recent Time
  const [recentTimeList, setRecenTimeList] = useState<RecentTimeProps[]>([]);

  // Every time When begin render, recent used time will get the history record from local session and renew the recenTimeList
  useEffect(() => {
    if (localStorage.getItem('historyTimeList')) {
      const historyTimeListString: string[] = JSON.parse(
        localStorage.getItem('historyTimeList')!,
      );
      const historyTimeListStringParse: string[] = historyTimeListString.map(
        historyTimeItem => JSON.parse(historyTimeItem),
      );
      setRecenTimeList(
        historyTimeListStringParse.map(historyTimeItem => ({
          recentTimeLabel:
            moment(historyTimeItem[0]).format('YYYY-MM-DD-HH:mm:ss') +
            ' to ' +
            moment(historyTimeItem[1]).format('YYYY-MM-DD-HH:mm:ss'),
          recentLabelChecked: false,
          recentTimeValue: historyTimeItem,
        })),
      );
      //console.log(localStorage.getItem('historyTimeList')!)
      //string: ["[\"2021-06-07T00:16:10.497Z\",\"2021-06-07T00:21:10.497Z\"]"]

      //console.log(historyTimeListString)
      //object; ["["2021-06-07T00:16:10.497Z","2021-06-07T00:21:10.497Z"]"]

      //console.log(historyTimeListStringParse)
      //object [["2021-06-07T00:16:10.497Z","2021-06-07T00:21:10.497Z"]]
    }
  }, []);

  const handleSelectRecentTime = (recentTimeItem: RecentTimeProps) => {
    setRecenTimeList(
      recentTimeList.map(recentTimeElement => ({
        ...recentTimeElement,
        recentLabelChecked:
          recentTimeElement.recentTimeLabel === recentTimeItem.recentTimeLabel,
      })),
    );

    setRelativeTimeList(
      relativeTimeList.map(relativeTimeElement => ({
        ...relativeTimeElement,
        relativelabelChecked: false,
      })),
    );
    console.log('recent onChange', [
      moment(recentTimeItem.recentTimeValue[0]),
      moment(recentTimeItem.recentTimeValue[1]),
    ]);

    //2.将选中的值存储到local session中
    //updateHistoryOnLocalSession(recentTimeItem)

    // 1.让输入框显示的值为我们选中的值
    // console.log("turn string into moment")
    // console.log(moment(recentTimeItem.recentTimeValue))
    setTimeValue([
      moment(recentTimeItem.recentTimeValue[0]),
      moment(recentTimeItem.recentTimeValue[1]),
    ]);
  };

  return (
    <Fragment>
      <div className={style['recent-time']}>
        <span>Recently used absoulte ranges</span>
        {recentTimeList.map(recentTimeItem => (
          <span
            key={recentTimeItem.recentTimeValue}
            className={recentTimeItem.recentLabelChecked ? style.checked : ''}
            onClick={() => [handleSelectRecentTime(recentTimeItem)]}
          >
            {recentTimeItem.recentTimeLabel}
          </span>
        ))}
      </div>
      <div className={style['relative-time']}>
        <span>Relative Time Range</span>
        {relativeTimeList.map(relativeTimeElement => (
          <span
            key={relativeTimeElement.relativeTimeLabel}
            onClick={() => handleSelectRelativeTime(relativeTimeElement)}
            className={
              relativeTimeElement.relativelabelChecked ? style.checked : ''
            }
          >
            {relativeTimeElement.relativeTimeLabel}
          </span>
        ))}
      </div>
    </Fragment>
  );
};

export { TimeZone, TimePicker };
