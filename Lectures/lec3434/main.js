import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import { users, posts } from "./data.js";

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === Number(id)),
    posts: () => posts,
  },

  Post: {
    user: (parent) => users.find((user) => user.id === parent.userId),
  },

  User: {
    posts: (parent) => posts.filter((post) => post.userId === parent.id),
  },

  Mutation: {
    deleteUser: (_, { id }) => {
      const index = users.findIndex((user) => user.id === Number(id));

      if (index === -1) {
        return false;
      }

      users.splice(index, 1);
      return true;
    },

    createUser: (_, { createUserdto }) => {
      const { name, age, isSmoker } = createUserdto;

      const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        age,
        isSmoker,
        posts: [],
      };

      users.push(newUser);

      return "user created successfully";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4000 },
});

console.log(`Server ready at: ${url}`);
