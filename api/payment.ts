import axios from "axios";
import { getBackendUrl } from "@/lib/utils";

export const makePaymentRequest = axios.create({
  baseURL: getBackendUrl(''),
});
