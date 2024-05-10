import { Col, Row, Spin } from "antd";
import { useGetAllEyeglassesQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import EyeglassCard from "../../components/ui/Cards/EyeglassCard";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { TQueryParams } from "../../types/global.type";

const Sell = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: eyeglassData, isFetching } = useGetAllEyeglassesQuery(params);

  const onSearch = (value: string) => {
    setParams([{ name: "searchTerm", value }]);
  };

  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 20 }}
        size="large"
        allowClear
      />
      {isFetching ? (
        <Spin fullscreen tip="Loading" size="large"></Spin>
      ) : (
        <Row gutter={8}>
          {eyeglassData?.data?.map((eyeglass) => (
            <Col span={6}>
              <EyeglassCard key={eyeglass._id} eyeglass={eyeglass} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Sell;
