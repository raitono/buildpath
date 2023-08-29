import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from "better-sqlite3"
import { z } from "zod"

import { publicProcedure, router } from "./trpc"

import { champions } from "@/db/schema"

const sqlite = new Database("sqlite.db")
const db = drizzle(sqlite)

migrate(db, { migrationsFolder: "drizzle" })

export const appRouter = router({
  getChampions: publicProcedure.query(async () => {
    return await db.select().from(champions).all()
  }),
  addChampion: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(champions).values({ name: opts.input }).run()
    return true
  }),
  setDone: publicProcedure
    .input(z.object({ id: z.number(), done: z.number() }))
    .mutation(async (opts) => {
      await db
        .update(champions)
        .set({ done: opts.input.done })
        .where(eq(champions.id, opts.input.id))
        .run()
      return true
    }),
})

export type AppRouter = typeof appRouter
