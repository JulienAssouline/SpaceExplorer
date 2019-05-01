exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "space_explorer"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT,
      "password" TEXT NOT NULL,
      "email" TEXT UNIQUE NOT NULL,
      "username" TEXT,
      "status" TEXT,
      "country" TEXT,
      "date_created" DATE DEFAULT CURRENT_DATE
    );
  `),

  pgm.sql(`
    CREATE TABLE "space_explorer"."bookings"(
      "id" SERIAL PRIMARY KEY,
      "user_id" INT,
      "amount" INT
    )
    `)

  /* TODO: add more migrations */
};