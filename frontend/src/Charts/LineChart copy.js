import { useEffect, useRef } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import ZoomPlugin from 'chartjs-plugin-zoom';

const LineChart = (props) => {

    const { options, data } = props;
    ChartJS.register(...registerables, ZoomPlugin);
    const chartRef = useRef(null);
    const didMountRef = useRef(false);
    console.log(data)
    useEffect(() => {
        const canvasRef = chartRef.current;
        if (didMountRef.current) {
            if (canvasRef) {
                const chartTest = new ChartJS(canvasRef.getContext('2d'), options);
                return () => {
                    chartTest.destroy();
                }
            }
        } else didMountRef.current = true;
    }, [data])

    return (
        <div>
            <canvas ref={chartRef} id="myChart" ></canvas>
        </div>
    );
}

export default LineChart;