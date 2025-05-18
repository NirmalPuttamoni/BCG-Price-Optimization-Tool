import { Row, Col } from 'antd';
import { ArrowRightOutlined, AppstoreAddOutlined, LineChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const user_role = userDetails?.role;

    const navigate = useNavigate();
    const handleClick = (target) => {

        if (user_role === "admin") {
            navigate('/admin');
        } else if (user_role === "buyer") {
            navigate('/buyer');
        } else if (user_role === "supplier") {
            navigate('/supplier');
        }
        else if (user_role === "user") {
            if (target === "manage-product") {
                navigate('/manage-product');
            } else if (target === "price-optimization") {
                navigate('/price-optimization');
            }
        }

    };
    return (
        <div className="global-container">
            <Row justify="center">
                <Col span={20}>
                    <div className="container-header">
                        <h1>BCG <span className="green-color">X</span></h1>
                        <h1>Price Optimization Tool</h1>
                        <p>
                            This tool helps you to optimize your pricing strategy based on various factors.
                        </p>
                    </div>
                </Col>
            </Row>

            <Row className="cards-container" justify="center" gutter={24}>
                <Col span={5}>
                    <div className="card">
                        <AppstoreAddOutlined className="icon-size" />
                        <div>
                            <h2>Create and Manage Product</h2>
                            <p>
                                This tool helps you to create and manage your product effectively.
                            </p>
                        </div>
                        <ArrowRightOutlined className="icon-size green-color" onClick={() => handleClick("manage-product")} />
                    </div>
                </Col>
                <Col span={5}>
                    <div className="card">
                        <LineChartOutlined className="icon-size" />
                        <div>
                            <h2>Price Optimization</h2>
                            <p>
                                This tool helps you optimize your pricing strategy based on various factors.
                            </p>
                        </div>
                        <ArrowRightOutlined className="icon-size green-color" onClick={() => handleClick("price-optimization")} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
