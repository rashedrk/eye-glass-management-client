/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DatePicker,
  DatePickerProps,
  Image,
  Space,
  Table,
  TableProps,
} from "antd";
import { TSales } from "../../types";
import { useGetAllSalesHistoryQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import moment from "moment";
import { useState } from "react";
import { TQueryParams } from "../../types/global.type";

const SalesHistory = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data, isLoading } = useGetAllSalesHistoryQuery(params);
  console.log(params);

  const columns: TableProps<TSales>["columns"] = [
    {
      title: "Product Image",
      dataIndex: "img",
      render: (item) => <Image src={item} width={50} />,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Buyers Name",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <p>{moment(date).format("DD-MM-YYYY")}</p>,
    },
  ];

  const handleDailyPicker: DatePickerProps["onChange"] = (
    _date,
    dateString
  ) => {
    setParams([
      { name: "type", value: "daily" },
      { name: "date", value: dateString },
    ]);
  };
  const handleWeeklyPicker: DatePickerProps["onChange"] = (
    _date,
    dateString
  ) => {
    setParams([
      { name: "type", value: "weekly" },
      { name: "date", value: dateString },
    ]);
  };
  const handleMonthlyPicker: DatePickerProps["onChange"] = (
    _date,
    dateString
  ) => {
    setParams([
      { name: "type", value: "monthly" },
      { name: "date", value: dateString },
    ]);
  };
  const handleYearlyPicker: DatePickerProps["onChange"] = (
    _date,
    dateString
  ) => {
    setParams([
      { name: "type", value: "yearly" },
      { name: "date", value: dateString },
    ]);
  };
  return (
    <>
      <Space direction="horizontal" style={{marginBottom: 10}}>
        <DatePicker onChange={handleDailyPicker} />
        <DatePicker
          onChange={handleWeeklyPicker}
          picker="week"
          format={"YYYY-ww"}
        />
        <DatePicker onChange={handleMonthlyPicker} picker="month" />
        <DatePicker onChange={handleYearlyPicker} picker="year" />
      </Space>
      <Table columns={columns} loading={isLoading} dataSource={data?.data} />
    </>
  );
};

export default SalesHistory;
