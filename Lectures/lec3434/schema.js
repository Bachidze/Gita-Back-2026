export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    age: Int!
    isSmoker: Boolean!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User
  }

  input CreateUserDto {
    name: String!
    age: Int!
    isSmoker: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
  }

  type Mutation {
    deleteUser(id: ID!): Boolean!
    createUser(createUserdto: CreateUserDto!): String!
  }
`;
