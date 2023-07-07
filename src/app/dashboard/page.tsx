import Header from "@/components/partials/Header";
import SessionTimer from "@/components/shared/SessionTimer";
import { getAuthCookie } from "@/helpers/auth";
import { getUser } from "@/service/user";
import {
  SessionTimerConfig,
  defaultSessionTimerConfig,
} from "@/types/setting.type";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const authData = getAuthCookie();

  if (!authData) {
    return redirect("/");
  }

  const user = await getUser(authData.userId);

  if (!user) {
    return redirect("/");
  }

  const settings: SessionTimerConfig = user.settings;

  return (
    <div className="flex flex-col w-full">
      <Header name={authData.name} email={authData.email} />
      <div className="flex flex-col max-w-4xl mx-auto px-8 py-12">
        <SessionTimer config={settings} />
      </div>
    </div>
  );
}
