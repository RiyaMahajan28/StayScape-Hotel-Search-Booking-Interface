import { Suspense } from "react";
import SearchPage from "@/components/search/SearchPage";

export default function SearchRoutePage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchPage />
    </Suspense>
  );
}
