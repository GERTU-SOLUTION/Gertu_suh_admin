/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, createContext, useContext, useEffect } from "react";
import api from "../api";
import { parseAsFloat, parseAsString, useQueryState } from "nuqs";

export type Properties = {
  id: number;
  bedrooms: number;
  bathrooms: number;
  square_meters: number;
  registration_status: string;
  building_id: number;
  floor: string;
  ownership_status: string;
  property_type: string;
  unit_number: string;
  pre_registered_phone?: string;
  current_owner_id: number;
  building: Building;
};

export type Building = {
  id: number;
  complex_id: number;
  building_name: string;
  building_number: string;
};

export type PropertyFormValues = {
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

export type TotalPages = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

type propertiesContextType = {
  properties: Properties[];
  totalPage: TotalPages | undefined;
  PostProperties: (value: PropertyFormValues) => Promise<void>;
};

const PropertiesContext = createContext<propertiesContextType>(
  {} as propertiesContextType
);

export const PropertiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Properties[]>([]);
  const [page] = useQueryState("page", parseAsFloat.withDefault(1));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [complex] = useQueryState("complex", parseAsString.withDefault(""));

  const [totalPage, setTotalPage] = useState<TotalPages>();

  const GetProperties = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search !== "") queryParams.append("search", search.toString());
      if (page !== 0) queryParams.append("page", page.toString());

      const queryString = queryParams.toString();
      setLoading(true);

      const response = await api.get(
        `/complexes/${complex}/properties?${queryString}`
      );
      setTotalPage(response.data.meta);
      setProperties(response.data.data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const PostProperties = async (value: PropertyFormValues) => {
    try {
      const response = await api.post("/properties/pre-register", value);
      GetProperties();
    } catch (error) {
      console.error("Failed to post property:", error);
    }
  };

  useEffect(() => {
    if (complex) {
      GetProperties();
    }
  }, [page, search, complex]);

  return (
    <PropertiesContext.Provider
      value={{ properties, totalPage, PostProperties }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full ">
          <img src="./gertu_bounce_letters.gif" alt="logo" />
        </div>
      ) : (
        children
      )}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  return useContext(PropertiesContext);
};
