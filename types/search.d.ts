import { SearchResult } from "@/types";

declare module "@/types" {
  interface Author {
    _id: string;
    firstName: string;
    lastName: string;
  }

  interface SearchResult {
    _id: string;
    title: string;
    secureURL: string;
    author: Author;
  }
}
