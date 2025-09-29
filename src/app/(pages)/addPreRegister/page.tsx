// import CustomTable from "./_components/table";
import { UserDeviceTable } from "./_components/user-device-table";
import UserTable from "./_components/user.table";

export default function Register() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 p-4 w-full">
      <div className="flex justify-between">
        {/* <CustomTable /> */}
        <UserTable />
        <UserDeviceTable />
      </div>
    </div>
  );
}
