"use client";

import { useUser } from "@/app/provider/UserProvider";
import { Table } from "antd";

export const UserAmenities = () => {
  const { amenities, loading } = useUser();

  const columns = [
    {
      title: "Дугаар",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Тоот",
      dataIndex: "unit_number",
      key: "unit_number",
    },
    {
      title: "Давхар",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "Төрал",
      dataIndex: "amenity_type",
      key: "amenity_type",
    },
  ];

  return (
    <div className="mt-10">
      <p className="font-medium text-sm mb-2">Оршин суугчийн</p>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={Array.isArray(amenities) ? amenities : []}
        columns={columns}
        pagination={false}
        bordered
        locale={{ emptyText: "No data" }} // custom empty text
      />
    </div>
  );
};
