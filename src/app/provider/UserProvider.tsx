/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, createContext, useContext, useEffect } from "react";
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

type userContextType = {
  users: User[] | undefined;
  totalPage: TotalPages | undefined;
};

const UserContext = createContext<userContextType>({} as userContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [totalPage, setTotalPage] = useState<TotalPages>();

  const GetUser = async () => {
    setLoading(true);
    const response = await api.get("/users");
    console.log(response.data.data);
    setTotalPage(response.data.meta);
    setLoading(false);
    setUsers(response.data.data);
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <UserContext.Provider value={{ users, totalPage }}>
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
