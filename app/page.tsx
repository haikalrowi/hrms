import { Dashboard } from "@/components/Dashboard";
import { Login } from "@/components/Login";
import { userContext } from "@/lib/action";

export default async function User() {
  try {
    const currentContext = await userContext();
    return <Dashboard {...currentContext} />;
  } catch (error) {
    return <Login />;
  }
}
