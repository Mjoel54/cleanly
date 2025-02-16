import { createContext, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../../utils/api/index";

interface Room {
  _id: string;
  name: string;
  tasks: any[]; // Replace with proper Task interface
}

interface RoomsContextType {
  rooms: Room[];
  loading: boolean;
  error: any;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

export function RoomsProvider({ children }: { children: ReactNode }) {
  const { loading, error, data } = useQuery(GET_ROOMS);

  const value = {
    rooms: data?.rooms || [],
    loading,
    error,
  };

  return (
    <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>
  );
}
