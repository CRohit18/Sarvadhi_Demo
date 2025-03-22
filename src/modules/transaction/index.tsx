import { ComingSoon } from "@/constants/images";
import { Table } from "antd";

const Transaction = () => {
    const brokerDetails = {
        broker: "Bhavesh Shah",
        email: "ChristopherAnderson@gmail.com",
        phone: "9856784634",
        address: "123 Diamond St, Luxury City, NY 10001",
        brokerRate: "30%",
    };

    const summaryData = [
        {
            key: "1",
            summary: "Qty",
            total: "Total Quantity",
            selected: "Selected Diamond",
            billAmount: "Computed",
        },
        {
            key: "2",
            summary: "Total Cts",
            total: "Total Carats",
            selected: "Selected Diamond Crt",
            billAmount: "Computed",
        },
        {
            key: "3",
            summary: "Avg Dis",
            total: "Total Amount / Total Carat",
            selected: "Selected Total Amount / Selected Total Carat",
            billAmount: "Computed",
        },
        {
            key: "4",
            summary: "Total Amount",
            total: "Sum of Amount",
            selected: "Sum of Selected Diamond Amount",
            billAmount: "Computed",
        },
    ];

    const columns = [
        { title: "Summary", dataIndex: "summary", key: "summary" },
        { title: "Total", dataIndex: "total", key: "total" },
        { title: "Selected", dataIndex: "selected", key: "selected" },
        { title: "Bill Amount", dataIndex: "billAmount", key: "billAmount" },
    ];

    return (<>
    <label  className="information-label">* Note : Below data is static</label>
        <div className="broker-summary-container">
            <div className="broker-details">
                <h3>Broker Details</h3>
                <table>
                    <tbody>
                        <tr><td><b>Broker</b></td><td>{brokerDetails.broker}</td></tr>
                        <tr><td><b>Email</b></td><td>{brokerDetails.email}</td></tr>
                        <tr><td><b>Phone No</b></td><td>{brokerDetails.phone}</td></tr>
                        <tr><td><b>Address</b></td><td>{brokerDetails.address}</td></tr>
                        <tr><td><b>Broker Rate</b></td><td>{brokerDetails.brokerRate}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="summary-table">
                <h3>Summary</h3>
                <Table dataSource={summaryData} columns={columns} pagination={false} />
            </div>
        </div>
        <div className="img-sec">
            <img src={ComingSoon}/>
        </div>
    </>
    );
};

export default Transaction;
