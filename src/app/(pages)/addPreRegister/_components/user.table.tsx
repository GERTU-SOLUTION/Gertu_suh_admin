"use client";

import React from "react";
import { Table as AntTable, Tooltip, Button } from "antd";
import type { TableColumnsType } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { User, useUser } from "@/app/provider/UserProvider";
import { parseAsFloat, useQueryState } from "nuqs";

const UserTable: React.FC = () => {
  const { users, totalPage } = useUser();
  const [page, setPage] = useQueryState("page", parseAsFloat.withDefault(1));
  const columns: TableColumnsType<User> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Phone", dataIndex: "mobile_phone", key: "mobile_phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    // { title: "Role", dataIndex: "role", key: "role" },
    // {
    //   title: "Email Verified",
    //   dataIndex: "email_verified",
    //   key: "email_verified",
    //   render: (val: boolean) => (val ? "✅" : "-"),
    // },
    // {
    //   title: "Phone Verified",
    //   dataIndex: "phone_verified",
    //   key: "phone_verified",
    //   render: (val: boolean) => (val ? "✅" : "-"),
    // },
    // {
    //   title: "Created At",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: () => (
        <div className="flex gap-2">
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

  return (
    <div className="w-full mt-5 lg:w-[60%]">
      <AntTable<User>
        className={`
        [&_.ant-table-thead>tr>th]:bg-gray-50
        [&_.ant-table-thead>tr>th]:font-semibold
        [&_.ant-table-tbody>tr:nth-child(odd)>td]:bg-white
        [&_.ant-table-tbody>tr:nth-child(even)>td]:bg-gray-50
        [&_.ant-table-tbody>tr:hover>td]:bg-blue-50
      `}
        rowKey="id"
        columns={columns}
        dataSource={users}
        pagination={{
          pageSize: totalPage?.limit,
          total: totalPage?.total,
          current: page,
          onChange: (p) => setPage(p),
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default UserTable;
