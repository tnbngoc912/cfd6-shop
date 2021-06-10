import { domain } from "./config";

export default {
  get: () => {
    return fetch(`/faq.json`).then(res => res.json());
  }
};
