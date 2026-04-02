"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.push(segments.join("/"));
    });
  };

  return (
    <select
      value={locale}
      onChange={onSelectChange}
      disabled={isPending}
      className="px-2 py-1 rounded border border-neutral-200 bg-white text-sm"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
}