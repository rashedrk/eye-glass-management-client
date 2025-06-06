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
};

const CSSelect = ({ label, name, options, disabled, mode }: CSSelectType) => {
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
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CSSelect;
