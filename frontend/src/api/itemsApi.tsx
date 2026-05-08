import { axiosClient } from "./axiosClient";

export default async function getItems() {
  const response = await axiosClient.get(
    '/items'
  )

  return response.data;
}
