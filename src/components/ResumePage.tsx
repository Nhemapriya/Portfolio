import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { SubpageHeader } from "./SubpageHeader";
import { Footer } from "./Footer";
import { fadeUp } from "../lib/motion";

// Placeholder until the resume PDF is added.
export function ResumePage() {
  return (
    <>
      <SubpageHeader />
      <main className="relative mx-auto flex min-h-[80vh] w-full max-w-3xl flex-col items-center justify-center px-5 pb-16 pt-36 text-center sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/10 text-brand-500">
            <FileText size={30} />
          </span>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            Resume
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Adding <span className="text-gradient">Soon</span>
          </h1>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
