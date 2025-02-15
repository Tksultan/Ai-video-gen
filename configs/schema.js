import { pgTable, serial, varchar, boolean, json} from "drizzle-orm/pg-core";


export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", 255).notNull(), 
  email: varchar("email", 255).notNull(),
  imageUrl: varchar("imageUrl", 255), 
  subscription: boolean("subscription").default(false),
});


export const VideoData = pgTable('videoData', {
  id: serial('id').primaryKey(),
  script: varchar('script').array().notNull(),
  audioFileUrl: varchar('audioFileUrl').notNull(),
  captions: varchar('captions').array().notNull(),
  imageList: varchar('imageList').array(),
  createdBy: varchar('createdBy').notNull()
});


