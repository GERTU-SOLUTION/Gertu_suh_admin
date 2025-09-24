"use client";

import React from "react";
import { Table as AntTable, Button, Input, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProperties } from "@/app/provider/PropertiesProvider";
import { AnyObject } from "antd/es/_util/type";
import { parseAsFloat, parseAsString, useQueryState } from "nuqs";
import AddProperties from "./addProperties";

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);
const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, style } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    "Input a unit number"
  );

  return (
    <Tooltip trigger={["focus"]} title={title} placement="topLeft">
      <Input
        style={style}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a unit number"
        maxLength={16}
      />
    </Tooltip>
  );
};

const CustomTable: React.FC = () => {
  const { properties, totalPage } = useProperties();
  const [page, setPage] = useQueryState("page", parseAsFloat.withDefault(1));
  const [value, setValue] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const columns: TableColumnsType = [
    {
      title: "№",
      key: "index",
      fixed: "left",
      width: 60,
      render: (_: unknown, __: AnyObject, index: number) => index + 1,
    },
    { title: "Floor", dataIndex: "floor", key: "floor" },
    {
      title: "Unit Number",
      dataIndex: "unitNumber",
      key: "unitNumber",
      fixed: "left",
    },
    { title: "Property Type", dataIndex: "propertyType", key: "propertyType" },
    {
      title: "Ownership Status",
      dataIndex: "ownershipStatus",
      key: "ownershipStatus",
    },
    { title: "Bedrooms", dataIndex: "bedrooms", key: "bedrooms" },
    { title: "Bathrooms", dataIndex: "bathrooms", key: "bathrooms" },
    { title: "Area (m²)", dataIndex: "squareMeters", key: "squareMeters" },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      render: (_: unknown) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="hover:text-green-500"
              aria-label="Edit property"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              className="hover:text-red-500"
              aria-label="Delete property"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const dataSource = properties.map((prop) => ({
    key: prop?.id,
    unitNumber: prop.unit_number,
    propertyType: prop.property_type,
    ownershipStatus: prop.ownership_status,
    floor: prop.floor,
    bedrooms: prop?.bedrooms,
    bathrooms: prop?.bathrooms,
    squareMeters: prop?.square_meters,
    phoneNumber: prop?.pre_registered_phone ?? null,
  }));

  return (
    <div className="w-full mt-10">
      <div className="flex justify-between items-center mb-8">
        <NumericInput
          style={{ width: 220 }}
          value={value}
          onChange={setValue}
        />
        <AddProperties />
      </div>
      <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <AntTable
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
          pagination={{
            pageSize: totalPage?.limit,
            total: totalPage?.total,
            current: page,
            onChange: (p) => setPage(p),
            position: ["bottomCenter"],
          }}
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content", y: "max-content" }}
          bordered={false}
          size="middle"
          tableLayout="auto"
          locale={{ emptyText: "No properties found" }}
        />
      </div>
    </div>
  );
};

export default CustomTable;
