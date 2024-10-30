"use client";
import MySelect from "@/shared/MySelect/MySelect";
import router, { useRouter, useSearchParams } from "next/navigation";

export default function ReleaseCategory() {
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
      options={[
        { value: "moderating", label: "В модерации" },
        { value: "aproved", label: "Одобрены " },
        { value: "rejected", label: "Отклонены" },
      ]}
    />
  );
}
