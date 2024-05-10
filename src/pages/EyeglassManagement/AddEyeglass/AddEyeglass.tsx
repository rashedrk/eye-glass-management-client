/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Form, Input, Row } from "antd";
import CSForm from "../../../components/form/CSForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import CSInput from "../../../components/form/CSInput";
import CSSelect from "../../../components/form/CSSelect";
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
import { useAddEyeglassMutation } from "../../../redux/features/eyeGlass/eyeglassApi";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import {
  TAuthUser,
  useCurrentToken,
} from "../../../redux/features/auth/authSlice";
import verifyToken from "../../../utils/verifyToken";
import { TResponse } from "../../../types/global.type";

const AddEyeglass = () => {
  const [addEyeglass] = useAddEyeglassMutation();
  const token = useAppSelector(useCurrentToken);
  // console.log(token);

  const user = verifyToken(token as string) as TAuthUser;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const toastId = toast.loading("Creating new Eyeglass...");
    const formData = new FormData();
    formData.append("image", data.img);
    //hosting image to imagbb
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then(async (imgbbData) => {
        if (imgbbData.success) {
          const eyeglassData = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
            img: imgbbData.data.display_url,
            addedBy: user.userId,
          };
          const response = (await addEyeglass(eyeglassData)) as TResponse<any>;
          if (response?.data?.success) {
            toast.success("Eyeglass added successfully", { id: toastId });
          } else {
            toast.error("something went wrong!", { id: toastId });
          }
        } else {
          toast.error("Failed to upload image!");
        }
      });
  };
  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <CSForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSInput type="text" label="Name" name="name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSInput type="number" label="Quantity" name="quantity" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSInput type="number" label="Price" name="price" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect
                label="Frame Material"
                name="frameMaterial"
                options={frameMaterialOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect
                label="Frame Shapes"
                name="frameShapes"
                options={frameShapesOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect
                label="Frame Type"
                name="frameType"
                options={frameTypeOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect
                label="Frame Size"
                name="frameSize"
                options={frameSizeOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect
                label="Lens Type"
                name="lensType"
                options={lensTypeOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect label="Brand" name="brand" options={brandsOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect label="Color" name="color" options={colorOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <CSSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="img"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="image">
                    <Input
                      size="large"
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </CSForm>
      </Col>
    </Flex>
  );
};

export default AddEyeglass;
