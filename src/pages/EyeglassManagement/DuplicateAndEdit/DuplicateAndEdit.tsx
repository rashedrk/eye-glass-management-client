/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Flex, Image, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";
import CSForm from "../../../components/form/CSForm";
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
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import verifyToken from "../../../utils/verifyToken";
import { useAppSelector } from "../../../redux/hooks";
import { useAddEyeglassMutation } from "../../../redux/features/eyeGlass/eyeglassApi";
import {
  TAuthUser,
  useCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { useState } from "react";
import { TResponse } from "../../../types/global.type";

const DuplicateAndEdit = () => {
  const location = useLocation();
  const eyeglass = location.state.eyeglass;
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState(eyeglass.img);
  const [addEyeglass] = useAddEyeglassMutation();
  const token = useAppSelector(useCurrentToken);
  // console.log(token);

  const user = verifyToken(token as string) as TAuthUser;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating new Eyeglass...");
    delete data.key;
    const eyeglassData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      img: imageUrl,
      addedBy: user.userId,
    };

    const response = await addEyeglass(eyeglassData) as TResponse<any>;
    if (response?.data?.success) {
        toast.success('Eyeglass added successfully', {id: toastId});
        navigate('/inventory')
    }
    else {
        toast.error('something went wrong!', {id: toastId})
    }
  };

  const uploadImage: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Uploading image...");
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
      .then((imgbbData) => {
        if (imgbbData.success) {
          setImageUrl(imgbbData.data.display_url);
          toast.success("Image uploaded successfully", { id: toastId });
        } else {
          toast.error("Failed to upload image!", { id: toastId });
        }
      });
  };
  return (
    <>
      <Title
        style={{ margin: "auto", width: "200px", paddingBottom: "15px" }}
        level={4}
      >
        Create New Variant
      </Title>
      <Flex justify="center" align="center">
        <Col span={24}>
          <CSForm onSubmit={uploadImage}>
            <Row style={{ marginTop: 5, marginBottom: 20 }}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Image src={imageUrl} width={200} style={{ marginBottom: 5 }} />
                <Controller
                  name="img"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      type="file"
                      size="large"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      style={{ marginTop: 5, marginBottom: 10 }}
                    />
                  )}
                />
                <Button htmlType="submit" type="dashed">
                  Upload
                </Button>
              </Col>
            </Row>
          </CSForm>
          <Divider />
          <CSForm onSubmit={onSubmit} defaultValues={eyeglass}>
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
                <CSSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                />
              </Col>
            </Row>
            <Button htmlType="submit" type="primary">
              Create
            </Button>
          </CSForm>
        </Col>
      </Flex>
    </>
  );
};

export default DuplicateAndEdit;
