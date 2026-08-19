const prisma = require('../config/db');

const listCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return categories;
};

module.exports = {
  listCategories,
};
