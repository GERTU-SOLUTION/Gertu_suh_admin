// import CustomTable from "./_components/table";
import CustomTable from "./_components/table";
import { UserAmenities } from "./_components/user-amenities";
import { UserDeviceTable } from "./_components/user-device-table";

export default function Register() {
  return (
    <div className="flex justify-center items-center flex-col p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <CustomTable />
        </div>
        <div className="w-full mt-9">
          <UserDeviceTable />
          <UserAmenities />
        </div>
      </div>
    </div>
  );
}
