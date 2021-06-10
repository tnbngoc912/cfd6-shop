import { domain } from "./config";

export default {
  get: () => {
    return fetch(`/storeLocation.json`).then(res => res.json());
  }
};
