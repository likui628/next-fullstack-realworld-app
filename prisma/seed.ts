import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      username: "Alice",
      password: "123456",
      email: "alice@prisma.io",
      bio: "I like turtles.",
      image: "https://i.stack.imgur.com/xHWG8.jpg",
      articles: {
        create: [
          {
            title: "How to train your dragon",
            slug: "how-to-train-your-dragon",
            description: "Ever wonder how?",
            body: "You have to believe",
            tagList: {
              create: [
                {
                  tag: {
                    create: { name: "dragons" },
                  },
                },
                {
                  tag: {
                    create: { name: "training" },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const gerome = await prisma.user.upsert({
    where: { email: "gerome@realworld.io" },
    update: {},
    create: {
      username: "Gerome",
      password: "123456",
      email: "gerome@realworld.io",
      bio: "Hello followers.",
      image: "",
      articles: {
        create: [
          {
            title: "Welcome to RealWorld project",
            slug: "welcome-to-realWorld-project-1",
            description: "",
            body: "See how the exact same Medium.com clone (called Conduit) is built using different frontends and backends. Yes, you can mix and match them, because they all adhere to the same API spec",
            tagList: {
              create: [
                {
                  tag: {
                    create: { name: "welcome" },
                  },
                },
                {
                  tag: {
                    create: { name: "introduction" },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
