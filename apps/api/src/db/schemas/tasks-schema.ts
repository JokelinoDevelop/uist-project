import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const selectTasksSchema = createSelectSchema(tasks).extend({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ITask = z.infer<typeof selectTasksSchema>;

export const insertTasksSchema = createInsertSchema(tasks, {
  name: (schema) => schema.name.min(1).max(500),
})
  .required({
    done: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type IInsertTasks = z.infer<typeof insertTasksSchema>;

export const patchTasksSchema = insertTasksSchema.partial();

export type IPatchTasks = z.infer<typeof patchTasksSchema>;
