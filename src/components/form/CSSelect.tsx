import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type CSSelectType = {
  label: string;
  name: string;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  defaultValue?: string;
};

const CSSelect = ({ label, name, options, disabled, mode, defaultValue }: CSSelectType) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
          size="large"
            mode={mode}
            disabled={disabled}
            style={{ width: "100%" }}
            {...field}
            options={options}
            defaultValue={defaultValue}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CSSelect;
