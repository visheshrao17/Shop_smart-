const categoryService = require('../services/categoryService');

const list = async (req, res) => {
  const categories = await categoryService.listCategories();
  res.status(200).json({
    success: true,
    data: categories,
  });
};

module.exports = {
  list,
};
