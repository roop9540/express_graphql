const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()
const express = require("express")
const { graphqlHTTP } = require("express-graphql")

const schema = require('./schema/schema')
const testSchema = require("./schema/types_schema")
const mongoose = require("mongoose")
const app = express();

const username = encodeURIComponent("roop9540");
const password = encodeURIComponent("Sonu@2000");
const clusterUrl = "<MongoDB cluster url>";
const authMechanism = "DEFAULT";

// const uri = "mongodb+srv://roop9540:Sonu2000@cluster0.fy0iox2.mongodb.net/graphql_start?retryWrites=true&w=majority";




app.use('/graphql', graphqlHTTP({
    graphiql: true,
    // schema:schema 
    schema: schema
}))


mongoose.connect("mongodb+srv://roop9540:Sonu2000@cluster0.fy0iox2.mongodb.net/graphql_start?retryWrites=true&w=majority").then(() => {
    app.listen(4000, () => {
        console.log("listen for request on awesome port 4000")
    })
}).catch((err) => console.log("error" + err))

// app.listen(4000, () => {
//     console.log("listen for request on awesome port 4000")
// })


