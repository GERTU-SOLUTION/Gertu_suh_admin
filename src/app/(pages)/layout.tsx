/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd";
import { Menu, Select, Switch } from "antd";
import { useRouter } from "next/navigation";
import "../globals.css";
import { useComplexes } from "../provider/ComplexProvider";
import { parseAsFloat, useQueryState } from "nuqs";
import { PropertiesProvider } from "../provider/PropertiesProvider";
import { BuildingProvider } from "../provider/BuildingProvider";
import { UserProvider } from "../provider/UserProvider";


type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/dashboard",
    label: "Нүүр",
    icon: <MailOutlined />,
  },
  {
    key: "/residents",
    label: "Оршин суугчид",
    icon: <UserOutlined />,
    children: [
      { key: "/addPreRegister", label: "Бүртгэл" },
      { key: "/services/option2", label: "Option 2" },
    ],
  },
  {
    key: "/apartments",
    label: "Байр",
    icon: <HomeOutlined />,
    children: [
      { key: "/building", label: "Option 1" },
      { key: "/apartments/option2", label: "Option 2" },
    ],
  },
  {
    key: "/settings",
    label: "Settings",
    icon: <SettingOutlined />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [current, setCurrent] = useState("/dashboard");
  const { complexes } = useComplexes();
  const router = useRouter();
  const [selectedComplex, setSelectedComplex] = useState<number | undefined>(
    undefined
  );
  const [complex, setComplex] = useQueryState(
    "complex",
    parseAsFloat.withDefault(1)
  );

  const handleChange1 = (value: number) => {
    setSelectedComplex(value);
    setComplex(value);
  };
  useEffect(() => {
    const saved = localStorage.getItem("selectedComplex");
    if (saved) {
      setSelectedComplex(Number(saved));
    }
  }, []);

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
          <UserProvider>
            <BuildingProvider>
              <PropertiesProvider>
    <div>
      <div
        className={`flex justify-between items-center px-4 py-2 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex gap-2 items-center">
          <img
          src="./gertu_logo.png"
            width={28}
            alt="gertu_logo"
          />
          <Select
            value={selectedComplex}
            placeholder="Gertu"
            style={{ width: 200 }}
            onChange={handleChange1}
            className="text-black"
            options={complexes.map((complex) => ({
              label: complex.name,
              value: complex.id,
            }))}
          />
        </div>

        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>

      <div className="flex">
        <Menu
          theme={theme}
          onClick={onClick}
          style={{ width: 306 }}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
        <div
          className={` w-full ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          } 
         `}
        >
          {children}
        </div>
      </div>
    </div>
          </PropertiesProvider>
            </BuildingProvider>
          </UserProvider>
  );
}
