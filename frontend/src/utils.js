import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const pricing_optimization_columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: 'Product Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 400,
    },
    {
        title: 'Cost Price',
        dataIndex: 'cost_price',
        key: 'cost_price',
        render: (text) => <span>$ {text}</span>
    },
    {
        title: 'Selling Price',
        dataIndex: 'selling_price',
        key: 'selling_price',
        render: (text) => <span>$ {text}</span>
    },
    {
        title: 'Optimized Price',
        dataIndex: 'optimized_price',
        key: 'optimized_price',
        render: (text) => {
            const value = optimization_function(text)
            return (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#bfbfbf" }}>$ {text}</span>
                    <span style={{ color: "#00f2c2" }}>$ {value}</span>
                </div>)
        }
    }
];

const optimization_function = (value) => {
    // Dummy optimization function  
    return Number(value * 1.2).toFixed(2);
}

export const manage_product_columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Cost Price',
      dataIndex: 'cost_price',
      key: 'cost_price',
      render: (text) => <span>$ {text}</span>
    },
    {
      title: 'Selling Price',
      dataIndex: 'selling_price',
      key: 'selling_price',
      render: (text) => <span>$ {text}</span>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
    },
    {
      title: 'Available Stock',
      dataIndex: 'stock_available',
      key: 'stock_available',
    },
    {
      title: 'Units Sold',
      dataIndex: 'units_sold',
      key: 'units_sold',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, data) => {
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={() => { }}>
              <EyeOutlined />
            </Button>
            <Button onClick={() => {
              // setIsModalOpen(true);
              // setSelectedMovie(data);
              // setFormType("edit");
            }}>
              <EditOutlined />
            </Button>
            <Button onClick={() => {
            //   setIsDeleteModalOpen(true);
            }}>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </div>
        );
      }
    },
  ];