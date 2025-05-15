/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Collapse, Flex, Row } from "antd";
import CSForm from "../../../components/form/CSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
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
import { ChevronDown, Image, Info, LifeBuoy, Plus, RefreshCw } from "lucide-react";
const { Panel } = Collapse;
import { theme } from "antd";
const { useToken } = theme;
import CSUploader from "../../../components/form/CSUploader";

const AddEyeglass = () => {
  const [addEyeglass] = useAddEyeglassMutation();
  const authToken = useAppSelector(useCurrentToken);
  const { token } = useToken();

  const user = verifyToken(authToken as string) as TAuthUser;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating new Eyeglass...");

    try {
      // Create an array of promises for image uploads
      const uploadPromises = data.images.map((file: any) => {
        const formData = new FormData();
        formData.append("image", file.originFileObj);

        return fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
      });

      // Wait for all images to upload
      const imgbbResponses = await Promise.all(uploadPromises);
      const imageUrls = imgbbResponses.map(
        (response) => response.data.display_url
      );

      const eyeglassData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        img: imageUrls,
        addedBy: user.userId,
      };

      const response = (await addEyeglass(eyeglassData)) as TResponse<any>;

      if (response?.data?.success) {
        toast.success("Eyeglass added successfully", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error("Something went wrong!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to upload images!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <CSForm onSubmit={onSubmit}>
          <Collapse
            defaultActiveKey={["1"]}
            style={{ marginBottom: 16, background: "white" }}
          >
            <Panel
              header=<div
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <Info size={16} color={token?.colorPrimary} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  Product Information
                </span>
              </div>
              key="1"
              extra={<ChevronDown style={{ fontSize: 16 }} />}
              showArrow={false}
            >
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <CSInput type="text" label="Name" name="name" />
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
                  <CSSelect
                    label="Brand"
                    name="brand"
                    options={brandsOptions}
                  />
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
            </Panel>
          </Collapse>
          <Collapse
            defaultActiveKey={["1"]}
            style={{ marginBottom: 16, background: "white" }}
          >
            <Panel
              header=<div
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <LifeBuoy size={16} color={token?.colorPrimary} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>
                  Pricing & Stocks
                </span>
              </div>
              key="1"
              extra={<ChevronDown style={{ fontSize: 16 }} />}
              showArrow={false}
            >
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <CSInput type="number" label="Quantity" name="quantity" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <CSInput type="number" label="Price" name="price" />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <CSInput
                    type="number"
                    label="Discount Value"
                    name="discount"
                  />
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Collapse
            defaultActiveKey={["1"]}
            style={{ marginBottom: 16, background: "white" }}
          >
            <Panel
              header=<div
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <Image size={16} color={token?.colorPrimary} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>Images</span>
              </div>
              key="1"
              extra={<ChevronDown style={{ fontSize: 16 }} />}
              showArrow={false}
            >
              <Row gutter={8}>
                <Col span={24}>
                  <CSUploader name="images" label="Product Images" />
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Flex justify="flex-end" gap="small">
            <Button htmlType="reset" type="default" icon={<RefreshCw size={12} />}>Reset</Button>
            <Button htmlType="submit" type="primary" icon={<Plus size={12} />}>Add Product</Button>
          </Flex>
        </CSForm>
      </Col>
    </Flex>
  );
};

export default AddEyeglass;
