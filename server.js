var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    
    type Count {
        id: ID!
        count: Int!
    }
    
    

  type Query {
    getCount: Count
    
  }
  
  type Mutation {
    updateCount(count: Int!): Count
  }
`);

let serverCount = 0;

const wt = () => new Promise((res, rej) => {
    setTimeout(res,  serverCount === 1 ? 3000: 1000 )
})

// The root provides a resolver function for each API endpoint
var root = {
    getCount: () => {
        return {
            id: 'COUNTER_123',
            count: serverCount
        };
    },
    updateCount: async ({count}) => {
        serverCount = count
        await wt()
        return {
            id: 'COUNTER_123',
            count: count
        };
    }
};

var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');