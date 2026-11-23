import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-16">
      <div className="container-x">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">404</span> / Not found
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.6rem,7vw,5rem)] leading-[1] text-fg">
          No relevant chunks <em className="serif-accent">retrieved.</em>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-fg-soft">
          This page does not exist. Rather than make something up, here is the way back.
        </p>
        <Link
          href="/"
          className="btn-primary label mt-10"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </section>
  );
}
