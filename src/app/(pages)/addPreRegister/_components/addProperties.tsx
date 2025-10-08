import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  PropertyFormValues,
  useProperties,
} from "@/app/provider/PropertiesProvider";

const AddProperties: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<PropertyFormValues>();
  const { PostProperties } = useProperties();

  const onSubmit: SubmitHandler<PropertyFormValues> = (data) => {
    console.log("Submitted data:", data);
    PostProperties(data);
    reset();
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
        style={{ top: 20 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 max-w-md"
        >
          <div>
            <label>Bathrooms</label>
            <Controller
              name="bathrooms"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>

          <div>
            <label>Bedrooms</label>
            <Controller
              name="bedrooms"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>

          <div>
            <label>Building Number</label>
            <Controller
              name="building_number"
              control={control}
              defaultValue="1"
              render={({ field }) => <Input {...field} />}
            />
          </div>

          <div>
            <label>Complex ID</label>
            <Controller
              name="complex_id"
              control={control}
              defaultValue={995}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>

          <div>
            <label>Floor</label>
            <Controller
              name="floor"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </div>

          <div>
            <label>Ownership Status</label>
            <Controller
              name="ownership_status"
              control={control}
              defaultValue="owned"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="owned">Owned</Select.Option>
                  <Select.Option value="rented">Rented</Select.Option>
                </Select>
              )}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <Controller
              name="phone_number"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </div>

          <div>
            <label>Property Type</label>
            <Controller
              name="property_type"
              control={control}
              defaultValue="residential"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="residential">Residential</Select.Option>
                  <Select.Option value="commercial">Commercial</Select.Option>
                </Select>
              )}
            />
          </div>

          <div>
            <label>Square Meters</label>
            <Controller
              name="square_meters"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>

          <div>
            <label>Unit Number</label>
            <Controller
              name="unit_number"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
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
