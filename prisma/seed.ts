import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const markdown = `
## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

* Item 1
* Item 2
* Item 2a
* Item 2b

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`
`

async function main() {
  console.log(`Start seeding ...`)
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      username: 'Alice',
      password: '123456',
      email: 'alice@prisma.io',
      bio: 'I like turtles.',
      image: 'https://api.realworld.io/images/demo-avatar.png',
      articles: {
        create: [
          {
            title: 'How to train your dragon',
            slug: 'how-to-train-your-dragon',
            description: 'Ever wonder how?',
            body: 'You have to believe',
            tagList: {
              create: [
                {
                  tag: {
                    create: { name: 'dragons' },
                  },
                },
                {
                  tag: {
                    create: { name: 'training' },
                  },
                },
              ],
            },
          },
          {
            title: 'Markdown syntax guide',
            slug: 'markdown-syntax-guide',
            description: '',
            body: markdown,
            tagList: {
              create: [
                {
                  tag: {
                    create: { name: 'markdown' },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  const gerome = await prisma.user.upsert({
    where: { email: 'gerome@realworld.io' },
    update: {},
    create: {
      username: 'Gerome',
      password: '123456',
      email: 'gerome@realworld.io',
      bio: 'Hello followers.',
      image: '',
      articles: {
        create: [
          {
            title: 'Welcome to RealWorld project',
            slug: 'welcome-to-realWorld-project-1',
            description: '',
            body: 'See how the exact same Medium.com clone (called Conduit) is built using different frontends and backends. Yes, you can mix and match them, because they all adhere to the same API spec',
            tagList: {
              create: [
                {
                  tag: {
                    create: { name: 'welcome' },
                  },
                },
                {
                  tag: {
                    create: { name: 'introduction' },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
