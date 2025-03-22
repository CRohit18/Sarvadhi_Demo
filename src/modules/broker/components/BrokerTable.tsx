import React from "react";
import { Table, Checkbox, Button } from "antd";
import type { TableProps } from "antd";

interface BrokerTableProps {
  formData: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: boolean) => void;
}

const BrokerTable: React.FC<BrokerTableProps> = ({ formData, onEdit, onDelete, onStatusChange }) => {
  const columns: TableProps<any>["columns"] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email ID", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Broker Rate", dataIndex: "brokerRate", key: "brokerRate" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      render: (_, record) => (
        <Checkbox checked={record.status} onChange={() => onStatusChange(record.id, record.status)} />
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{display:"flex",gap:"10px"}}>
          <Button type="link" className="common-edit-btn" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="link" className="common-btn" danger onClick={() => onDelete(record.id)}>Delete</Button>
        </div>
      )
    }
  ];

  return<div className="broker-table-container"> <Table columns={columns} dataSource={formData} rowKey="id" /> </div>;
};

export default BrokerTable;
