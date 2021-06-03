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
  filterSearchParams: FilterParams;
  setFilterSearchParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

const LandingPage: FC = () => {
  const [filterSearchParams, setFilterSearchParams] = useState<FilterParams>({
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

  const filterProps = { filterSearchParams, setFilterSearchParams };

  return (
    <div className={style.landingPageBox}>
      <SubHeader />
      <QuerySearch {...filterProps} />
      <LandingPageTable {...filterProps} />
    </div>
  );
};

export default LandingPage;
