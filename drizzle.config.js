import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
//   out: "./drizzle",
  dbCredentials:{
    url:'postgresql://neondb_owner:xl6RSgph0Ime@ep-silent-sunset-a5fcmfwa.us-east-2.aws.neon.tech/neondb?sslmode=require'
  }
});