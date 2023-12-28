import axios from "axios";
import { useEffect, useState } from "react";
import { Anime } from "../types";

type fetchedAnime = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    large: string;
  };
};

function useFetchAnime(season: string, year: string) {
  const URL = "https://graphql.anilist.co";
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          URL,
          {
            query: `
              query {
                Page(page: 1, perPage: 50) {
                  media(season: ${season}, seasonYear: ${year}, type: ANIME, sort: [POPULARITY_DESC]) {
                    id
                    title {
                      romaji
                      english
                    }
                    coverImage {
                      large
                    }
                  }
                }
              }
            `,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const fetchedAnime: fetchedAnime[] = response.data.data.Page.media;
        const animeWithTier: Anime[] = fetchedAnime.map((data) => {
          return {
            id: data.id.toString(),
            title: data.title.english ? data.title.english : data.title.romaji,
            url: data.coverImage.large,
            tierId: "selection",
          };
        });

        setAnime(animeWithTier);
        setLoading(false);
      } catch (error) {
        let errorMsg = "An error has occured: ";
        if (axios.isAxiosError(error)) {
          errorMsg += error.message;
        }
        setLoading(false);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [season, year]);

  return { anime, setAnime, loading, error };
}

export default useFetchAnime;
