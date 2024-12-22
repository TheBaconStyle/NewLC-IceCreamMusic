"use client";
import MySelect from "@/shared/MySelect/MySelect";
import { useRouter, useSearchParams } from "next/navigation";

const values = [
  { value: "moderating", label: "В модерации" },
  { value: "approved", label: "Одобрены " },
  { value: "rejected", label: "Отклонены" },
];

export default function ModerationFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(f: { value: string; label: string }) {
    const newSearch = new URLSearchParams(searchParams);

    newSearch.set("status", f.value);

    router.push(`?${newSearch.toString()}`);
  }

  return (
    <MySelect
      label={"Фильтрация"}
      onValueChange={handleSearch}
      value={values.find((v) => v.value === searchParams.get("status"))}
      options={values}
    />
  );
}
