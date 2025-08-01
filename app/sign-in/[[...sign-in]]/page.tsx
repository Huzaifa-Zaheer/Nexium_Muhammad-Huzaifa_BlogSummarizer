import BgGradient from "@/components/common/bg-gradient";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center lg:min-h-[40vh]">
      <div className="py-10 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200"/>
        <SignIn />
      </div>
    </section>
  );
}
