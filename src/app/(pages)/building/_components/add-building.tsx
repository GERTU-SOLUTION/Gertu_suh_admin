import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Input } from "antd";
import { parseAsFloat, useQueryState } from "nuqs";

type BuildingFormValues = {
  building_name: string;
  building_number: string;
  id: number;
};

const AddBuilding: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [complex] = useQueryState("complex", parseAsFloat.withDefault(0));

  const queryParams = new URLSearchParams();
  if (complex !== 0) queryParams.append("complex", complex.toString());

  const complexId = queryParams.get("complex");
  const [com, setCom] = useState<string | null>(null);

  useEffect(() => {
    if (!complexId && typeof window !== "undefined") {
      setCom(localStorage.getItem("selectedComplex"));
    }
  }, [complexId]);

  const onFinish = (values: BuildingFormValues) => {
    const payload = {
      building_name: values.building_name,
      building_number: values.building_number,
      id: values.id,
      complex_id: Number(complexId ?? com ?? 0), // ensure number
    };
    console.log("Final Payload:", payload);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        + Add building
      </Button>
      <Modal
        title="Add building"
        open={isModalOpen}
        onOk={() => form.submit()} 
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-md p-4"
        >
          <Form.Item
            label="Building Name"
            name="building_name"
            rules={[{ required: true, message: "Enter building name" }]}
          >
            <Input placeholder="Enter building name" />
          </Form.Item>

          <Form.Item
            label="Building Number"
            name="building_number"
            rules={[{ required: true, message: "Enter building number" }]}
          >
            <Input placeholder="Enter building number" />
          </Form.Item>

          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "Enter ID" }]}
          >
            <Input type="number" placeholder="Enter ID" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBuilding;
