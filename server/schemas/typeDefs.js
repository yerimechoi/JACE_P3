const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type KitchenOrder {
    _id: ID
    purchaseDate: String
    purchaseTime: String
    tableNumber: String
    status: String
    userName: String
    products: [Product]
  }
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    employee: String
    orders: [Order]
  }

  type Users {
    _id: ID
    firstName: String
    lastName: String
    email: String
    employee: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    kitchenOrder: [KitchenOrder]
    user: User
    users: [Users]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addKitchenOrder(products: [ID]!, tableNumber: String!, userName: String!): KitchenOrder
    updateKitchenOrder(_id: ID!): KitchenOrder
    deleteKitchenOrders(_id: [ID!]): KitchenOrder
    updateUser(firstName: String, lastName: String, email: String, password: String, employee: String): User
    updateEmployee(_id: ID!): Users
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
