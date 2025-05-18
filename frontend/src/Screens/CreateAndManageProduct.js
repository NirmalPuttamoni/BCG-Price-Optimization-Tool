import { Button, Col, Divider, Input, Row, Select, Switch, Table } from "antd";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./createAndManageProduct.scss";
import { ArrowLeftOutlined, CalculatorFilled, PlusCircleFilled, SearchOutlined, UserOutlined } from "@ant-design/icons";
import AddNewProductModal from "../Modals/AddNewProductModal";
import { GetAllProducts } from "../Api/Products";
import { manage_product_columns } from "../utils";
import ChartModal from "../Modals/ChartModal";
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setFilteredProducts, setFilteredProductsByCategory } from "../Redux/ProductSlice";

const CreateAndManageProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("Nirmal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [category_options, setCategoryOptions] = useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const {allProducts, filteredProducts} = useSelector((state) => state.product);

  const handleChange = (event) => {
    setCategory(event);
    dispatch(setFilteredProductsByCategory(event));
  }
  
  const handleBackButton = () => {
    navigate("/");
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
  }, []);

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

  const handleSwitchChange = (checked) => {
    console.log(`Switch to ${checked}`);
  }

  const rowSelection = {
  onChange: (_, selectedRowsData) => {
    // setSelectedRowKeys(selectedRowIds); 
    setSelectedRows(selectedRowsData);
  },
};
  // console.log(selectedRows)
  return (
    <div className="create-and-manage-product">
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
        <Col span={7}>
          <Row justify="space-between" align="middle">
            <Col>
              Create and Manage Product
            </Col>
            <Col style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Switch defaultChecked onChange={handleSwitchChange} className="custom-switch" size="small"/>
              <span>With Demand Forecast</span>
            </Col>
            <Col>
              <Divider type="vertical" className="custom-divider" />
            </Col>
          </Row>
        </Col>
        <Col span={10}>
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
            <Col span={1}>
              <Divider type="vertical" className="custom-divider"></Divider>
            </Col>
          </Row>
        </Col>
        <Col span={5}>
          <Row gutter={16} justify="space-between" align="middle">
            <Col span={12} align="middle">
              <Button className="custom-button" onClick={() => { setIsModalOpen(true) }}>
              <PlusCircleFilled />
                Add New Products
              </Button>
            </Col>
            <Col span={12} align="middle">
              <Button className="custom-button" onClick={ () => { setIsChartOpen(true) }}>
                <CalculatorFilled />
                Demand Forecast
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="table-container">
        <Table rowKey="id" rowSelection={rowSelection} columns={manage_product_columns} dataSource={filteredProducts} bordered className="table" pagination={{ pageSize: 6 }} />
      </div>
      {isModalOpen && (
        <AddNewProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        // formType={formType}
        // getData={getData}
        />
      )}
      {isChartOpen && (
        <ChartModal
          isChartOpen={isChartOpen}
          setIsChartOpen={setIsChartOpen}
          data={selectedRows}
        />
      )}
    </div>
  )
}

export default CreateAndManageProduct