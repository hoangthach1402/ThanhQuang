require("dotenv").config();
const PORT = 4000;
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");
// const cors = require('cors')
const Owner = require("./Model/Owner")
const User = require("./Model/User.js");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://hoangthach1402:hoangthach123@cluster0.mmtet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
mongoose.Promise = global.Promise;

const typeDefs = gql`
type User {
   id:ID
   name:String! 
   mobile:String!
   address:String!
} 




type Query {
  users(page:Int!,limit:Int!):[User] 
  user(id: ID!): User 
  searchUserByMobile(mobile:String!):[User]

}


type Mutation {
  createUser(name:String!,password:String!):User
  
}   
 
 `;

const resolvers = {
  Query: {
    searchUserByMobile:async (parent,{mobile})=>{
     console.log(mobile.slice(0,1))
     const isMobile = mobile.slice(0,1)=="0";
     
     if(isMobile){
      const searchString = mobile ; 
      const pattern =new RegExp(searchString);
      console.log(pattern)
     return await User.find({mobile:{$regex:pattern}}).limit(2).sort({name:1})
     }else{
      const searchString = mobile ; 
      const pattern =new RegExp(searchString,'i');
      console.log(pattern)
     return await User.find({name:{$regex:pattern}}).limit(2).sort({name:1});
     }
    },
   
    users: async (parent,{page,limit}) => {
       console.log( await User.count()); 
      var skip = (page-1)*limit ;
     
      const userPage = await User.find({}).skip(skip).limit(limit);
  
      return userPage
    },
    
    user: async (parent, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const newUser = await new User(args);
      return await newUser.save();
    },
  },
};

const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true,
  },
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
