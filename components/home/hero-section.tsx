import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  },
};

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <div className="">
        <MotionDiv
          variants={itemVariants}
          className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group"
        >
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <span className="text-base text-rose-600">Powered by AI</span>
          </Badge>
        </MotionDiv>
        <MotionH1
          variants={itemVariants}
          className="font-bold py-6 text-center"
        >
          Transform PDFs into{" "}
          <span className="relative inline-block">
            <MotionSpan
              whileHover={buttonVariants}
              className="relative z-10 px-2"
            >
              concise
            </MotionSpan>
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>{" "}
          summaries
        </MotionH1>
        <MotionH2
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 w-full flex justify-center items-center text-center px-4 lg:px-0 lg:max-w-4xl mx-auto"
        >
          Get a beautiful summary reel of the document in seconds.
        </MotionH2>
        <MotionDiv
          variants={itemVariants}
          whileHover={buttonVariants}
          className="mt-4 flex justify-center"
        >
          <Button
            variant={"link"}
            className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              <span>SnapSummary</span>
              <ArrowRightIcon className="animate-pulse" />
            </Link>
          </Button>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
