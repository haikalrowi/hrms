// @ts-check

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      Password: { create: { password: "password" } },
      Manager: { create: {} },
    },
    include: { Manager: {} },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      Password: { create: { password: "password" } },
      Employee: { create: { Manager: { connect: { id: alice.Manager?.id } } } },
    },
  });
  const chris = await prisma.user.upsert({
    where: { email: "chris@prisma.io" },
    update: {},
    create: {
      email: "chris@prisma.io",
      name: "Chris",
      Password: { create: { password: "password" } },
      Employee: { create: { Manager: { connect: { id: alice.Manager?.id } } } },
    },
  });

  console.log({ alice, bob, chris });
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
