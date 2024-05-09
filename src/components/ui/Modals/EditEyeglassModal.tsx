import { Button, Col, Flex, Modal, Row } from "antd";
import CSForm from "../../form/CSForm";
import CSInput from "../../form/CSInput";
import CSSelect from "../../form/CSSelect";
import {
  brandsOptions,
  colorOptions,
  frameMaterialOptions,
  frameShapesOptions,
  frameSizeOptions,
  frameTypeOptions,
  genderOptions,
  lensTypeOptions,
} from "../../../constants/eyeglass";
import { useUpdateEyeglassMutation } from "../../../redux/features/eyeGlass/eyeglassApi";
import { FieldValues, SubmitHandler } from "react-hook-form";

const EditEyeglassModal = ({ eyeglass, isModalOpen, handleCancel }) => {
  const [updateEyeglass] = useUpdateEyeglassMutation();

  const {name, quantity, price, frameMaterial, frameShapes, color, frameType, frameSize, lensType, brand, gender} = eyeglass;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      id: "asf",
      updateData: {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      },
    };
    console.log(formData);
  };
  return (
    <Modal
      title="Update Eyeglass"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    //   mask={false}
    >
      <Flex justify="center" align="center">
        <Col span={24}>
          <CSForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSInput type="text" label="Name" name="name" defaultValue={name}/>
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSInput type="number" label="Quantity" name="quantity" defaultValue={quantity} />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSInput type="number" label="Price" name="price" defaultValue={price} />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect
                  label="Frame Material"
                  name="frameMaterial"
                  options={frameMaterialOptions}
                  defaultValue={frameMaterial}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect
                  label="Frame Shapes"
                  name="frameShapes"
                  options={frameShapesOptions}
                  defaultValue={frameShapes}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect
                  label="Frame Type"
                  name="frameType"
                  options={frameTypeOptions}
                  defaultValue={frameType}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect
                  label="Frame Size"
                  name="frameSize"
                  options={frameSizeOptions}
                  defaultValue={frameSize}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect
                  label="Lens Type"
                  name="lensType"
                  options={lensTypeOptions}
                  defaultValue={lensType}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect label="Brand" name="brand" options={brandsOptions} defaultValue={brand} />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect label="Color" name="color" options={colorOptions} defaultValue={color}/>
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <CSSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  defaultValue={gender}
                />
              </Col>
            </Row>
            <Button htmlType="submit" type="primary">Submit</Button>
          </CSForm>
        </Col>
      </Flex>
    </Modal>
  );
};

export default EditEyeglassModal;
