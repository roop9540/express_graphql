const graphql = require("graphql")

const { GraphQLID, GraphQLNonNull, GraphQLFloat, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLObjectType, GraphQLList } = graphql;



//scaler type
/*
String = GraphQLStringType
int
Float
Boolean
ID
 */
const Person = new GraphQLObjectType({
    name: "Person",
    description: "Represents a Person Type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString)},
        age: { type:new GraphQLNonNull(GraphQLInt) },
        isMarried: { type: GraphQLBoolean },
        gpa: { type: GraphQLFloat },

        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }


    })

})


//RootQuery

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    // id: 1,
                    name:null,
                    age: null,
                    isMarried: false,
                    gpa: 2.33
                }
                return personObj;
            }


        }


    }
})






module.exports = new GraphQLSchema({
    query: RootQuery,
   
})