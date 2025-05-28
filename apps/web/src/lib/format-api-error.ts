import type { ErrorSchema } from "@uist-project/api-client";

export default function formatApiError(apiError: ErrorSchema) {
  return apiError
    .error
    .issues
    .reduce((all, issue) => `${all + issue.path.join(".")}: ${issue.message}\n`, "");
}
