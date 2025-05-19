import { Button, Input, Form, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../Api/Users";
import {
    UserOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
} from "@ant-design/icons";

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            console.log(response)
            if (response?.success) {
                message.success(response?.message || "Login successful");
                localStorage.setItem("user_details", JSON.stringify({ token: response?.token || "", username: response?.user, role: response?.role }));
                navigate("/");
            }else{
                message.error(response?.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    };

    return (
        <>
            <main className="login-page">
                <h1 className="green-color" style={{ display: "flex", gap: "10px", height: "30px" }}>
                    Login
                </h1>
                <section className="login-section">
                    <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                        >
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                className="login-label"
                                placeholder="Enter your email"
                                prefix={<UserOutlined />}
                                autoComplete="email"
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input.Password
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                autoComplete="off"
                            ></Input.Password>
                        </Form.Item>
                        <Form.Item className="d-block">
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    backgroundColor: "rgb(24, 144, 255)",
                                }}
                                block
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Form.Item >
                        <Row justify="center">
                            <Col>
                                <span style={{ fontSize: "16px" }}>Or</span>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Col>
                                <Link to="/register">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            backgroundColor: "green",
                                        }}
                                    >
                                        Create new account
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form.Item>
                </section>
            </main>
        </>
    );
};

export default Login;