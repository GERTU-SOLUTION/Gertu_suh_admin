"use client";

import React from "react";
import { Table as AntTable, Button, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    fixed: "left",
    sorter: (a, b) => a.age - b.age,
  },
  { title: "Column 1", dataIndex: "address", key: "1" },
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    render: () => (
      <div className="flex gap-2">
        <Tooltip title="View">
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="hover:text-blue-500"
          />
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="hover:text-green-500"
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            className="hover:text-red-500"
          />
        </Tooltip>
      </div>
    ),
  },
];

const dataSource: DataType[] = [
  { key: "1", name: "Olivia", age: 32, address: "New York Park" },
  { key: "2", name: "Ethan", age: 40, address: "London Park" },
  { key: "3", name: "Sophia", age: 28, address: "Sydney Park" },
];

const CustomTable: React.FC = () => {
  return (
    <div className="rounded-lg w-full shadow-sm border border-gray-200 overflow-hidden">
      <AntTable<DataType>
        className={`
          [&_.ant-table-thead>tr>th]:bg-gray-50
          [&_.ant-table-thead>tr>th]:font-semibold
          [&_.ant-table-thead>tr>th]:sticky
          [&_.ant-table-thead>tr>th]:top-0
          [&_.ant-table-thead>tr>th]:z-10

          [&_.ant-table-tbody>tr:nth-child(odd)>td]:bg-white
          [&_.ant-table-tbody>tr:nth-child(even)>td]:bg-gray-50
          [&_.ant-table-tbody>tr:hover>td]:bg-blue-50
        `}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "100%", y: 300 }}
        bordered={false}
        size="middle"
        tableLayout="auto"
      />
    </div>
  );
};

export default CustomTable;
