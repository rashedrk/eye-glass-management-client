/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Image,
  Space,
  Table,
  TableProps,
} from "antd";
import { TSales } from "../../types";
import { useGetAllSalesHistoryQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import moment from "moment";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import { FileExcelOutlined } from "@ant-design/icons";
import { TQueryParams } from "../../types/global.type";
import { FilePdfOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import jsPDF from "jspdf";
import  autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SalesHistory = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data, isLoading } = useGetAllSalesHistoryQuery(params);


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

  const handleExport = async (type: "pdf" | "excel") => {
    if (!data?.data) {
      toast.error("No data to export");
      return;
    }

    try {
      const exportData = data.data.map((item: TSales) => ({
        "Date": moment(item.date).format("DD-MM-YYYY"),
        "Product Name": item.productName,
        "Buyer's Name": item.buyerName,
        "Quantity": item.quantity,
        "Unit Price": `$${item.unitPrice}`,
        "Total Price": `$${item.totalPrice}`,
      }));

      if (type === "pdf") {
        // Create new PDF document
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: "a4",
        });

        // Add title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text("Sales History Report", 40, 40);

        // Add date and time
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 60);

        // Use autoTable function directly (not as method)
        autoTable(doc, {
          head: [Object.keys(exportData[0])],
          body: exportData.map((item: TSales) => Object.values(item)),
          startY: 80,
          theme: "grid",
          styles: {
            fontSize: 8,
            cellPadding: 3,
            overflow: "linebreak",
            halign: "center",
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontSize: 10,
            fontStyle: "bold",
            halign: "center",
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          margin: { top: 80, left: 20, right: 20 },
          tableWidth: "auto",
          columnStyles: {
            0: { cellWidth: 100 }, // Date
            1: { cellWidth: 120 }, // Product Name
            2: { cellWidth: 120 }, // Buyer's Name
            3: { cellWidth: 80 },  // Quantity
            4: { cellWidth: 100 }, // Unit Price
            5: { cellWidth: 100 }, // Total Price
          },
          didDrawPage: function (data: any) {
            doc.setFontSize(10);
            doc.text(
              `Page ${data.pageNumber}`,
              doc.internal.pageSize.width - 40,
              doc.internal.pageSize.height - 20,
              { align: "right" }
            );
          },
        });

        // Save the PDF
        doc.save("sales-history.pdf");
      } else {
        // Excel export
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales History");

        const maxWidth = Object.keys(exportData[0]).reduce(
          (max, key) => Math.max(max, key.length),
          0
        );
        const colWidth = maxWidth + 2;

        worksheet["!cols"] = Object.keys(exportData[0]).map(() => ({
          wch: colWidth,
        }));

        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = XLSX.utils.encode_cell({ r: 0, c: C });
          if (!worksheet[cell]) continue;
          worksheet[cell].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            alignment: { horizontal: "center" },
            fill: { fgColor: { rgb: "29568A" } },
          };
        }

        XLSX.writeFile(workbook, "sales-history.xlsx");
      }

      toast.success(`Exported successfully as ${type.toUpperCase()}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error(
        `Failed to export data: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Space direction="horizontal">
          <DatePicker onChange={handleDailyPicker} />
          <DatePicker
            onChange={handleWeeklyPicker}
            picker="week"
            format={"YYYY-ww"}
          />
          <DatePicker onChange={handleMonthlyPicker} picker="month" />
          <DatePicker onChange={handleYearlyPicker} picker="year" />
        </Space>

        <Dropdown
          menu={{
            items: [
              {
                key: "pdf",
                label: "Export as PDF",
                icon: <FilePdfOutlined />,
                onClick: () => handleExport("pdf"),
              },
              {
                key: "excel",
                label: "Export as Excel",
                icon: <FileExcelOutlined />,
                onClick: () => handleExport("excel"),
              },
            ],
          }}
        >
          <Button icon={<DownloadOutlined />}  type="primary" style={{ backgroundColor: '#051A2C', color: '#ffffff' }}>
            Export <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Table columns={columns} loading={isLoading} dataSource={data?.data} />
    </>
  );
};

export default SalesHistory;
