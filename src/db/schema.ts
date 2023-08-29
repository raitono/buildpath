import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const champions = sqliteTable("champions", {
  id: integer("id").primaryKey(),
  name: text("name"),
  // title: text("title"),
  done: integer("done"),
})
