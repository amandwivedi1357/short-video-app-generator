import { boolean, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users',{
    id:serial('id').primaryKey(),
    username:varchar('username').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)
})

export const VideoData = pgTable('videoData',{
    id:serial('id').primaryKey(),
    script:json('script').notNull(),
    audioFileUrl:varchar('audioFileUrl').notNull(),
    captions:json('captions').notNull(),
    imageList:varchar('imageList').array().notNull(),
    createdBy:varchar('createdBy').notNull()
});