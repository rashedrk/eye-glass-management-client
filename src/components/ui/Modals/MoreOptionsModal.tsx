/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Dropdown, MenuProps, Modal, Row } from "antd";
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
import {
  useDeleteEyeglassMutation,
  useUpdateEyeglassMutation,
} from "../../../redux/features/eyeGlass/eyeglassApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { useNavigate } from "react-router-dom";

const MoreOptionModal = ({ eyeglass }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateEyeglass] = useUpdateEyeglassMutation();
  const [deleteEyeglass] = useDeleteEyeglassMutation();
  const navigate = useNavigate();

  //dropdown options
  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "edit",
    },
    {
      label: "Delete",
      key: "delete",
    },
    {
      label: "Duplicate & Edit",
      key: "duplicate_edit",
    },
  ];
  const handleMoreDropdown: MenuProps["onClick"] = (data) => {
    if (data.key === "edit") {
      setIsModalOpen(true);
    } else if (data.key === "delete") {
      handleDelete();
    } else if (data.key === "duplicate_edit") {
      navigate("/duplicate_edit", { state: { eyeglass: eyeglass } });
    }
  };
  const menuProps = {
    items,
    onClick: handleMoreDropdown,
  };

  //Edit and update options
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("updating...")
    const id = data.key;
    delete data.img;
    delete data.key;
    const formData = {
      id,
      updateData: {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      },
    };
    const res = (await updateEyeglass(formData)) as TResponse<any>;
    if (res?.data?.success) {
      setIsModalOpen(false);
      toast.success("Updated Successfully", {id: toastId});
    } else {
      toast.error("Something went wrong!", {id: toastId});
    }
  };

  //Delete option
  const handleDelete = async () => {
    const res = (await deleteEyeglass(eyeglass.key)) as TResponse<any>;
    const toastId = toast.loading("deleting...")
    if (res?.data?.success) {
      toast.success(res.data.message, {id: toastId});
    } else {
      toast.error("something went wrong!", {id: toastId});
    }
  };

  return (
    <>
      <Dropdown menu={menuProps} placement="bottom" trigger={["click"]} arrow>
        <Button size="small">
          <MoreOutlined />
        </Button>
      </Dropdown>
      <Modal
        title="Update Eyeglass"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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
              <CSSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={handleCancel}>
            Cancel
          </Button>
        </CSForm>
      </Modal>
    </>
  );
};

export default MoreOptionModal;
