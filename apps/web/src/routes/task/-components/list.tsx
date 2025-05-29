import type { ITask } from "@uist-project/api/schema";

import Task from "./task";

export default function TaskList({ tasks }: { tasks: ITask[] }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done === b.done)
      return 0;
    return a.done ? 1 : -1;
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}
