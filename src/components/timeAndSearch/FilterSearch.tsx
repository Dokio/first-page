// /*
//  * @Descripttion:
//  * @Author: Wei
//  * @Date: 2021-05-05 20:22:10
//  * @LastEditors: Wei
//  * @LastEditTime: 2021-05-15 18:05:06
//  * @FilePath: \react-TS\src\pages\playBack\component\subcomponent\FilterSearch.tsx
//  */

import { FC, useState } from "react";
import { Form, Checkbox } from "antd";
// import style from '../querySearch.module.less'
import style from "./filterSearch.module.less";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { Button, Input } from "antd";
import { FilterProps } from "../../containers/LandingPage";
import { SearchOutlined } from '@ant-design/icons';

interface FilterSearchDisabledState {
  finishCodeDisabled: boolean;
  cycleIndexDisabled: boolean;
  groupIdDisabled: boolean;
  partTypeDisabled: boolean;
}
const cycleTypeOptions = ["order", "preparation", "visionInspection"];

const FilterSearch: FC<FilterProps> = (props) => {
  const [form] = Form.useForm();
  const { setParams } = props;
  const [disabled, setDisabled] = useState<FilterSearchDisabledState>({
    finishCodeDisabled: true,
    cycleIndexDisabled: true,
    groupIdDisabled: true,
    partTypeDisabled: true,
  });

  const handleCheckBoxChange = (
    e: CheckboxChangeEvent,
    inputDisablekey: string,
    inputPlaceholder: string
  ) => {
    setDisabled((i) => {
      return {
        ...i,
        [inputDisablekey]: !e.target.checked,
      };
    });

    if (!e.target.checked) {
      form.setFieldsValue({ [inputPlaceholder]: undefined });
    }
  };

  const handleApplyFilters = () => {
    form.validateFields().then((res) => {
      //console.log(res)
      setParams(res);
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
      //cycleTypes: false,
    });
  };

  return (
    <div className={style.dropDown}>
      <Form
        name="basic"
        form={form}
        //onFinish={handleFinish}
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
                onChange={(e) =>
                  handleCheckBoxChange(
                    e,
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
                onChange={(e) =>
                  handleCheckBoxChange(
                    e,
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
                //style={disabled? {backgroundColor:'green'} : {backgroundColor:'red'}}
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className={style.checkAndInput}>
          <Form.Item noStyle>
            <Form.Item name="groupIdCheckBox" noStyle valuePropName="checked">
              <Checkbox
                onChange={(e) =>
                  handleCheckBoxChange(e, "groupIdDisabled", "groupIdInput")
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
                onChange={(e) =>
                  handleCheckBoxChange(e, "partTypeDisabled", "partTypeInput")
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
              //text="Clear all"
              //variant="secondary"
              icon={<SearchOutlined />}
              style={{
                backgroundColor: "@nero",
                borderRadius: "5px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            />

            <Button
              onClick={handleApplyFilters}
              //text="Apply filters"
              //variant="secondary"
              style={{
                backgroundColor: "#2D2E31",
                borderRadius: "5px",
                fontSize: "14px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FilterSearch;
