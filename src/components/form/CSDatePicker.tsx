import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
};

const CSDatePicker = ({ name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CSDatePicker;
