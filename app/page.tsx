import { Dashboard } from "@/components/Dashboard";
import { Login } from "@/components/Login";
import { userContext } from "@/lib/action";
import { cookies } from "next/headers";

export default async function Home() {
  const userId = cookies().get("userLogin")?.value;
  if (userId) {
    const currentUserContext = await userContext(userId);
    return <Dashboard {...currentUserContext} />;
  }
  return <Login />;
}
