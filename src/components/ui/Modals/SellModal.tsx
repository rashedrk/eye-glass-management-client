/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Modal, Row } from "antd";
import CSForm from "../../form/CSForm";
import CSInput from "../../form/CSInput";
import CSDatePicker from "../../form/CSDatePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import verifyToken from "../../../utils/verifyToken";
import {
  TAuthUser,
  useCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { useSellEyeglassMutation } from "../../../redux/features/eyeGlass/eyeglassApi";
import { TResponse } from "../../../types/global.type";
import { toast } from "sonner";
import moment from "moment";
import { useState } from "react";
import InvoiceModal from "./InvoiceModal";

const SellModal = ({ eyeglass, isModalOpen, handleCancel }: any) => {
  const token = useAppSelector(useCurrentToken);
  const user = verifyToken(token as string) as TAuthUser;
  const [createSell] = useSellEyeglassMutation();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const invoiceCancel = () => {
    setIsInvoiceModalOpen(false);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    // console.log(data.dateOfSale.$d);
    
    const saleData = {
      ...data,
      dateOfSale: moment(data.dateOfSale.$d).format("MM-DD-YYYY"),
      quantity: Number(data.quantity),
      productId: eyeglass._id,
      soldBy: user.userId,
    };
    // console.log(saleData);
    const invoices = {
      product: eyeglass.name,
      price: eyeglass.price,
      ...saleData,
    };
    // console.log(invoices);

    const res = (await createSell(saleData)) as TResponse<any>;
    if (res?.data?.success) {
      setInvoiceDetails(invoices);
      toast.success("Sell successfully added", { id: toastId });
      handleCancel();
      setIsInvoiceModalOpen(true);
    } else {
      toast.error("something went wrong!", { id: toastId });
    }
  };
  return (
    <>
      <Modal
        title="Sale information"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CSForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24}>
              <CSInput type="number" label="Quantity" name="quantity" />
            </Col>
            <Col span={24}>
              <CSInput type="text" label="Buyer's Name" name="buyer" />
            </Col>
            <Col span={24}>
              <CSDatePicker name="dateOfSale" label="Sell Date" />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary">
            Confirm
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={handleCancel}>
            Cancel
          </Button>
        </CSForm>
      </Modal>
      <InvoiceModal
        invoiceCancel={invoiceCancel}
        invoiceDetails={invoiceDetails}
        isInvoiceModalOpen={isInvoiceModalOpen}
      />
    </>
  );
};

export default SellModal;
