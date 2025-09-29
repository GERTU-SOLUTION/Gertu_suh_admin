/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Building, useBuilding } from "@/app/provider/BuildingProvider";
import { parseAsFloat, useQueryState } from "nuqs";
import AddBuilding from "./add-building";


type BuildingTableRow = {
  key: number;
  id: number;
  number: string | number;
  name: string;
  complex: string;
  address: string;
  image: string;
  hoa: string;
  phone: string;
};

const BuildingTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<keyof BuildingTableRow | "">("");
  const searchInput = useRef<InputRef>(null);
  const [complex] = useQueryState("complex", parseAsFloat.withDefault(1));

  const { building, totalPage } = useBuilding();

  const queryParams = new URLSearchParams();
  if (complex !== 0) queryParams.append("complex", complex.toString());
  const [page, setPage] = useQueryState("page", parseAsFloat.withDefault(1));

  const complexId = queryParams.get("complex");
  const [com, setCom] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCom(localStorage.getItem("selectedComplex"));
    }
  }, []);

  const data: BuildingTableRow[] =
    building
      ?.filter(
        (b: Building) =>
          b.complex?.id?.toString() === complexId ||
          b.complex?.id?.toString() === com
      )
      .map((b: Building) => ({
        key: b.id,
        id: b.id,
        number: b.building_number ?? "",
        name: b.name,
        complex: b.complex?.name ?? "-",
        address: b.complex?.address ?? "-",
        image: b.complex?.image ?? "",
        hoa: b.complex?.hoa?.name ?? "-",
        phone: b.complex?.hoa?.phone ?? "-",
      })) ?? [];

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: keyof BuildingTableRow
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof BuildingTableRow
  ): TableColumnType<BuildingTableRow> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={close}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]!.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text: string | number | undefined) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<BuildingTableRow> = [
    {
      title: "№",
      dataIndex: "number",
      key: "number",
      width: "10%",
      ...getColumnSearchProps("number"),
    },
    {
      title: "Building Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Complex",
      dataIndex: "complex",
      key: "complex",
      width: "20%",
      ...getColumnSearchProps("complex"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "30%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="complex"
            style={{
              width: 80,
              height: 60,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "HOA",
      dataIndex: "hoa",
      key: "hoa",
      ...getColumnSearchProps("hoa"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <AddBuilding />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        className=" border rounded-lg border-gray-200"
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

export default BuildingTable;
