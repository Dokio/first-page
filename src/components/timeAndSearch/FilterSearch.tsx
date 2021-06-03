import React, { FC, useState } from "react";
import { Form, Checkbox } from "antd";
import style from "./filterSearch.module.less";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { Button, Icons, Input } from "@mujin/uicomponents";
import { FilterProps } from "../../containers/LandingPage";

interface FilterSearchDisabledState {
  finishCodeDisabled: boolean;
  cycleIndexDisabled: boolean;
  groupIdDisabled: boolean;
  partTypeDisabled: boolean;
}
const cycleTypeOptions = ["order", "preparation", "visionInspection"];

const FilterSearch: FC<FilterProps> = (filterSearchProps) => {
  const [form] = Form.useForm();
  const { setFilterSearchParams } = filterSearchProps;
  const [disabled, setDisabled] = useState<FilterSearchDisabledState>({
    finishCodeDisabled: true,
    cycleIndexDisabled: true,
    groupIdDisabled: true,
    partTypeDisabled: true,
  });

  const handleCheckBoxChange = (
    checkboxEvent: CheckboxChangeEvent,
    inputDisablekey: string,
    inputPlaceholder: string
  ) => {
    setDisabled((idisabledItem) => {
      return {
        ...idisabledItem,
        [inputDisablekey]: !checkboxEvent.target.checked,
      };
    });

    if (!checkboxEvent.target.checked) {
      form.setFieldsValue({ [inputPlaceholder]: undefined });
    }
  };

  const handleApplyFilters = () => {
    form.validateFields().then((filterResult) => {
      setFilterSearchParams(filterResult);
    });
  };

  const handleClearAll = () => {
    setDisabled({
      finishCodeDisabled: true,
      cycleIndexDisabled: true,
      groupIdDisabled: true,
      partTypeDisabled: true,
    });
    form.setFieldsValue({
      finishCodeInput: undefined,
      cycleIndexInput: undefined,
      groupIdInput: undefined,
      partTypeInput: undefined,
      finishCodeCheckBox: false,
      cycleIndexCheckBox: false,
      groupIdCheckBox: false,
      partTypeCheckBox: false,

    });
  };

  return (
    <div className={style.dropDown}>
      <Form
        name="basic"
        form={form}
        labelAlign="left"
        initialValues={{
          cycleTypes: ["order", "preparation", "visionInspection"],
        }}
      >
        <p>Filter settings</p>

        <div className={style.checkboxGroup}>
          <p>Type :</p>
          <div className={style.checkboxs}>
            <Form.Item name="cycleTypes">
              <Checkbox.Group options={cycleTypeOptions} />
            </Form.Item>
          </div>
        </div>

        <div className={style.checkAndInput}>
          <Form.Item noStyle>
            <Form.Item
              name="finishCodeCheckBox"
              noStyle
              valuePropName="checked"
            >
              <Checkbox
                onChange={(checkboxEvent) =>
                  handleCheckBoxChange(
                    checkboxEvent,
                    "finishCodeDisabled",
                    "finishCodeInput"
                  )
                }
              >
                Finishcode :
              </Checkbox>
            </Form.Item>
            <Form.Item name="finishCodeInput" noStyle>
              <Input
                allowClear
                disabled={disabled.finishCodeDisabled}
                placeholder="e.g. NoValid, (?!OrderComplete | NoMoreDest )"
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className={style.checkAndInput}>
          <Form.Item noStyle>
            <Form.Item
              name="cycleIndexCheckBox"
              noStyle
              valuePropName="checked"
            >
              <Checkbox
                onChange={(checkboxEvent) =>
                  handleCheckBoxChange(
                    checkboxEvent,
                    "cycleIndexDisabled",
                    "cycleIndexInput"
                  )
                }
              >
                CycleIndex :{" "}
              </Checkbox>
            </Form.Item>
            <Form.Item name="cycleIndexInput" noStyle>
              <Input
                allowClear
                disabled={disabled.cycleIndexDisabled}
                placeholder="e.g 1616546114613"
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className={style.checkAndInput}>
          <Form.Item noStyle>
            <Form.Item name="groupIdCheckBox" noStyle valuePropName="checked">
              <Checkbox
                onChange={(checkboxEvent) =>
                  handleCheckBoxChange(checkboxEvent, "groupIdDisabled", "groupIdInput")
                }
              >
                Group Id :{" "}
              </Checkbox>
            </Form.Item>
            <Form.Item name="groupIdInput" noStyle>
              <Input
                allowClear
                disabled={disabled.groupIdDisabled}
                placeholder="e.g PICKING"
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className={style.checkAndInput}>
          <Form.Item noStyle>
            <Form.Item name="partTypeCheckBox" noStyle valuePropName="checked">
              <Checkbox
                onChange={(checkboxEvent) =>
                  handleCheckBoxChange(checkboxEvent, "partTypeDisabled", "partTypeInput")
                }
              >
                PartType :{" "}
              </Checkbox>
            </Form.Item>
            <Form.Item name="partTypeInput" noStyle>
              <Input
                allowClear
                disabled={disabled.partTypeDisabled}
                placeholder="e.g dydo-coffee"
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className={style.buttons}>
          <Form.Item noStyle>
            <Button
              onClick={handleClearAll}
              text="Clear all"
              variant="secondary"
              icon={
                <Icons.CrossCircleFilled
                  primaryColor={"#DA0E11"}
                />
              }
            />

            <Button
              onClick={handleApplyFilters}
              text="Apply filters"
              variant="secondary"
              className={style.applyFilterButton}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FilterSearch;
