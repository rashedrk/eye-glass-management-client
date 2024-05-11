import { Col, Empty, Pagination, Row, Spin } from "antd";
import { useGetAllEyeglassesQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import EyeglassCard from "../../components/ui/Cards/EyeglassCard";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { TQueryParams } from "../../types/global.type";

const Sell = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: eyeglassData, isLoading } = useGetAllEyeglassesQuery([
    { name: "page", value: page },
    { name: "limit", value: 12 },
    ...params,
  ]);

  const onSearch = (value: string) => {
    setParams([{ name: "searchTerm", value }]);
  };

  const metaData = eyeglassData?.meta;

  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 20 }}
        size="large"
        allowClear
      />
      {isLoading ? (
        <Spin fullscreen tip="Loading" size="large"></Spin>
      ) : eyeglassData?.data && eyeglassData?.data?.length > 0 ? (
        <>
        <Row gutter={8}>
          {eyeglassData?.data?.map((eyeglass) => (
            <Col span={24} md={{span: 12}} lg={{span: 6}}>
              <EyeglassCard key={eyeglass._id} eyeglass={eyeglass} />
            </Col>
          ))}
          
        </Row>
        
      </>
      ) : (
        <Empty />
      )}
      <Pagination
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
    </>
  );
};

export default Sell;
