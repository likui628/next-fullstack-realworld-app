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
                    connectOrCreate: {
                      where: {
                        name: 'dragons',
                      },
                      create: { name: 'dragons' },
                    },
                  },
                },
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'training',
                      },
                      create: { name: 'training' },
                    },
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
                    connectOrCreate: {
                      where: {
                        name: 'markdown',
                      },
                      create: { name: 'markdown' },
                    },
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
                    connectOrCreate: {
                      where: {
                        name: 'welcome',
                      },
                      create: { name: 'welcome' },
                    },
                  },
                },
                {
                  tag: {
                    create: { name: 'welcome' },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  const anah = await prisma.user.upsert({
    where: { email: 'anah@realworld.io' },
    update: {},
    create: {
      username: 'Anah Benešová',
      password: '123456',
      email: 'anah@realworld.io',
      bio: '',
      image: '',
      articles: {
        create: [
          {
            title:
              'Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!',
            slug: 'Try-to-transmit-the-HTTP-card-maybe-it-will-override-the-multi-byte-hard-drive!-120863',
            description: '',
            body: 'Sunt excepturi ut dolore fuga.\\nAutem eum maiores aut nihil magnam corporis consectetur sit. Voluptate et quasi optio eos et eveniet culpa et nobis.\\nSint aut sint sequi possimus reiciendis nisi.\\nRerum et omnis et sit doloribus corporis voluptas error.\\nIusto molestiae tenetur necessitatibus dolorem omnis. Libero sed ut architecto.\\nEx itaque et modi aut voluptatem alias quae.\\nModi dolor cupiditate sit.\\nDelectus consectetur nobis aliquid deserunt sint ut et voluptas.\\nCorrupti in labore laborum quod. Ipsa laudantium deserunt. Ut atque harum inventore natus facere sed molestiae.\\nQuia aliquid ut.\\nAnimi sunt rem et sit ullam dolorem ab consequatur modi. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et. Et fuga repellendus magnam dignissimos eius aspernatur rerum. Quo perferendis nesciunt.\\nDolore dolorem porro omnis voluptatibus consequuntur et expedita suscipit et.\\nTempora facere ipsa.\\nDolore accusamus soluta officiis eligendi.\\nEum quaerat neque eum beatae odio. Ad voluptate vel.\\nAut aut dolor. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'voluptate',
                      },
                      create: { name: 'voluptate' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!',
            slug: 'If-we-quantify-the-alarm-we-can-get-to-the-FTP-pixel-through-the-online-SSL-interface!-120863',
            description: '',
            body: 'Quia quo iste et aperiam voluptas consectetur a omnis et.\\nDolores et earum consequuntur sunt et.\\nEa nulla ab voluptatem dicta vel. Temporibus aut adipisci magnam aliquam eveniet nihil laudantium reprehenderit sit.\\nAspernatur cumque labore voluptates mollitia deleniti et. Quos pariatur tenetur.\\nQuasi omnis eveniet eos maiores esse magni possimus blanditiis.\\nQui incidunt sit quos consequatur aut qui et aperiam delectus.\\nPraesentium quas culpa.\\nEaque occaecati cumque incidunt et. Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae. Voluptatum tempora voluptas est odio iure odio dolorem.\\nVoluptatum est deleniti explicabo explicabo harum provident quis molestiae. Sed dolores nostrum quis. Aut ipsa et qui vel similique sed hic a.\\nVoluptates dolorem culpa nihil aut ipsam voluptatem. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et. Facere beatae delectus ut.\\nPossimus voluptas perspiciatis voluptatem nihil sint praesentium.\\nSint est nihil voluptates nesciunt voluptatibus temporibus blanditiis.\\nOfficiis voluptatem earum sed. Deserunt ab porro similique est accusamus id enim aut suscipit.\\nSoluta reprehenderit error nesciunt odit veniam sed.\\nDolore optio qui aut ab.\\nAut minima provident eius repudiandae a quibusdam in nisi quam.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'FTP',
                      },
                      create: { name: 'FTP' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Try to bypass the SAS card, maybe it will transmit the solid state system!',
            slug: 'Try-to-bypass-the-SAS-card-maybe-it-will-transmit-the-solid-state-system!-120863',
            description: '',
            body: 'Ipsa cumque ad repellat qui libero quia impedit fugiat.\\nExcepturi ut vitae recusandae eos quisquam et voluptatem.\\nNeque nostrum distinctio provident eius tempore odio aliquid.\\nSaepe ut suscipit architecto. Sapiente vitae culpa ut voluptatem incidunt excepturi voluptates exercitationem.\\nSed doloribus alias consectetur omnis occaecati ad placeat labore.\\nVoluptate consequatur expedita nemo recusandae sint assumenda.\\nQui vel totam quia fugit saepe suscipit autem quasi qui.\\nEt eum vel ut delectus ut nesciunt animi. Mollitia nostrum exercitationem sunt rem.\\nRem et voluptas consequatur mollitia nostrum.\\nSunt nesciunt et pariatur quam provident impedit. Officia consectetur quibusdam velit debitis porro quia cumque.\\nSuscipit esse voluptatem cum sit totam consequatur molestiae est.\\nMollitia pariatur distinctio fugit. Qui et dolorum.\\nEveniet architecto qui accusamus et modi harum facilis a eum.\\nEt vel cumque voluptatem earum minima perferendis. Illum voluptates ut vel et.\\nUt debitis excepturi suscipit perferendis officia numquam possimus.\\nFacere sit doloremque repudiandae corrupti veniam qui. Ipsa laudantium deserunt. Totam ab necessitatibus quidem non. Mollitia nostrum exercitationem sunt rem.\\nRem et voluptas consequatur mollitia nostrum.\\nSunt nesciunt et pariatur quam provident impedit. Molestias non debitis quibusdam quis quod.\\nSaepe ab et hic unde et sed.\\nMagni voluptatem est.\\nEt similique quo porro et.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'dolores',
                      },
                      create: { name: 'dolores' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Use the auxiliary EXE monitor, then you can hack the haptic port!',
            slug: 'Use-the-auxiliary-EXE-monitor-then-you-can-hack-the-haptic-port!-120863',
            description: '',
            body: 'Est est sed itaque necessitatibus vitae officiis.\\nIusto dolores sint eveniet quasi dolore quo laborum esse laboriosam.\\nModi similique aut voluptates animi aut dicta dolorum.\\nSint explicabo autem quidem et.\\nNeque aspernatur assumenda fugit provident. Aut ipsa et qui vel similique sed hic a.\\nVoluptates dolorem culpa nihil aut ipsam voluptatem. Dolores accusamus ducimus suscipit neque fugit quo aliquam.\\nOdit eum eum sint accusamus.\\nQuod ipsum sed placeat.\\nEt culpa voluptas et quod atque a.\\nVoluptatibus rerum nihil quia cupiditate nihil facere beatae dolor. Fugit harum mollitia.\\nMagni eos asperiores assumenda ad. Id est non ad temporibus nobis.\\nQuod soluta quae voluptatem quisquam est. Quas ea voluptatem iste iure.\\nEt soluta et doloremque vero quis occaecati et fuga.\\nIncidunt recusandae dignissimos iusto quisquam sed unde at ea incidunt.\\nId voluptate incidunt qui totam autem voluptas maxime atque quaerat.\\nCorporis iste ut molestiae. Illum voluptates ut vel et.\\nUt debitis excepturi suscipit perferendis officia numquam possimus.\\nFacere sit doloremque repudiandae corrupti veniam qui. Sunt excepturi ut dolore fuga.\\nAutem eum maiores aut nihil magnam corporis consectetur sit. Laborum itaque quos provident.\\nRerum cupiditate praesentium amet voluptatem dolor impedit modi dicta.\\nVoluptates assumenda optio est.\\nNon aperiam nam consequuntur vel a commodi dicta incidunt. Quia consequatur voluptatibus et.\\nVoluptatibus aspernatur et.\\nDicta architecto qui dignissimos.\\nVeritatis facilis voluptatem inventore aliquid cum.\\nNumquam odio quis porro sunt adipisci culpa.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'necessitatibus',
                      },
                      create: { name: 'necessitatibus' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'You cant connect the interface without programming the virtual PNG protocol!',
            slug: 'You-cant-connect-the-interface-without-programming-the-virtual-PNG-protocol!-120863',
            description: '',
            body: 'Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et. Commodi est rerum dolorum quae voluptatem aliquam. Ad voluptate vel.\\nAut aut dolor. Iusto laborum aperiam neque delectus consequuntur provident est maiores explicabo. Voluptatum tempora voluptas est odio iure odio dolorem.\\nVoluptatum est deleniti explicabo explicabo harum provident quis molestiae. Commodi est rerum dolorum quae voluptatem aliquam. Doloribus temporibus dolorum placeat.\\nFugit nulla quaerat.\\nEveniet ratione odit sed non rerum.\\nNemo tempore eveniet veritatis alias repellat et.\\nVoluptas nisi quis commodi id. Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae. Ipsa cumque ad repellat qui libero quia impedit fugiat.\\nExcepturi ut vitae recusandae eos quisquam et voluptatem.\\nNeque nostrum distinctio provident eius tempore odio aliquid.\\nSaepe ut suscipit architecto. Molestias non debitis quibusdam quis quod.\\nSaepe ab et hic unde et sed.\\nMagni voluptatem est.\\nEt similique quo porro et.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'labore',
                      },
                      create: { name: 'labore' },
                    },
                  },
                },
              ],
            },
          },
          {
            title: 'We need to bypass the redundant RAM pixel!',
            slug: 'We-need-to-bypass-the-redundant-RAM-pixel!-120863',
            description: '',
            body: 'Ducimus dolores recusandae.\\nEa aut aperiam et aut eos inventore.\\nQuia cum ducimus autem iste.\\nQuos consequuntur est delectus temporibus autem. Et sed dicta eveniet accusamus consequatur.\\nUllam voluptas consequatur aut eos ducimus.\\nId officia est ut dicta provident beatae ipsa. Est est sed itaque necessitatibus vitae officiis.\\nIusto dolores sint eveniet quasi dolore quo laborum esse laboriosam.\\nModi similique aut voluptates animi aut dicta dolorum.\\nSint explicabo autem quidem et.\\nNeque aspernatur assumenda fugit provident. Ab rerum eos ipsa accusantium nihil voluptatem.\\nEum minus alias.\\nIure commodi at harum.\\nNostrum non occaecati omnis quisquam. Ut atque harum inventore natus facere sed molestiae.\\nQuia aliquid ut.\\nAnimi sunt rem et sit ullam dolorem ab consequatur modi. In ipsam mollitia placeat quia adipisci rerum labore repellat. Ad voluptate vel.\\nAut aut dolor. Quas ea voluptatem iste iure.\\nEt soluta et doloremque vero quis occaecati et fuga.\\nIncidunt recusandae dignissimos iusto quisquam sed unde at ea incidunt.\\nId voluptate incidunt qui totam autem voluptas maxime atque quaerat.\\nCorporis iste ut molestiae. Deleniti explicabo assumenda ipsum cumque voluptatem blanditiis voluptatum omnis provident.\\nQuis placeat nisi fugit aperiam quaerat mollitia.\\nOccaecati repellendus voluptate similique.\\nLaboriosam qui qui voluptas itaque ipsa. Est aut quis soluta accusantium debitis vel.\\nQuisquam aliquid ex corporis velit.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'necessitatibus',
                      },
                      create: { name: 'necessitatibus' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Use the cross-platform THX array, then you can parse the primary capacitor!',
            slug: 'Use-the-cross-platform-THX-array-then-you-can-parse-the-primary-capacitor!-120863',
            description: '',
            body: 'Cum vitae aliquam neque consequatur quia id dicta ipsam.\\nExercitationem ab eum exercitationem non alias numquam qui.\\nItaque rerum ut nobis est nam vitae exercitationem minima fugiat.\\nEst sit non tempora soluta consequatur eveniet.\\nCorporis nisi dolorem architecto voluptatem. Et sed dicta eveniet accusamus consequatur.\\nUllam voluptas consequatur aut eos ducimus.\\nId officia est ut dicta provident beatae ipsa. Debitis facilis dolorum maiores aut et.\\nEa voluptas magnam deserunt at ut sunt voluptatem.\\nEt voluptatem voluptatem.\\nUt est fugiat magnam. Rerum minus et quia et dolorem officiis sunt id.\\nPariatur dolorum sint blanditiis ex vero optio.\\nQuam numquam omnis porro voluptatem. Autem sed aspernatur aut sint ipsam et facere rerum voluptas.\\nPerferendis eligendi molestias laudantium eveniet eos.\\nId veniam asperiores quis voluptates aut deserunt.\\nTempora et eius dignissimos nulla iusto et omnis pariatur.\\nSit mollitia eum blanditiis suscipit. Voluptatem velit ut deserunt.\\nQuibusdam eius repellat. Voluptas aut occaecati cum et quia quam.\\nBeatae libero doloribus nesciunt iusto.\\nDolores vitae neque quisquam qui ipsa ut aperiam. Et sed dicta eveniet accusamus consequatur.\\nUllam voluptas consequatur aut eos ducimus.\\nId officia est ut dicta provident beatae ipsa. Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae. Minima qui ut nulla eius.\\nA incidunt ipsum tempore porro tempore.\\nFugit quas voluptas ducimus aut.\\nTempore nostrum velit expedita voluptate est.\\nNam iste explicabo tempore impedit voluptas.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'voluptate',
                      },
                      create: { name: 'voluptate' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Try to generate the TCP bus, maybe it will override the neural bandwidth!',
            slug: 'Try-to-generate-the-TCP-bus-maybe-it-will-override-the-neural-bandwidth!-120863',
            description: '',
            body: 'Quo perferendis nesciunt.\\nDolore dolorem porro omnis voluptatibus consequuntur et expedita suscipit et.\\nTempora facere ipsa.\\nDolore accusamus soluta officiis eligendi.\\nEum quaerat neque eum beatae odio. Qui soluta veritatis autem repellat et inventore occaecati. Doloribus consequatur et labore suscipit deserunt tempore ad quasi sed.\\nQuam cupiditate modi dolor et eos et culpa qui.\\nDelectus molestias ea id.\\nIllum ea unde sapiente non non non.\\nDolorem ut sed magni. Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae. Incidunt doloremque enim autem quam et magnam et expedita fuga.\\nPlaceat quia dolor ut.\\nNon dolor amet temporibus quas non hic sed.\\nQui tempore enim mollitia omnis sed ut eos rerum et.\\nQuidem voluptas est vel. Placeat sequi quaerat sapiente aspernatur autem sunt molestiae voluptatem.\\nAccusamus unde libero accusamus omnis totam et temporibus. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et. Iusto laborum aperiam neque delectus consequuntur provident est maiores explicabo. Laborum est maxime enim accusantium magnam.\\nRerum dolorum minus laudantium delectus eligendi necessitatibus quia.\\nDeleniti consequatur explicabo aut nobis est vero tempore.\\nExcepturi earum quo quod voluptatem quo iure vel sapiente occaecati.\\nConsectetur consequatur corporis doloribus omnis harum voluptas esse amet. Mollitia nostrum exercitationem sunt rem.\\nRem et voluptas consequatur mollitia nostrum.\\nSunt nesciunt et pariatur quam provident impedit.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'voluptate',
                      },
                      create: { name: 'voluptate' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Use the cross-platform THX array, then you can parse the primary capacitor!',
            slug: 'Use-the-cross-platform-THX-array-then-you-can-parse-the-primary-capacitor!-120863',
            description: '',
            body: 'Cum vitae aliquam neque consequatur quia id dicta ipsam.\\nExercitationem ab eum exercitationem non alias numquam qui.\\nItaque rerum ut nobis est nam vitae exercitationem minima fugiat.\\nEst sit non tempora soluta consequatur eveniet.\\nCorporis nisi dolorem architecto voluptatem. Et sed dicta eveniet accusamus consequatur.\\nUllam voluptas consequatur aut eos ducimus.\\nId officia est ut dicta provident beatae ipsa. Debitis facilis dolorum maiores aut et.\\nEa voluptas magnam deserunt at ut sunt voluptatem.\\nEt voluptatem voluptatem.\\nUt est fugiat magnam. Rerum minus et quia et dolorem officiis sunt id.\\nPariatur dolorum sint blanditiis ex vero optio.\\nQuam numquam omnis porro voluptatem. Autem sed aspernatur aut sint ipsam et facere rerum voluptas.\\nPerferendis eligendi molestias laudantium eveniet eos.\\nId veniam asperiores quis voluptates aut deserunt.\\nTempora et eius dignissimos nulla iusto et omnis pariatur.\\nSit mollitia eum blanditiis suscipit. Voluptatem velit ut deserunt.\\nQuibusdam eius repellat. Voluptas aut occaecati cum et quia quam.\\nBeatae libero doloribus nesciunt iusto.\\nDolores vitae neque quisquam qui ipsa ut aperiam. Et sed dicta eveniet accusamus consequatur.\\nUllam voluptas consequatur aut eos ducimus.\\nId officia est ut dicta provident beatae ipsa. Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae. Minima qui ut nulla eius.\\nA incidunt ipsum tempore porro tempore.\\nFugit quas voluptas ducimus aut.\\nTempore nostrum velit expedita voluptate est.\\nNam iste explicabo tempore impedit voluptas.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'blanditiis',
                      },
                      create: { name: 'blanditiis' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'quantifying the microchip wont do anything, we need to index the online SQL hard drive!',
            slug: 'quantifying-the-microchip-wont-do-anything-we-need-to-index-the-online-SQL-hard-drive',
            description: '',
            body: 'Ab rerum eos ipsa accusantium nihil voluptatem.\\nEum minus alias.\\nIure commodi at harum.\\nNostrum non occaecati omnis quisquam. Id est non ad temporibus nobis.\\nQuod soluta quae voluptatem quisquam est. Quos pariatur tenetur.\\nQuasi omnis eveniet eos maiores esse magni possimus blanditiis.\\nQui incidunt sit quos consequatur aut qui et aperiam delectus.\\nPraesentium quas culpa.\\nEaque occaecati cumque incidunt et. Sunt excepturi ut dolore fuga.\\nAutem eum maiores aut nihil magnam corporis consectetur sit. Ipsa cumque ad repellat qui libero quia impedit fugiat.\\nExcepturi ut vitae recusandae eos quisquam et voluptatem.\\nNeque nostrum distinctio provident eius tempore odio aliquid.\\nSaepe ut suscipit architecto. Cum vitae aliquam neque consequatur quia id dicta ipsam.\\nExercitationem ab eum exercitationem non alias numquam qui.\\nItaque rerum ut nobis est nam vitae exercitationem minima fugiat.\\nEst sit non tempora soluta consequatur eveniet.\\nCorporis nisi dolorem architecto voluptatem. Quos pariatur tenetur.\\nQuasi omnis eveniet eos maiores esse magni possimus blanditiis.\\nQui incidunt sit quos consequatur aut qui et aperiam delectus.\\nPraesentium quas culpa.\\nEaque occaecati cumque incidunt et. Illum voluptates ut vel et.\\nUt debitis excepturi suscipit perferendis officia numquam possimus.\\nFacere sit doloremque repudiandae corrupti veniam qui. Ab quis aut earum.\\nVoluptatem sint accusantium sed cupiditate optio.\\nConsequatur in dolores aut enim.\\nNon sunt atque maxime dolores.\\nNam impedit sit. Est est sed itaque necessitatibus vitae officiis.\\nIusto dolores sint eveniet quasi dolore quo laborum esse laboriosam.\\nModi similique aut voluptates animi aut dicta dolorum.\\nSint explicabo autem quidem et.\\nNeque aspernatur assumenda fugit provident.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'voluptatem',
                      },
                      create: { name: 'voluptatem' },
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Ill synthesize the primary AI capacitor, that should array the JBOD sensor!',
            slug: 'Ill-synthesize-the-primary-AI-capacitor-that-should-array-the-JBOD-sensor',
            description: '',
            body: 'Pariatur quo neque est perspiciatis non illo rerum expedita minima.\\nEt commodi voluptas eos ex.\\nUnde velit delectus deleniti deleniti non in sit.\\nAliquid voluptatem magni. Ut in omnis sapiente laboriosam autem laborum.\\nRepellendus et beatae qui qui numquam saepe.\\nNon vitae molestias quos illum.\\nSed fugiat qui ullam molestias ad ullam dolore.\\nAutem ex minus distinctio dicta sapiente beatae veritatis at. Dicta quia molestias natus est.\\nSit animi inventore a ut ut suscipit.\\nEos et et commodi eligendi nihil.\\nEa reprehenderit consectetur eum. Autem sed aspernatur aut sint ipsam et facere rerum voluptas.\\nPerferendis eligendi molestias laudantium eveniet eos.\\nId veniam asperiores quis voluptates aut deserunt.\\nTempora et eius dignissimos nulla iusto et omnis pariatur.\\nSit mollitia eum blanditiis suscipit. Et fuga repellendus magnam dignissimos eius aspernatur rerum. Dolorum eius dignissimos et magnam voluptate aut voluptatem natus.\\nAut sint est eum molestiae consequatur officia omnis.\\nQuae et quam odit voluptatum itaque ducimus magni dolores ab.\\nDolorum sed iure voluptatem et reiciendis. Ad voluptate vel.\\nAut aut dolor. Facere consequatur ullam.\\nSint illum iste ab et saepe sit ut quis voluptatibus.\\nQuo esse dolorum a quasi nihil.\\nError quo eveniet.\\nQuia aut rem quia in iste fugit ad. Voluptas aut occaecati cum et quia quam.\\nBeatae libero doloribus nesciunt iusto.\\nDolores vitae neque quisquam qui ipsa ut aperiam. Deserunt ab porro similique est accusamus id enim aut suscipit.\\nSoluta reprehenderit error nesciunt odit veniam sed.\\nDolore optio qui aut ab.\\nAut minima provident eius repudiandae a quibusdam in nisi quam.',
            tagList: {
              create: [
                {
                  tag: {
                    connectOrCreate: {
                      where: {
                        name: 'possimus',
                      },
                      create: { name: 'possimus' },
                    },
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
