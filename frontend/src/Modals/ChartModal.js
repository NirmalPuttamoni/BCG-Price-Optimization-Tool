import { Modal } from 'antd';
import "./modal.scss"
import LineChart from "../Charts/LineChart";

const ChartModal = ({
    isChartOpen,
    setIsChartOpen,
    data
}) => {
    console.log(data, isChartOpen)
    const handleCancel = () => {
        setIsChartOpen(false);
    };

    return (
        <>
            <Modal
                title="Demand Forecast"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isChartOpen}
                footer={null}
                centered
                onCancel={handleCancel}
            >
                <LineChart setIsChartOpen={setIsChartOpen} data={data}></LineChart>
            </Modal>
        </>
    );
};
export default ChartModal;