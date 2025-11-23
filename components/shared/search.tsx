"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchImagesByTitle } from "@/lib/actions/search.actions";

export const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const { images } = await searchImagesByTitle(query);
        setResults(images || []);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(search, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />
        <Input
          className="w-full pl-10 pr-4 py-2 font-semibold rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          placeholder="Search images by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {results.map((image) => (
                <li
                  key={image._id}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/transformations/${image._id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0">
                      <img
                        src={image.secureURL}
                        alt={image.title}
                        className="h-10 w-10 rounded object-cover shrink-0"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {image.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {image.author?.firstName} {image.author?.lastName}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : query && !isSearching ? (
            <div className="p-4 text-center text-gray-500">
              No images found matching "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
