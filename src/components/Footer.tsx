import { profile } from "@/content/profile";
import { ShortcutHint } from "./ShortcutHint";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and deployed on Vercel.
        </p>
        <div className="flex items-center gap-5">
          <a href={profile.repo} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
            Source
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
            Resume
          </a>
          <ShortcutHint />
        </div>
      </div>
    </footer>
  );
}
