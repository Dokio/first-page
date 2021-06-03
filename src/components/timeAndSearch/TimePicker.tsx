import React, { FC } from "react";
import { useState } from "react";
import TimezoneSelect from "react-timezone-select";
import style from "./timePicker.module.less";

const TimeZone: FC = () => {
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return (
    <div className={style.timeZone}>
      <div className="select-wrapper">
        <TimezoneSelect value={timezone} onChange={setTimezone} />
      </div>
    </div>
  );
};
const TimePicker: FC = () => {
  return (
    <div>
      <p>Time Picker</p>
    </div>
  );
};
export { TimeZone };
export default TimePicker;
