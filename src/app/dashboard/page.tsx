import Header from "@/components/partials/Header";
import { getAuthCookie } from "@/helpers/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const authData = getAuthCookie();

  if (!authData) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-8">
      <Header name={authData.name} email={authData.email} />
    </div>
  );
}
