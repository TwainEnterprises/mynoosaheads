// src/components/mdxComponents.tsx — MDX components map used by
// next-mdx-remote/rsc on the server. Sprint 1.2 — typography tuned against
// the design brief's editorial register. The .prose-mdx class in
// globals.css owns most of the styling; this file just adds a few extras.

import Link from "next/link";
import { Icons } from "@/components/ui";

// `MDXComponents` is normally imported from `mdx/types` (the
// `@types/mdx` package). That package isn't installed at the moment;
// the type is small enough to redefine inline. If/when `@types/mdx`
// lands, restore the original import.
type MDXComponents = Record<string, React.ComponentType<Record<string, unknown>>>;
type AnchorProps = { href?: unknown } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="font-display text-display-md mt-10 mb-5 text-ink-900" {...(props as React.HTMLAttributes<HTMLHeadingElement>)} />,
  h2: (props) => <h2 className="font-display text-display-sm mt-10 mb-4 text-ink-900" {...(props as React.HTMLAttributes<HTMLHeadingElement>)} />,
  h3: (props) => <h3 className="font-display text-headline-lg mt-8 mb-3 text-ink-900" {...(props as React.HTMLAttributes<HTMLHeadingElement>)} />,
  p: (props) => <p className="my-5 leading-relaxed text-ink-800" {...(props as React.HTMLAttributes<HTMLParagraphElement>)} />,
  a: ({ href, ...rest }: AnchorProps) => {
    const isInternal =
      typeof href === "string" &&
      (href.startsWith("/") || href.startsWith("#"));
    if (isInternal) {
      return (
        <Link
          href={href as string}
          className="underline decoration-ocean-300 underline-offset-4 hover:decoration-ocean-600 text-ocean-700"
          {...rest}
        />
      );
    }
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className="underline decoration-ocean-300 underline-offset-4 hover:decoration-ocean-600 text-ocean-700 inline-flex items-center gap-1"
        {...rest}
      >
        {rest.children}
        <Icons.External size={14} />
      </a>
    );
  },
  ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2 text-ink-800" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2 text-ink-800" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-eucalyptus-400 pl-4 italic text-ink-700 my-5 font-display"
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-mono text-sm bg-paper-100 text-ink-800 px-1.5 py-0.5 rounded" {...props} />
  ),
  pre: (props) => (
    <pre
      className="bg-paper-100 rounded-lg p-4 overflow-x-auto my-5 border border-paper-200"
      {...props}
    />
  ),
  hr: (props) => <hr className="border-paper-200 my-8" {...props} />,
};
