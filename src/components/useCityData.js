import { useState, useEffect } from "react";

const useCityData = (searchTerm, limit, currentPage) => {
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          countryIds: "IN",
          namePrefix: searchTerm,
          limit,
          offset: (currentPage - 1) * limit,
        });
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?${params.toString()}`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
          },
        };
        const response = await fetch(url, options);
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        const data = await response.json();
        setCities(data?.data);
        setTotalPages(Math.ceil(data?.metadata?.totalCount / limit));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, limit, currentPage]);

  return { cities, loading, totalPages };
};

export default useCityData;
