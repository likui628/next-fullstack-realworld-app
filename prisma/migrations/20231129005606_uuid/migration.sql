/*
  Warnings:

  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `articles_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_tag" ("id", "name") SELECT "id", "name" FROM "tag";
DROP TABLE "tag";
ALTER TABLE "new_tag" RENAME TO "tag";
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
CREATE TABLE "new_article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "author_id" TEXT NOT NULL,
    "del" BOOLEAN NOT NULL DEFAULT false,
    "favorites_count" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_article" ("author_id", "body", "created_at", "del", "description", "favorites_count", "id", "slug", "title", "updated_at") SELECT "author_id", "body", "created_at", "del", "description", "favorites_count", "id", "slug", "title", "updated_at" FROM "article";
DROP TABLE "article";
ALTER TABLE "new_article" RENAME TO "article";
CREATE UNIQUE INDEX "article_slug_key" ON "article"("slug");
CREATE TABLE "new_articles_tags" (
    "article_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    PRIMARY KEY ("article_id", "tag_id"),
    CONSTRAINT "articles_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "articles_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_articles_tags" ("article_id", "tag_id") SELECT "article_id", "tag_id" FROM "articles_tags";
DROP TABLE "articles_tags";
ALTER TABLE "new_articles_tags" RENAME TO "articles_tags";
CREATE TABLE "new_comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "body" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "del" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comment" ("article_id", "author_id", "body", "created_at", "del", "id", "updated_at") SELECT "article_id", "author_id", "body", "created_at", "del", "id", "updated_at" FROM "comment";
DROP TABLE "comment";
ALTER TABLE "new_comment" RENAME TO "comment";
CREATE TABLE "new_favorites" (
    "article_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("article_id", "user_id"),
    CONSTRAINT "favorites_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favorites" ("article_id", "user_id") SELECT "article_id", "user_id" FROM "favorites";
DROP TABLE "favorites";
ALTER TABLE "new_favorites" RENAME TO "favorites";
CREATE TABLE "new_follows" (
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,

    PRIMARY KEY ("follower_id", "following_id"),
    CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_follows" ("follower_id", "following_id") SELECT "follower_id", "following_id" FROM "follows";
DROP TABLE "follows";
ALTER TABLE "new_follows" RENAME TO "follows";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bio" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL
);
INSERT INTO "new_user" ("bio", "email", "id", "image", "password", "username") SELECT "bio", "email", "id", "image", "password", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
