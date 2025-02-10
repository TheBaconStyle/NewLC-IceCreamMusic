"use client";

import MyButton from "@/shared/ui/MyButton/MyButton";
import MyInput from "@/shared/ui/MyInput/MyInput";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const searchKey = "search";

export function WalletSearch() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get(searchKey) ?? ""
  );

  function handleSearch() {
    const newSearch = new URLSearchParams(searchParams);

    newSearch.set(searchKey, searchValue);

    router.push(`?${newSearch.toString()}`);
  }

  return (
    <form
      className="row mb20"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <MyInput
        className="mb0"
        label={"Поиск по UPC"}
        type={"search"}
        inpLk
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <MyButton text={"Поиск"} view={"secondary"} type="submit" />
    </form>
  );
}
