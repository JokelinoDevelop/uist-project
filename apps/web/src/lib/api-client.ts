import apiClient from "@uist-project/api-client";

export default apiClient("/api", {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    });
  }) satisfies typeof fetch,
});
