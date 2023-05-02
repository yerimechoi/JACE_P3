import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        employee
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;
//

export const ADD_KITCHEN_ORDER = gql`
  mutation addKitchenOrder(
    $products: [ID]!
    $tableNumber: String!
    $userName: String!
  ) {
    addKitchenOrder(
      products: $products
      tableNumber: $tableNumber
      userName: $userName
    ) {
      products {
        _id
        name

      }
      purchaseDate
    }
  }
`;


export const UPDATE_KITCHEN_ORDER = gql`
  mutation updateKitchenOrder($id: ID!) {
    updateKitchenOrder (
      _id: $id
      ) {
        tableNumber
    }
  }
  `;

export const DELETE_KITCHEN_ORDERS = gql`
  mutation deleteKitchenOrders($_id: [ID!]) {
    deleteKitchenOrders(_id: $_id) {
      _id
      status 
    }
  }
  `;

//
export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($id: ID!) {
    updateEmployee (
      _id: $id
      ) {
        employee
    }
  }
  `;




export const ADD_USER = gql`
  mutation addUser(
  $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
) {
  addUser(
    firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
  ) {
    token
      user {
      _id
      email
    }
  }
}
`;
