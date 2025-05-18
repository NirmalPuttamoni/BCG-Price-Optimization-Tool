import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { AddProduct } from "../Api/Products";
import "./modal.scss"

const AddNewProductModal = ({
    isModalOpen,
    setIsModalOpen
}) => {

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {

        const response = await AddProduct(values);
        if (response) {
            message.success("Product added successfully");
            console.log("Product added successfully");
        } else {
            message.error("Failed to add product");
            console.log("Failed to add product");
        }
        setIsModalOpen(false);
    }
    return (
        <>
            <Modal
                title="Add New Products"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                footer={null}
                // onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form layout="vertical" initialValues={""} onFinish={onFinish}>
                    <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 14 }}>
                        <Col span={24}>
                            <Form.Item
                                label="Product Name"
                                name="name"
                                className="custom-label"
                                rules={[{ required: true, message: "Product name is required!" }]}
                            >
                                <Input placeholder="Enter the Product name" className="custom-input"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Product Category"
                                name="category"
                                className="custom-label"
                                rules={[{ required: true, message: "Product Category is required!" }]}
                            >
                                <Input placeholder="Enter the Product name" className="custom-input"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                                <Col span={12}>
                                    <Form.Item
                                        className="custom-label"
                                        label="Cost Price"
                                        name="cost_price"
                                        rules={[
                                            { required: true, message: "Cost Price is required!" },
                                        ]}
                                    >
                                        <Input type="number" placeholder="Enter the Cost Price" className="custom-input"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        className="custom-label"
                                        label="Selling Price"
                                        name="selling_price"
                                        rules={[
                                            { required: true, message: "Selling Price is required!" },
                                        ]}
                                    >
                                        <Input type="number" placeholder="Enter the Selling Price" className="custom-input"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                                <Col span={12}>
                                    <Form.Item
                                        className="custom-label"
                                        label="Available Stock"
                                        name="stock_available"
                                        rules={[
                                            { required: true, message: "Available stock is required!" },
                                        ]}
                                    >
                                        <Input type="number" placeholder="Enter the available stock" className="custom-input"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        className="custom-label"
                                        label="Units Sold"
                                        name="units_sold"
                                        rules={[
                                            { required: true, message: "Units sold is required!" },
                                        ]}
                                    >
                                        <Input type="number" placeholder="Enter the units sold" className="custom-input"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                className="custom-label"
                                label="Description"
                                name="description"
                                rules={[
                                    { required: true, message: "Description is required!" },
                                ]}
                            >
                                <TextArea rows="4" placeholder="Enter the description" className="custom-input"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Row justify="end" gutter={16}>
                            <Col>
                                <Button block onClick={handleCancel} style={{ backgroundColor: "black", color: "white" }}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    style={{ fontSize: "1rem", fontWeight: "600" , backgroundColor: "#00f2c2", color: "black" }}
                                >
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default AddNewProductModal;