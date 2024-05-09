import {
  Button,
  Dropdown,
  Image,
  MenuProps,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useGetAllEyeglassesQuery } from "../../../redux/features/eyeGlass/eyeglassApi";
import { TEyeglass } from "../../../types";
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
import { TQueryParams } from "../../../types/global.type";
import { MoreOutlined } from "@ant-design/icons";
import EditEyeglassModal from "../../../components/ui/Modals/EditEyeglassModal";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [eyeglassId, setEyeglassId] = useState("");
  const { data: eyeglassData, isFetching } = useGetAllEyeglassesQuery(params);

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
    console.log(data.key);
    if (data.key === "edit") {
      setIsModalOpen(true);
    }
  };

  //for modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const menuProps = {
    items,
    onClick: handleMoreDropdown,
  };

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
      render: (item) => (
        <Dropdown menu={menuProps} placement="bottom" trigger={["click"]} arrow>
          <Button onClick={() => setEyeglassId(item.key)} size="small">
            <MoreOutlined />
            <EditEyeglassModal eyeglass={item} isModalOpen={isModalOpen} handleCancel={handleCancel} />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const tableData = eyeglassData?.data?.map(
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
    }) => ({
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

  const handleBulkDelete = () => {};

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleBulkDelete}
          disabled={!hasSelected}
          loading={isFetching}
        >
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        size="middle"
        rowSelection={rowSelection}
      />
    </>
  );
};

export default Inventory;
