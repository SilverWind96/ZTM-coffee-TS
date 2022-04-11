import { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
const getCoffeeStoresByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(
      //   "43.65267326999575,-79.39545615725015",
      latLong as string,
      !!limit ? parseInt(limit as string) : 8
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("error ", error);
    res.status(500).json(error);
  }
};
export default getCoffeeStoresByLocation;
