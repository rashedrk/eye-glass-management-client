import { Col,  Row, Spin } from "antd";
import { useGetAllEyeglassesQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import EyeglassCard from "../../components/ui/Cards/EyeglassCard";

const Sell = () => {
  const { data: eyeglassData, isFetching } =
    useGetAllEyeglassesQuery(undefined);

  return (
    <>
      {isFetching ? (
        <Spin tip="Loading" size="large"></Spin>
      ) : (
        <Row gutter={8}>
          {eyeglassData?.data?.map((eyeglass) => (
            <Col span={6}><EyeglassCard key={eyeglass._id} eyeglass={eyeglass} /></Col>
          ))}
          </Row>
      )}
    </>
  );
};

export default Sell;
