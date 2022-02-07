import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 10,
  });
  const unsplashResults = photos.response?.results;
  return unsplashResults?.map((result) => result.urls.regular);
};

export const fetchCoffeeStores = async (
  latLong = "20.994910,105.777014",
  limit = 8
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || "",
      },
    }
  );
  const data = await response.json();

  return data.results.map((result: any, index: number) => {
    return { ...result, imgUrl: !!photos ? photos[index] : "" };
  });
};

const getUrlForCoffeeStores = (
  latLong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

// export const fetchCoffeeStorePhotos = async (fsq_id: string) => {
//   //   const photos = await getListOfCoffeeStorePhotos();
//   const response = await fetch(
//     `https://api.foursquare.com/v3/places/${fsq_id}/photos`,
//     {
//       headers: {
//         Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || "",
//       },
//     }
//   );
//   const data = await response.json();
//   // console.log(data);

//   return data;
// };
