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
  console.log({ alice });
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
