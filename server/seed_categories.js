const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const categoryNames = ['Men', 'Women', 'Kids', 'Accessories', 'Electronics'];
  
  // Create categories
  console.log('Creating categories...')
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  
  const allCategories = await prisma.category.findMany();
  console.log('Categories created:', allCategories.map(c => c.name));

  // Link products to random categories
  console.log('Linking existing products to categories...')
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (!p.categoryId) {
      // Pick a random category
      const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
      await prisma.product.update({
        where: { id: p.id },
        data: { categoryId: randomCategory.id }
      });
      console.log(`Linked product "${p.name}" to category "${randomCategory.name}"`);
    }
  }
  console.log('Data seeding completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect())
