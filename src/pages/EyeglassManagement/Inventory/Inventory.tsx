/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dropdown,
  Image,
  Input,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useBulkDeleteEyeglassMutation,
  useGetAllEyeglassesQuery,
} from "../../../redux/features/eyeGlass/eyeglassApi";
import { TEyeglass, TEyeglassTable } from "../../../types";
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
import { useState } from "react";
import { TQueryParams, TResponse } from "../../../types/global.type";
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FileExcelOutlined } from "@ant-design/icons";
import MoreOptionModal from "../../../components/ui/Modals/MoreOptionsModal";
import { FilePdfOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import jsPDF from "jspdf";
import  autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: eyeglassData, isFetching } = useGetAllEyeglassesQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "searchTerm", value: searchTerm },
    ...params,
  ]);
  const [bulkDelete] = useBulkDeleteEyeglassMutation();

  const metaData = eyeglassData?.meta;

  const columns: TableColumnsType<TEyeglass> = [
    {
      title: "Image",
      dataIndex: "img",
      render: (item) => (
        <>
          <Image width={50} src={item} />
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      filters: [
        { text: "1-100", value: "1-100" },
        { text: "101-500", value: "101-500" },
        { text: "501-1000", value: "501-1000" },
        { text: "1001-5000", value: "1001-5000" },
      ],
    },
    {
      title: "Frame Material",
      dataIndex: "frameMaterial",
      filters: frameMaterialOptions,
    },
    {
      title: "Frame Shapes",
      dataIndex: "frameShapes",
      filters: frameShapesOptions,
    },
    {
      title: "Color",
      dataIndex: "color",
      filters: colorOptions,
    },
    {
      title: "Frame Type",
      dataIndex: "frameType",
      filters: frameTypeOptions,
    },
    {
      title: "Frame Size",
      dataIndex: "frameSize",
      filters: frameSizeOptions,
    },
    {
      title: "Lens Type",
      dataIndex: "lensType",
      filters: lensTypeOptions,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      filters: brandsOptions,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: genderOptions,
    },
    {
      title: "Action",
      render: (item) => <MoreOptionModal eyeglass={item} />,
    },
  ];

  const tableData: TEyeglassTable[] | undefined = eyeglassData?.data?.map(
    ({
      _id,
      name,
      quantity,
      price,
      frameMaterial,
      frameShapes,
      color,
      frameType,
      frameSize,
      lensType,
      brand,
      gender,
      img,
      createdAt,
      updatedAt,
      addedBy,
    }) => ({
      _id,
      key: _id,
      name,
      quantity,
      price,
      frameMaterial,
      frameShapes,
      color,
      frameType,
      frameSize,
      lensType,
      brand,
      gender,
      img,
      createdAt,
      updatedAt,
      addedBy,
    })
  );

  const onChange: TableProps<TEyeglass>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.frameMaterial?.forEach((item) => {
        queryParams.push({ name: "frameMaterial", value: item });
      });
      filters.frameShapes?.forEach((item) => {
        queryParams.push({ name: "frameShapes", value: item });
      });
      filters.color?.forEach((item) => {
        queryParams.push({ name: "color", value: item });
      });
      filters.frameType?.forEach((item) => {
        queryParams.push({ name: "frameType", value: item });
      });
      filters.frameSize?.forEach((item) => {
        queryParams.push({ name: "frameSize", value: item });
      });
      filters.lensType?.forEach((item) => {
        queryParams.push({ name: "lensType", value: item });
      });
      filters.brand?.forEach((item) => {
        queryParams.push({ name: "brand", value: item });
      });
      filters.gender?.forEach((item) => {
        queryParams.push({ name: "gender", value: item });
      });
      filters.price?.forEach((item) => {
        const price = item.toString().split("-");
        queryParams.push({ name: "minPrice", value: price[0] });
        queryParams.push({ name: "maxPrice", value: price[1] });
        // console.log(price);
      });
      setParams(queryParams);
    }
    // console.log(filters, extra);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleBulkDelete = async () => {
    const toastId = toast.loading("Deleting...");
    const res = (await bulkDelete(selectedRowKeys)) as TResponse<any>;
    if (res.data.success) {
      toast.success("Deleted Successfully", { id: toastId, duration: 2000 });
      setSelectedRowKeys([]);
    } else {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page when searching
  };

  const handleExport = async (type: "pdf" | "excel") => {
    if (!eyeglassData?.data) {
      toast.error("No data to export");
      return;
    }
  
    try {
      const data = eyeglassData.data.map((item) => ({
        Name: item.name,
        Quantity: item.quantity,
        Price: `$${item.price}`,
        "Frame Material": item.frameMaterial,
        "Frame Shapes": item.frameShapes,
        Color: item.color,
        "Frame Type": item.frameType,
        "Frame Size": item.frameSize,
        "Lens Type": item.lensType,
        Brand: item.brand,
        Gender: item.gender,
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
        doc.text("Eyeglass Inventory Report", 40, 40);
  
        // Add date and time
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 60);
  
        // Use autoTable function directly (not as method)
        autoTable(doc, {
          head: [Object.keys(data[0])],
          body: data.map((item) => Object.values(item)),
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
          tableWidth: 'auto',
          columnStyles: {
            0: { cellWidth: 80 }, // Name
            1: { cellWidth: 40 }, // Quantity
            2: { cellWidth: 50 }, // Price
            3: { cellWidth: 70 }, // Frame Material
            4: { cellWidth: 70 }, // Frame Shapes
            5: { cellWidth: 50 }, // Color
            6: { cellWidth: 60 }, // Frame Type
            7: { cellWidth: 60 }, // Frame Size
            8: { cellWidth: 60 }, // Lens Type
            9: { cellWidth: 60 }, // Brand
            10: { cellWidth: 50 }, // Gender
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
        doc.save("eyeglass-inventory.pdf");
        
      } else {
        // Excel export
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
  
        const maxWidth = Object.keys(data[0]).reduce(
          (max, key) => Math.max(max, key.length),
          0
        );
        const colWidth = maxWidth + 2;
  
        worksheet["!cols"] = Object.keys(data[0]).map(() => ({
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
  
        XLSX.writeFile(workbook, "eyeglass-inventory.xlsx");
      }
  
      toast.success(`Exported successfully as ${type.toUpperCase()}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`Failed to export data: ${error.message || error}`);
    }
  };

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {hasSelected && (
            <>
              <Button
                type="primary"
                onClick={handleBulkDelete}
                loading={isFetching}
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
              <span style={{ marginLeft: 8 }}>
                Selected {selectedRowKeys.length} items
              </span>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <Input.Search
            placeholder="Search products..."
            style={{ width: 200 }}
            onSearch={handleSearch}
            allowClear
            onChange={(e) => {
              if (!e.target.value) {
                setSearchTerm("");
              }
            }}
          />
          <NavLink to="/add-eyeglass">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </NavLink>
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
            <Button icon={<DownloadOutlined />}>
              Export <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        size="middle"
        rowSelection={rowSelection}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
    </>
  );
};

export default Inventory;
