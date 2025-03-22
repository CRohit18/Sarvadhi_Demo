import React from "react";
import { Table, Button } from "antd";
import type { TableProps } from "antd";

interface DiamondTableProps {
  formData: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
}

const columns: TableProps<any>["columns"] = [
  { title: "Stock No", dataIndex: "stockNo", key: "stockNo" },
  { title: "Carat", dataIndex: "carat", key: "carat" },
  { title: "Shape", dataIndex: "shape", key: "shape" },
  { title: "Color", dataIndex: "color", key: "color" },
  { title: "Clarity", dataIndex: "clarity", key: "clarity" },
  { title: "RAP Price", dataIndex: "rapPrice", key: "rapPrice" },
  { title: "Disc %", dataIndex: "discount", key: "discount" },
  { title: "PPC", dataIndex: "ppc", key: "ppc" },
  { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
  {
    title: "Actions",
    key: "actions",
    render: (record) => (
      <div style={{display:'flex',gap:"10px"}}>
        <Button className="common-edit-btn" onClick={() => record.onEdit(record)} type="link">Edit</Button>
        <Button className="common-btn" onClick={() => record.onDelete(record.id)} type="link" danger>
          Delete
        </Button>
      </div>
    ),
  },
];

const DiamondTable: React.FC<DiamondTableProps> = ({ formData, onEdit, onDelete }) => {
  return <Table columns={columns} dataSource={formData.map(item => ({ ...item, onEdit, onDelete }))} rowKey="id" />;
};

export default DiamondTable;
