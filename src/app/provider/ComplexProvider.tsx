"use client";
import { useState, createContext, useContext, useEffect } from "react";
import api from "../api";

export type HOA = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
};

export type Complex = {
  id: number;
  name: string;
  address: string;
  hoa_id: number;
  hoa: HOA;
  created_at: string;
  updated_at: string;
};

type complexesContextType = {
  complexes: Complex[];
};

const ComplexesContext = createContext<complexesContextType>(
  {} as complexesContextType
);

export const ComplexesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [complexes, setComplexes] = useState<Complex[]>([]);

  const SwitchComplexes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/complexes");
      const complexes = response.data.data as Complex[];
      console.log(complexes);
      setComplexes(complexes);
    } catch (error) {
      console.error("Failed to load complexes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    SwitchComplexes();
  }, []);

  return (
    <ComplexesContext.Provider value={{ complexes }}>
      {loading ? <div>Loading...</div> : children}
    </ComplexesContext.Provider>
  );
};

export const useComplexes = () => {
  return useContext(ComplexesContext);
};
