/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import Title from "antd/es/typography/Title";
import ReactToPrint from "react-to-print";
import Invoicer from "../Invoicer";
import { useRef } from "react";

const InvoiceModal = ({ invoiceCancel, isInvoiceModalOpen, invoiceDetails }: any) => {
  const componentRef = useRef();
  return (
    <Modal
      title="Sale information"
      open={isInvoiceModalOpen}
      onCancel={invoiceCancel}
      footer={null}
    >
      
      <div ref={componentRef}>
        <Invoicer invoiceDetails={invoiceDetails} />
      </div>
      <Title level={3}>Are you want to download Invoice?</Title>
      <ReactToPrint
        trigger={() => (
          <Button htmlType="submit" type="primary">
            Yes
          </Button>
        )}
        content={() => componentRef.current}
      />

      <Button style={{ marginLeft: 10 }} onClick={invoiceCancel}>
        No
      </Button>
    </Modal>
  );
};

export default InvoiceModal;
