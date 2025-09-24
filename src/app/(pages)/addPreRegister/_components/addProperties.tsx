import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  PropertyFormValues,
  useProperties,
} from "@/app/provider/PropertiesProvider";

const AddProperties: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, control } = useForm<PropertyFormValues>();
  const { PostProperties } = useProperties();

  const onSubmit: SubmitHandler<PropertyFormValues> = (data) => {
    console.log("Submitted data:", data);
    PostProperties(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        + Add properties
      </Button>
      <Modal
        title="Add property"
        closable={true}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        // style={{ top: 20 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 max-w-md"
        >
          <div>
            <label>Bathrooms</label>
            <Input
              type="number"
              step="1"
              {...register("bathrooms", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label>Bedrooms</label>
            <Input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label>Building Number</label>
            <Input type="text" {...register("building_number")} />
          </div>

          {/* <div>
            <label>Complex ID</label>
            <Input
              type="number"
              {...register("complex_id", { valueAsNumber: true })}
            />
          </div> */}

          <div>
            <label>Floor</label>
            <Input type="text" {...register("floor")} />
          </div>

          <div>
            <label>Ownership Status</label>
            <Controller
              name="ownership_status"
              control={control}
              defaultValue="owned"
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  <Select.Option value="owned">Owned</Select.Option>
                  <Select.Option value="rented">Rented</Select.Option>
                </Select>
              )}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <Input type="text" {...register("phone_number")} />
          </div>

          <div>
            <label>Property Type</label>
            <Controller
              name="property_type"
              control={control}
              defaultValue="residential"
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  <Select.Option value="residential">Residential</Select.Option>
                  <Select.Option value="commercial">Commercial</Select.Option>
                </Select>
              )}
            />
          </div>

          <div>
            <label>Square Meters</label>
            <Input
              type="number"
              step="0.1"
              {...register("square_meters", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label>Unit Number</label>
            <Input type="text" {...register("unit_number")} />
          </div>

          <div className="mt-4">
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddProperties;
