"use client";

import React, { useState } from "react";
import { Radio } from "antd";
import axios from "axios";

type Properties = {
  building_id: string;
  floor: string;
  ownership_status: string;
  property_type: string;
  unit_number: string;
};

const AddProperties: React.FC = () => {
  const [values, setValues] = useState<Properties>({
    building_id: "",
    floor: "",
    ownership_status: "owned",
    property_type: "residential",
    unit_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.gertu.mn:3000/api/properties",
        values
      );
      console.log("✅ Success:", response.data);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <p className="text-3xl font-extrabold">Create Properties</p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xl font-semibold">Building id</p>
          <input
            className="border p-2 rounded-xl"
            name="building_id"
            value={values.building_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Floor</p>
          <input
            className="border p-2 rounded-xl"
            name="floor"
            value={values.floor}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Ownership Status</p>
          <Radio.Group
            name="ownership_status"
            value={values.ownership_status}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                ownership_status: e.target.value,
              }))
            }
            options={[
              { value: "owned", label: "Owned" },
              { value: "hoa_managed", label: "HOA Managed" },
              { value: "rented", label: "Rented" },
            ]}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Property Type</p>
          <Radio.Group
            name="property_type"
            value={values.property_type}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                property_type: e.target.value,
              }))
            }
            options={[
              { value: "residential", label: "Residential" },
              { value: "commercial", label: "Commercial" },
              { value: "industrial", label: "Industrial" },
              { value: "land", label: "Land" },
            ]}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Unit Number</p>
          <input
            className="border p-2 rounded-xl"
            name="unit_number"
            value={values.unit_number}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProperties;
