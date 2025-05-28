import type { ISelectTasks } from "@uist-project/api/schema";

import Task from "./task";

export default function TaskList({ tasks }: { tasks: ISelectTasks[] }) {
  return tasks.map(task => (
    <Task task={task} key={task.id} />
  ));
}
