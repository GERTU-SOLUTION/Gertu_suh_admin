/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import api from "../api";
import { TotalPages } from "./PropertiesProvider";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  mobile_phone: string;
  email: string;
  role: string;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
};

export type Vehicle = {
  id: number;
  vehicle_name: string;
  license_plate: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner_id: number;
  owner_name: string;
  owner: User;
};
export type Amenities = {
  id: number;
  building_id: number;
  unit_number: number;
  amenity_type: string;
};

type userContextType = {
  users: User[] | undefined;
  totalPage: TotalPages | undefined;
  GetVehicles: (id: number) => Promise<void>;
  userVehicle: Vehicle[] | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUserVehicle: Dispatch<SetStateAction<Vehicle[] | undefined>>;
  amenities: Amenities[] | undefined;
};

const UserContext = createContext<userContextType>({} as userContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [userVehicle, setUserVehicle] = useState<Vehicle[]>();
  const [totalPage, setTotalPage] = useState<TotalPages>();
  const [amenities, setAmenities] = useState<Amenities[]>();

  const GetUser = async () => {
    setLoading(true);
    const response = await api.get("/users");
    setTotalPage(response.data.meta);
    setLoading(false);
    setUsers(response.data.data);
  };
  const GetVehicles = async (id: number) => {
    try {
      if (id) {
        const { data } = await api.get(`/users/${id}/vehicles`);
        console.log(data.data);
        setUserVehicle(data.data);
      } else {
        setUserVehicle([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const GetAmenities = async () => {
    try {
      const { data } = await api.get(`/amenities`);
      console.log(data.data);
      setAmenities(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUser();
    GetAmenities();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        totalPage,
        GetVehicles,
        userVehicle,
        loading,
        setLoading,
        setUserVehicle,
        amenities,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full ">
          <img src="./gertu_bounce_letters.gif" alt="logo" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
