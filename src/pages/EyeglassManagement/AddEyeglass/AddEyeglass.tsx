import { Button, Col, Flex } from "antd";
import CSForm from "../../../components/form/CSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CSInput from "../../../components/form/CSInput";
import CSSelect from "../../../components/form/CSSelect";
import { brandsOptions, frameMaterialOptions, frameShapesOptions, frameSizeOptions, frameTypeOptions, genderOptions, lensTypeOptions } from "../../../constants/eyeglass";

const AddEyeglass = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <CSForm onSubmit={onSubmit}>
          <CSInput type="text" label="Name" name="name"/>
          <CSInput type="number" label="Quantity" name="quantity"/>
          <CSInput type="number" label="Price" name="price"/>
          <CSSelect label="Frame Material" name="frameMaterial" options={frameMaterialOptions}/>
          <CSSelect label="Frame Shapes" name="frameShapes" options={frameShapesOptions}/>
          <CSSelect label="Frame Type" name="frameType" options={frameTypeOptions}/>
          <CSSelect label="Frame Size" name="frameSize" options={frameSizeOptions}/>
          <CSSelect label="Lens Type" name="lensType" options={lensTypeOptions}/>
          <CSSelect label="Brand" name="brand" options={brandsOptions}/>
          <CSSelect label="Gender" name="gender" options={genderOptions}/>
          <Button htmlType="submit">Submit</Button>
        </CSForm>
      </Col>
    </Flex>
  );
};

export default AddEyeglass;
