"use client";

import { useEffect, useState } from "react";
import api from "../api";

type Property = {
  bathrooms: number;
  bedrooms: number;
  building_number: string;
  complex_id: number;
  floor: string;
  ownership_status: string;
  phone_number: string;
  property_type: string;
  square_meters: number;
  unit_number: string;
};
export default function AddPreRegister() {
  const [data, setData] = useState();
  const GetProperties = async () => {
    try {
      const response = await api.get("/buildings");
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetProperties();
  }, []);
  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.complex_id}</div>
      ))}

      <div>
        <p>floor</p>
        <input className="border p-2 rounded-xl" />
      </div>
      <div>
        <p>PhoneNumber</p>
        <input className="border p-2 rounded-xl" />
      </div>
    </div>
  );
}
