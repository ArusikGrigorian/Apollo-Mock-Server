import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
const articles = [
    {
        id: 1,
        title: "Title - First Mocked Article",
        description: "Description - First Mocked Article",
        author: "Author - First Mocked Article",
    },
    {
        id: 2,
        title: "Title - Second Mocked Article",
        description: "Description - Second Mocked Article",
        author: "Author - Second Mocked Article",
    },
];
const typeDefs = `#graphql

type Article {
    id: Int!,
    title: String!,
    description: String!,
    author: String!
}

type Query {
  article(id: Int!): Article!,
  articles: [Article!]!
}
`;
const resolvers = {
    Query: {
        article(_, { id }) {
            return articles.find((article) => article.id === id);
        },
    },
};
const mocks = {
    Query: () => ({
        articles: () => articles,
    }),
};
const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks,
        preserveResolvers: true,
    }),
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server is listening to the port ${url}`);
