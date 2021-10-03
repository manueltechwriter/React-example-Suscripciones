import { Kushki } from "@kushki/js";
import axios from "axios";

const KUSHKI_PUBLIC_MERCHANT_ID = "20000000106212540000";

export const kushki = new Kushki({
  merchantId: KUSHKI_PUBLIC_MERCHANT_ID,
  inTestEnvironment: true
});

export const exampleAPI = axios.create({
  baseURL: "https://kushki-backend-examples.vercel.app/api"
});
