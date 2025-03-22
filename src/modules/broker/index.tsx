import { Form, Input, Button, Checkbox, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import axios from "axios";
import BrokerTable from "./components/BrokerTable";
import { notification } from 'antd';
import { brokerAdded, brokerDeleted, brokerStatusChanged, brokerUpdated, somethingWentWrong } from "@/constants/SchemaValidation";
import conf from "@/conf/conf";

const API_URL = `${conf.APIUrl}/brokers`;

const Broker = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [editingKey, setEditingKey] = useState<string | null>(null);

  // Fetch data from db.json on mount
  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // Handle Form Submission
  const onFinish = async (values: any) => {
    if (editingKey !== null) {
      // Update Broker in db.json
      await axios.put(`${API_URL}/${editingKey}`, values).then(() => {
        setFormData(formData.map(item => (item.id === editingKey ? { ...values, id: editingKey } : item)));
        setEditingKey(null);
        form.resetFields();

        api.success({
          message: brokerUpdated
        });
      }).catch(() => {
        api.error({
          message: somethingWentWrong
        });
      });

    } else {
      // Add New Broker
      const newBroker = { ...values, id: Date.now() };
      await axios.post(API_URL, newBroker).then(() => {
        form.resetFields();
        setFormData([...formData, newBroker]);


        api.success({ message: brokerAdded })
      }).catch(() => {
        api.error({ message: somethingWentWrong })

      });
    }
  };

  // Reset Form
  const onReset = () => {
    form.resetFields();
    setEditingKey(null);
  };

  // Handle Edit - Prefill the form
  const handleEdit = (record: any) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  // Handle Delete - Remove broker from db.json
  const handleDelete = async (id: string) => {
    debugger
    await axios.delete(`${API_URL}/${id}`).then(() => {
      setFormData(formData.filter((item) => item.id !== id));
      api.success({ message: brokerDeleted })
    }).catch(() => {
      api.error({ message: somethingWentWrong })

    });
  };

  // Handle Status Toggle
  const handleStatusChange = async (id: number | string, status: boolean) => {
    await axios.put(`${API_URL}/${id}`, { ...formData.find(item => item.id === id), status: !status }).then(() => {
      api.success({ message: brokerStatusChanged })

    }).catch(() => {
      api.error({ message: somethingWentWrong })

    });
  };



  return (
    <>
      {contextHolder}
      <div className="broker-detail-section-main">
        <div className="broker-detail-section">
          <label>Broker Details</label>
          <div className="form-container">
            <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ status: true }} className="broker-detail-form">
              <div className="w-100">
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                  <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item label="Broker Rate" name="brokerRate" rules={[{ required: true, pattern: /^[0-9]+%$/, message: "Enter percentage (e.g., 10%)" }]}>
                  <Input placeholder="Enter Broker Rate" />
                </Form.Item>
              </div>
              <div className="w-100">
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                  <Input placeholder="Enter Email" />
                </Form.Item>
                <Form.Item name="status" valuePropName="checked">
                  <Checkbox>Status</Checkbox>
                </Form.Item>
              </div>
              <div className="w-100">
                <Form.Item label="Phone No" name="phone" rules={[{ required: true, pattern: /^[0-9]+$/, message: "Enter a valid phone number" }]}>
                  <Input placeholder="Enter Number" />
                </Form.Item>
                </div>
              <div className="w-100">
                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter your address" }]}>
                  <TextArea placeholder="Enter Address" style={{ height: "31px", width: "258px" }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {editingKey ? "Update" : "Add"}
                  </Button>
                  <Button type="default" className="common-btn" onClick={onReset} style={{ marginLeft: 8 }}>
                    Reset
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <BrokerTable formData={formData} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
    </>
  );
};

export default Broker;
