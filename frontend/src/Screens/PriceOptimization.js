import { Col, Divider, Row, Select, Switch, Table } from "antd";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./createAndManageProduct.scss";
import { ArrowLeftOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { GetAllProducts } from "../Api/Products";
import { pricing_optimization_columns } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts, setFilteredProductsByCategory, setProducts } from "../Redux/ProductSlice";


const PriceOptimization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("Nirmal");
  const [category, setCategory] = useState(null);
  const [category_options, setCategoryOptions] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { allProducts, filteredProducts } = useSelector((state) => state.product);

  const handleChange = (event) => {
    setCategory(event);
    dispatch(setFilteredProductsByCategory(event));
  }

  const handleBackButton = () => {
    navigate("/");
  }

  const handleSwitchChange = (checked) => {
    console.log(`Switch to ${checked}`);
  }

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    setUser(userDetails?.username);

    const fetchData = async () => {
      try {
        const response = await GetAllProducts(navigate);

        if (response?.success) {
          dispatch(setProducts(response?.products))
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate, dispatch]);

  useEffect(() => {
    setCategory("All Categories");
    const options = allProducts.map((item, idx) => ({
      value: item.category,
      label: item.category,
      key: idx
    }));
    options.unshift({ value: "All Categories", label: "All Categories", key: -1 });
    setCategoryOptions(options);
  }, [allProducts]);

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  return (
    <div className="manage-product-page">
      <Row className="nav-header">
        <Col span={21} className="green-color">
          Price Optimization Tool
        </Col>
        <Col span={2}>
          Welcome,  <span className="green-color">{user}</span>
        </Col>
        <Col span={1}>
          <UserOutlined style={{ fontSize: "20px" }} />
        </Col>
      </Row>
      <Row className="nav-ribbon">
        <Col span={2} >
          <ArrowLeftOutlined
            className="green-color"
            style={{ fontSize: "15px", marginRight: "2px" }}
            onClick={handleBackButton}
          />
          <span style={{ marginRight: "4px", cursor: "pointer" }} onClick={handleBackButton}>Back</span>
          <Divider type="vertical" className="custom-divider" />
        </Col>
        <Col span={10}>
          <Row justify="space-between" align="middle">
            <Col>
              Pricing Optimization
            </Col>
            <Col style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Switch defaultChecked onChange={handleSwitchChange} className="custom-switch" size="small" />
              <span>With Demand Forecast</span>
            </Col>
            <Col>
              <Divider type="vertical" className="custom-divider" />
            </Col>
          </Row>
        </Col>
        <Col span={11}>
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <Input
                className="custom-search-input"
                placeholder="Search"
                onChange={(e) => dispatch(setFilteredProducts(e.target.value))}
                prefix={<SearchOutlined className="green-color" />}
                style={{ position: "static", backgroundColor: "black", border: "0.5px solid #00f2c2", color: "white" }}
              />
            </Col >
            <Col span={2}>
              <span style={{ color: 'white' }}>Category:</span>
            </Col>
            <Col span={5}>
              <Select
                value={category}
                options={category_options}
                onChange={(event) => handleChange(event)}
                className="category-dropdown"
              />
            </Col>
            <Col span={2}>
              <Select
                className="custom-filter"
                value={"Filter"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="table-container">
        <Table rowKey="id" rowSelection={rowSelection} columns={pricing_optimization_columns} dataSource={filteredProducts} bordered className="table" pagination={{ pageSize: 7 }} />
      </div>
    </div>
  )
}

export default PriceOptimization;