import { userContext } from "@/lib/action";
import { createContext } from "react";

export type UserContextType = Partial<Awaited<ReturnType<typeof userContext>>>;
export const UserContext = createContext<UserContextType>({});
