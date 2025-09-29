/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, createContext, useContext, useEffect } from "react";
import api from "../api";
import { parseAsFloat, parseAsString, useQueryState } from "nuqs";
type TotalPages = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};
type buildingContextType = {
  totalPage: TotalPages | undefined;
  building: Building[] | undefined;
};
export type HOA = {
  ID: number;
  CreatedAt: string; // ISO datetime
  UpdatedAt: string; // ISO datetime
  DeletedAt: string | null;
  name: string;
  address: string;
  phone: string;
};

export type Complex = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  address: string;
  image: string;
  hoa_id: number;
  hoa: HOA;
};

export type Building = {
  id: number;
  complex_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  complex: Complex;
};

const BuildingContext = createContext<buildingContextType>(
  {} as buildingContextType
);

export const BuildingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [page] = useQueryState("page", parseAsFloat.withDefault(1));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [totalPage, setTotalPage] = useState<TotalPages>();
  const [building, setBuilding] = useState<Building[]>();

  const GetBuildings = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search !== "") queryParams.append("search", search.toString());
      if (page !== 0) queryParams.append("page", page.toString());
      const queryString = queryParams.toString();
      setLoading(true);
      const response = await api.get(`/buildings?${queryString}`);
      setTotalPage(response.data.meta);
      setBuilding(response.data.data);
    } catch (error) {
      console.error("Failed to load complexes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBuildings();
  }, [page, search]);
  return (
    <BuildingContext.Provider value={{ totalPage, building }}>
      {loading ? (
        <div className="flex justify-center items-center h-full ">
          <img src="./gertu_bounce_letters.gif" alt="logo" />
        </div>
      ) : (
        children
      )}
    </BuildingContext.Provider>
  );
};

export const useBuilding = () => {
  return useContext(BuildingContext);
};
