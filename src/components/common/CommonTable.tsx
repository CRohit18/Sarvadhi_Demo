import { Table } from "antd";
import type { TableProps } from "antd";

interface CommonTableProps<T> {
  data?: T[]; // Dynamic data
  columns?: TableProps<T>["columns"]; // Dynamic columns
  loading?: boolean; // Loading state
  pagination?: TableProps<T>["pagination"]; // Pagination support
}

const CommonTable = <T extends object>({
  data = [],
  columns = [],
  loading = false,
  pagination = { pageSize: 10 }, // Default pagination
}: CommonTableProps<T>) => {
  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      rowKey={(record) => (record as any).id || (record as any).key} // Auto-detect row key
    />
  );
};

export default CommonTable;
