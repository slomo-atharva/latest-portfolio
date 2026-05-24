import Link from "next/link";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
};

export function ActionLink({
  className = "",
  href,
  children,
  variant = "solid",
}: ActionLinkProps) {
  const variantClass =
    variant === "solid"
      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper-bright)] shadow-[0_14px_34px_rgba(45,43,38,0.12)] hover:bg-[#242428]"
      : "border-[var(--ink)] bg-[rgba(255,255,255,0.66)] text-[var(--ink)] hover:bg-[var(--paper-bright)]";

  return (
    <Link
      className={`h-10 items-center justify-center rounded-full border px-4 text-xs font-medium transition duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] sm:h-11 sm:px-6 sm:text-sm ${variantClass} ${className || "inline-flex"}`}
      href={href}
    >
      {children}
    </Link>
  );
}
