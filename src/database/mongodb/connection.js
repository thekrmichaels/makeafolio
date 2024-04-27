const mongoose = require("mongoose");
require('dotenv').config()
const Category = require('./models/category')
const { routes } = require('../../controllers/helpers/GetCategoryIdFromRoute');

const documentsToInsert = [
  { _id: routes['/contacts'], name: 'Contacts' },
  { _id: routes['/descriptions'], name: 'Descriptions' },
  { _id: routes['/titles'], name: 'Titles' }
]

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existingCategories = await Category.find({ _id: { $in: documentsToInsert.map(doc => doc._id) } })

  if (existingCategories.length === 0) {
    await Category.insertMany(documentsToInsert)

    console.log('Category/ies inserted successfully')
  } else {
    const existingIds = existingCategories.map(category => category._id)
    const notInsertedDocuments = documentsToInsert.filter(doc => !existingIds.includes(doc._id))

    console.log('Some document(s) already exist in the database. Change the _id(s) and try again')
    console.log(notInsertedDocuments)
  }
}

module.exports = main;
