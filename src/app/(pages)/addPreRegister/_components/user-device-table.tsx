"use client";

import { useUser } from "@/app/provider/UserProvider";
import { Table } from "antd";

export const UserDeviceTable = () => {
  const { userVehicle, loading } = useUser();

  const columns = [
    {
      title: "Эзэмшигчийн нэр",
      dataIndex: "owner_name",
      key: "owner_name",
    },
    {
      title: "Машины марк",
      dataIndex: "vehicle_name",
      key: "vehicle_name",
    },
    {
      title: "Зөвшөөрөл",
      dataIndex: "is_active",
      key: "is_active",
      render: (value: boolean) => (value ? "Идэвхтэй" : "Идэвхгүй"),
    },
    {
      title: "Улсын дугаар",
      dataIndex: "license_plate",
      key: "license_plate",
    },
  ];

  return (
    <div className="">
      <p className="font-medium text-sm mb-2">
        Оршин суугчийн тээврийн хэрэгсэл
      </p>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={Array.isArray(userVehicle) ? userVehicle : []}
        columns={columns}
        pagination={false}
        bordered
        locale={{ emptyText: "Тээврийн хэрэгсэл байхгүй" }} // custom empty text
      />
    </div>
  );
};
