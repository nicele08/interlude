import PublicHeader from "@/components/partials/PublicHeader";
import InterludeIntro from "@/components/shared/InterludeIntro";
import LoginForm from "@/components/shared/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen">
      <Image
        src="/images/login.png"
        alt="Login"
        fill
        className="object-cover"
      />
      <div className="h-full w-[60%] bg-gradient-to-r from-primary to-primary/70 absolute left-0 top-0 z-10" />

      <div className="flex flex-col items-center w-full px-8 z-20 top-0 absolute h-full overflow-y-auto">
        <div className="flex flex-col w-full px-8 max-w-4xl">
          <PublicHeader />
          <div className="py-12 flex">
            <InterludeIntro />

            <div className="flex flex-col md:w-1/2">
              <div className="flex flex-col bg-white rounded px-8 py-12">
                <h2 className="text-xl sm:text-2xl font-black tracking-wide">
                  Log in to your account
                </h2>

                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
