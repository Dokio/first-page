/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-04-20 23:20:40
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-20 10:40:19
 * @FilePath: /finalversion-for-playback/src/pages/playBack/LandingPage.tsx
 */
import React, { FC, useState } from "react";
import LandingPageTable from "../components/LandingPageTable";
import QuerySearch from "../components/QuerySearch";
import SubHeader from "../components/SubHeader";
import style from "./landingPage.module.less";

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

export interface FilterProps {
  params: FilterParams;
  setParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

const LandingPage: FC = () => {
  const [params, setParams] = useState<FilterParams>({
    cycleTypes: [],
    cycleIndexCheckBox: false,
    cycleIndexInput: "",
    finishCodeCheckBox: false,
    finishCodeInput: "",
    groupIdCheckBox: false,
    groupIdInput: "",
    partTypeCheckBox: false,
    partTypeInput: "",
  });

  const filterProps = { params, setParams };

  return (
    <div className={style.landingPageBox}>
      <SubHeader />
      <QuerySearch {...filterProps} />
      <LandingPageTable {...filterProps} />
    </div>
  );
};

export default LandingPage;
