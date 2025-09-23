"use client";
import { useState, createContext, useContext, useEffect } from "react";
import api from "../api";

export type Properties = {
  building_id: number;
  floor: string;
  ownership_status: string;
  property_type: string;
  unit_number: string;
};

type propertiesContextType = {
  properties: Properties[];
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

  const GetProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/properties");
      console.log(response.data.data);
      setProperties(response.data.data);
    } catch (error) {
      console.error("Failed to load complexes:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetProperties();
  }, []);
  return (
    <PropertiesContext.Provider value={{ properties }}>
      {loading ? <div>Loading...</div> : children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  return useContext(PropertiesContext);
};
