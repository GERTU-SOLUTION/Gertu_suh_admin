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
  const [values, setValues] = useState<Property>({
    bathrooms: 1,
    bedrooms: 1,
    building_number: "1",
    complex_id: 995,
    floor: "",
    ownership_status: "owned",
    phone_number: "",
    property_type: "residential",
    square_meters: 10,
    unit_number: "",
  });
  const GetProperties = async () => {
    try {
      const response = await api.get("/buildings/13");
      console.log(response.data.data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "building_id" ? Number(value) : value,
    }));
  };
  const postPreRegister = async () => {
    console.log(values);
    const response = await api.post("/properties/pre-register", values);
    console.log(response);
  };
  useEffect(() => {
    GetProperties();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col gap-4 p-4">
      {/* {data?.map((item) => (
        <div key={item.id}>{item.complex_id}</div>
      ))} */}
      <p className="text-3xl font-extrabold ">Pre Register</p>
      <div>
        <p>Floor</p>
        <input
          className="border p-2 rounded-xl"
          name="floor"
          onChange={handleChange}
          value={values.floor}
        />
      </div>
      <div>
        <p>Unit Number</p>
        <input
          className="border p-2 rounded-xl"
          name="unit_number"
          onChange={handleChange}
          value={values.unit_number}
        />
      </div>
      <div>
        <p>PhoneNumber</p>
        <input
          className="border p-2 rounded-xl"
          name="phone_number"
          onChange={handleChange}
          value={values.phone_number}
        />
      </div>
      <button
        className="text-white bg-black p-2 rounded-xl w-[50%]"
        onClick={postPreRegister}
      >
        submit
      </button>
    </div>
  );
}
