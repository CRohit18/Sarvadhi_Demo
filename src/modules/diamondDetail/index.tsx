import { Form, Input, Button, notification } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import DiamondTable from "./components/DiamondTable";
import conf from "@/conf/conf";

const API_URL = `${conf.APIUrl}/diamonds`;

const Diamond = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<any[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [editingKey, setEditingKey] = useState<string | null>(null);

    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setFormData(response.data);
        });
    }, []);

    // Generate Stock No (7-digit number + 3 uppercase letters)
    const generateStockNo = () => {
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        const randomLetters = String.fromCharCode(
            65 + Math.floor(Math.random() * 26),
            65 + Math.floor(Math.random() * 26),
            65 + Math.floor(Math.random() * 26)
        );
        return `${randomNumber}${randomLetters}`;
    };

    // Auto-calculate PPC and Total Amount
    const calculateValues = () => {
        const values = form.getFieldsValue();
        const rapPrice = parseFloat(values.rapPrice) || 0;
        const discount = parseFloat(values.discount) / 100 || 0;
        const carat = parseFloat(values.carat) || 0;

        const ppc = rapPrice + rapPrice * discount;
        const totalAmount = ppc * carat;

        form.setFieldsValue({
            ppc: ppc.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
        });
    };

    const onFinish = async (values: any) => {
        if (editingKey !== null) {
            await axios
                .put(`${API_URL}/${editingKey}`, values)
                .then(() => {
                    setFormData(
                        formData.map((item) =>
                            item.id === editingKey ? { ...values, id: editingKey } : item
                        )
                    );
                    setEditingKey(null);
                    form.resetFields();
                    api.success({ message: "Diamond updated successfully" });
                })
                .catch(() => {
                    api.error({ message: "Something went wrong" });
                });
        } else {
            const newDiamond = { ...values, id: Date.now() };
            await axios
                .post(API_URL, newDiamond)
                .then(() => {
                    form.resetFields();
                    setFormData([...formData, newDiamond]);
                    api.success({ message: "Diamond added successfully" });
                })
                .catch(() => {
                    api.error({ message: "Something went wrong" });
                });
        }
    };

    const onReset = () => {
        form.resetFields();
        setEditingKey(null);
    };

    const handleEdit = (record: any) => {
        form.setFieldsValue(record);
        setEditingKey(record.id);
    };

    const handleDelete = async (id: string) => {
        await axios
            .delete(`${API_URL}/${id}`)
            .then(() => {
                setFormData(formData.filter((item) => item.id !== id));
                api.success({ message: "Diamond deleted successfully" });
            })
            .catch(() => {
                api.error({ message: "Something went wrong" });
            });
    };
    return (
        <>
            {contextHolder}
            <div className="broker-detail-section-main">
                <div className="broker-detail-section">
                    <label>Diamond Details</label>
                    <div className="form-container">
                        <Form
                            form={form}
                            onFinish={onFinish}
                            layout="vertical"
                            className="broker-detail-form"
                            onValuesChange={calculateValues}
                            initialValues={{ stockNo: generateStockNo() }}

                        >
                            <div>
                                <Form.Item label="Stock No" name="stockNo" >
                                    <Input disabled placeholder="Auto-generated" />
                                </Form.Item>
                                <Form.Item
                                    label="RAP Price"
                                    name="rapPrice"
                                    rules={[{ required: true, pattern: /^\d+(\.\d+)?$/, message: "Enter valid RAP price" }]}
                                >
                                    <Input placeholder="Enter RAP Price" />
                                </Form.Item>
                            </div>
                            <div>

                                <Form.Item
                                    label="Carat"
                                    name="carat"
                                    rules={[{ required: true, pattern: /^\d+(\.\d+)?$/, message: "Enter valid carat value" }]}
                                >
                                    <Input placeholder="Enter Carat" />
                                </Form.Item>
                                <Form.Item
                                    label="Disc %"
                                    name="discount"
                                    rules={[
                                        { required: true, message: "Enter discount %" },
                                        { pattern: /^-\d+(\.\d+)?$/, message: "Discount must be negative (e.g., -10)" },
                                    ]}
                                >
                                    <Input placeholder="Enter Discount %" />
                                </Form.Item>
                            </div>
                            <div>


                                <Form.Item
                                    label="Shape"
                                    name="shape"
                                    rules={[{ required: true, message: "Please enter shape" }]}
                                >
                                    <Input placeholder="Enter Shape" />
                                </Form.Item>
                                <Form.Item label="PPC" name="ppc">
                                    <Input disabled placeholder="Auto-calculated" />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Color"
                                    name="color"
                                    rules={[{ required: true, message: "Please enter color" }]}
                                >
                                    <Input placeholder="Enter Color" />
                                </Form.Item>
                                <Form.Item label="Total Amount" name="totalAmount">
                                    <Input disabled placeholder="Auto-calculated" />
                                </Form.Item>

                            </div>
                            <div>
                                <Form.Item
                                    label="Clarity"
                                    name="clarity"
                                    rules={[{ required: true, message: "Please enter clarity" }]}
                                >
                                    <Input placeholder="Enter Clarity" />
                                </Form.Item>




                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {editingKey ? "Update" : "Add"}
                                    </Button>
                                    <Button type="default" onClick={onReset} style={{ marginLeft: 8 }}>
                                        Reset
                                    </Button>
                                </Form.Item>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>

            <DiamondTable formData={formData} onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
};

export default Diamond;
