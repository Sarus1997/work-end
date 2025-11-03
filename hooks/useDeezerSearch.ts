/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export default function useDeezerSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;
    const callback = "handleDeezer";
    (window as any)[callback] = (data: any) => setResults(data.data);

    const script = document.createElement("script");
    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(
      query
    )}&limit=20&output=jsonp&callback=${callback}`;
    document.body.appendChild(script);

    return () => {
      delete (window as any)[callback];
      document.body.removeChild(script);
    };
  }, [query]);

  return { results };
}
