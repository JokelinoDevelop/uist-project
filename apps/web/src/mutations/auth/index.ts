import type { ISignInUser, ISignUpUser } from "@uist-project/api/schema";

import apiClient from "@/lib/api-client";
import formatApiError from "@/lib/format-api-error";

export const signUpUser = async (user: ISignUpUser) => {
  const response = await apiClient.auth["sign-up"].$post({
    json: user,
  });

  if (!response.ok) {
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    if ("success" in json) {
      const message = formatApiError(json);
      throw new Error(message);
    }
  }

  return response.json();
};

export const signInUser = async (user: ISignInUser) => {
  const response = await apiClient.auth["sign-in"].$post({
    json: user,
  });

  if (!response.ok) {
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    if ("success" in json) {
      const message = formatApiError(json);
      throw new Error(message);
    }
  }

  return response.json();
};
