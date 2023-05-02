const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Signature Dishes' },
    { name: 'Eggs Benedict' },
    { name: 'Pancake Dishes' },
    { name: 'Beverages' },
    { name: 'Sides' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Steak & Eggs",
      description:
        'Canadian AAA striploin with eggs cooked any style. Served with toast and potato wedges. Can substitute potato wedges for hash browns or french fries. [1030 Cals]',
      image: 'steak-and-eggs.png',
      category: categories[0]._id,
      price: 15.99,
      quantity: 500
    },
    {
      name: "Sausage & Eggs",
      description:
        'Fresh country sausage with eggs cooked any style. Served with toast and potato wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [1030 Cals]',
      image: 'sausage-and-eggs.png',
      category: categories[0]._id,
      price: 11.99,
      quantity: 500
    },
    {
      name: "Bacon & Eggs",
      category: categories[0]._id,
      description:
        'Double smoked bacon with eggs cooked any style. Served with toast and potao wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [1080 Cals]',
      image: 'bacon-and-eggs.png',
      price: 9.99,
      quantity: 20
    },
    {
      name: "No Carbs",
      category: categories[0]._id,
      description:
        'Double smoked bacon with eggs cooked any style. Served with potato wedges and cooked vegetables. Can substitute potato wedges for hash browns or french fries. [1020 Cals]',
      image: 'no-carbs.png',
      price: 13.99,
      quantity: 50
    },
    {
      name: "Veggies, Hash & Eggs",
      category: categories[0]._id,
      description:
        'Eggs cooked any style with sauteed potato, asparagus, onions and peppers. Served with a fruit bowl. [1130 Cals]',
      image: 'hash.png',
      price: 10.99,
      quantity: 100
    },
    {
      name: "Bacon, Pancake & Eggs",
      category: categories[0]._id,
      description:
        'Double smoked bacon with eggs cooked andy style and pancakes. Served with toast and potato wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [1050 Cals] ',
      image: 'bacon-pancake-and-eggs.png',
      price: 13.99,
      quantity: 30
    },
    {
      name: "Eggs Benedict",
      category: categories[1]._id,
      description:
        'Poached eggs on an English muffin with smoked salmon and hollandaise sauce. Served with potato wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [760 Cals]',
      image: 'smoked-salmon.png',
      price: 11.49,
      quantity: 30
    },
    {
      name: "Eggs Caprese Benedict",
      category: categories[1]._id,
      description:
        'Poached eggs on an English muffin with tomatoes, basil and hollandaise sauce. Served with potato wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [780 Cals]',
      image: 'caprese.png',
      price: 11.49,
      quantity: 100
    },
    {
      name: "Eggs Bacon Benedict",
      category: categories[1]._id,
      description: 'Poached eggs on an English muffin with Canadian bacon and hollandaise sauce. Served with potato wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [690 Cals]',
      image: 'bacon-benedict.png',
      price: 12.49,
      quantity: 1000
    },
    {
      name: "Eggs Florentine Benedict",
      category: categories[1]._id,
      description:
        'Poached eggs on an English muffin with sauteed baby spinach and hollandaise sauce. Served with potato wedges. Can substitute potato wedges for hash browns, french fries or cooked vegetables. [690 Cals]',
      image: 'florentine.png',
      price: 11.49,
      quantity: 1000
    },
    {
      name: "Pancakes",
      category: categories[2]._id,
      description:
        'Pancakes served with butter, maple syrup and fresh berries. [630 Cals]',
      image: 'pancake.png',
      price: 9.99,
      quantity: 100
    },
    {
      name: "Chocolate Chip Pancakes",
      category: categories[2]._id,
      description:
        'Pancakes made with chocolate chips served with syrup and fresh berries. [840 Cals]',
      image: 'chocolate-chip.png',
      price: 10.49,
      quantity: 600
    },
    {
      name: "Strawberry Banana Pancakes",
      category: categories[2]._id,
      description:
        'Pancakes made with strawberries and bananas served with syrup and fresh berries. [740 Cals]',
      image: 'strawberry-banana.png',
      price: 10.49,
      quantity: 600
    },
    {
      name: "Blueberry Pancakes",
      category: categories[2]._id,
      description:
        'Pancakes made with blueberries served with syrup and fresh berries. [730 Cals]',
      image: 'blueberry.png',
      price: 10.49,
      quantity: 600
    },
    {
      name: "Chocolate Filled Pancakes",
      category: categories[2]._id,
      description:
        'Pancakes made with Nutella chocolate filling served with syrup and fresh berries. [840 Cals]',
      image: 'nutella-pancake.png',
      price: 12.39,
      quantity: 600
    },
    {
      name: "Wellness Blvd Smoothie",
      category: categories[3]._id,
      description:
        'A healthy blend of baby spinach, banana, mango, vanilla yogurt and milk with a hint of honey. [240 Cals]',
      image: 'green-smoothie.png',
      price: 5.99,
      quantity: 600
    },
    {
      name: "Tropical Kiss Smoothie",
      category: categories[3]._id,
      description:
        'A refreshing blend of mango, pineapple, banana, vanilla yogurt and orange juice. [240 Cals]',
      image: 'yellow-smoothie.png',
      price: 5.99,
      quantity: 600
    },
    {
      name: "Red Very Berry Smoothie",
      category: categories[3]._id,
      description:
        'A refreshing blend of strawberries, raspberries, banana, vanilla yogurt and milk. [240 Cals]',
      image: 'red-smoothie.png',
      price: 5.99,
      quantity: 600
    },
    {
      name: "Coffee Smoothie",
      category: categories[3]._id,
      description:
        'A sweet blend of coffee, banana, dates, vanilla yogurt and milk. [240 Cals]',
      image: 'coffee-smoothie.png',
      price: 5.99,
      quantity: 600
    },
    {
      name: "Coffee",
      category: categories[3]._id,
      description:
        'Freshly brewed coffee served with cream and sugar. [5 Cals]',
      image: 'coffee.png',
      price: 3.29,
      quantity: 600
    },
    {
      name: "Iced Coffee",
      category: categories[3]._id,
      description:
        'Freshly brewed coffee served over ice with cream and sugar. [5 Cals]',
      image: 'iced-coffee.png',
      price: 3.89,
      quantity: 600
    },
    {
      name: "Potato Wedges",
      category: categories[4]._id,
      description:
        'Bowl of small baked potato wedges. [123 Cals]',
      image: 'potato-wedges.png',
      price: 3.99,
      quantity: 600
    },
    {
      name: "Hash Browns",
      category: categories[4]._id,
      description:
        'Plate of hash browns. [326 Cals]',
      image: 'hash-brown.png',
      price: 3.99,
      quantity: 600
    },
    {
      name: "French Fries",
      category: categories[4]._id,
      description:
        'Plate of french fries. [312 Cals]',
      image: 'french-fries.png',
      price: 3.99,
      quantity: 600
    },
    {
      name: "Sauteed Vegetables",
      category: categories[4]._id,
      description:
        'Plate of sauteed veggetables. [107 Cals]',
      image: 'sauteed-vegetables.png',
      price: 3.99,
      quantity: 600
    },
    {
      name: "Fruits",
      category: categories[4]._id,
      description:
        'Side of fresh berries [90 Cals]',
      image: 'fruits.png',
      price: 3.99,
      quantity: 600
    },
    {
      name: "Extra toast",
      category: categories[4]._id,
      description:
        'Plate of extra toast. [90 Cals]',
      image: 'toast.png',
      price: 1.99,
      quantity: 600
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    employee: 'false',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    employee: 'true'
  });

  await User.create({
    firstName: 'Megan',
    lastName: 'Holt',
    email: 'john@gmail.com',
    password: 'password12345',
    employee: 'true',
  });

  await User.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'jace1971@yahoo.com',
    password: 'password12345',
    employee: 'true',
  });




  console.log('users seeded');

  process.exit();
});
