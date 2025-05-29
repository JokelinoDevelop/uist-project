import type { IInsertTasks, IPatchTasks } from "@uist-project/api/schema";

import { queryOptions } from "@tanstack/react-query";

import apiClient from "../../lib/api-client";
import formatApiError from "../../lib/format-api-error";

export const queryKeys = {
  LIST_TASKS: { queryKey: ["list-tasks"] },
  LIST_TASK: (id: string) => ({ queryKey: [`list-task-${id}`] }),
};

export const tasksQueryOptions = queryOptions({
  ...queryKeys.LIST_TASKS,
  queryFn: async () => {
    const response = await apiClient.tasks.$get();
    return response.json();
  },
});

export const createTaskQueryOptions = (id: string) => queryOptions({
  ...queryKeys.LIST_TASK(id),
  queryFn: async () => {
    const response = await apiClient.tasks[":id"].$get({
      param: {
        // @ts-expect-error allow strings for error messages
        id,
      },
    });
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    if ("success" in json) {
      const message = formatApiError(json);
      throw new Error(message);
    }
    return json;
  },
});

export const createTask = async (task: IInsertTasks) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await apiClient.tasks.$post({
    json: task,
  });
  const json = await response.json();
  if ("success" in json) {
    const message = formatApiError(json);
    throw new Error(message);
  }
  return json;
};

export const deleteTask = async (id: string) => {
  const response = await apiClient.tasks[":id"].$delete({
    param: {
      // @ts-expect-error allow to show server error
      id,
    },
  });
  if (response.status !== 204) {
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    const message = formatApiError(json);
    throw new Error(message);
  }
};

export const updateTask = async ({ id, task }: { id: string; task: IPatchTasks }) => {
  const response = await apiClient.tasks[":id"].$patch({
    param: {
      // @ts-expect-error allow to show server error
      id,
    },
    json: task,
  });
  if (response.status !== 200) {
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    const message = formatApiError(json);
    throw new Error(message);
  }
};
