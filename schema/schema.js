const graphql = require("graphql")
var _ = require("lodash")
const User = require("../model/user");
const Post = require("../model/post");
const Hobby = require("../model/hobby")

const { GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLObjectType, GraphQLList } = graphql;


// const usersData = [
//     { id: "1", name: "Sonu", age: 22, profession: "Software Developer" },
//     { id: "2", name: "Prince", age: 25, profession: "Backned Developer" },
//     { id: "3", name: "Amit", age: 12, profession: "Nodejs Developer" },
//     { id: "4", name: "Saurav", age: 34, profession: "FullStack Developer" },
//     { id: "5", name: "Aditya", age: 32, profession: "Developer" }

// ]

// const hobbiesData = [
//     { id: "1", title: "Develpment", description: "making a new websites from scratch", userId: "3" },
//     { id: "2", title: "Developer", description: "making a new backend of websites from scratch", userId: "1" },
//     { id: "3", title: "Nodejs Development", description: "making a new websites code of Nodejs from scratch", userId: "5" },
//     { id: "4", title: "wWbsite Develpment", description: "making a new websites backend and frontend from scratch", userId: "2" },
//     { id: "5", title: "UI Designer", description: "making a new websites UI from scratch", userId: "4" },
// ]

// const postsData = [
//     { id: "1", comment: "looking faboulous today", userId: "1" },
//     { id: "2", comment: "today I wnet to mall", userId: "1" },
//     { id: "3", comment: "I am happy now by looking faboulous today", userId: "1" },
//     { id: "4", comment: "after along time chiiling myself", userId: "3" },
//     { id: "5", comment: "going to sleep", userId: "2" },
// ]

//Create Types

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for User...",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, { userId: parent.id })
            }

        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, { userId: parent.id })
            }
        }
    })

})

const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: "Hobby Description",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Description of Posts",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})

//RootQuery

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                //we resolve with data
                //get and return data from a datasource
                // user = { 
                //     id: 12,
                //     name: "Roop",
                //     age: 23
                // }
                // return user;
                return _.find(usersData, { id: args.id })

            }

        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return usersData ;
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(hobbiesData, { id: args.id })
            }
        },
        hobbies:{
            type:new GraphQLList(HobbyType),
            resolve(parent, args){
                return hobbiesData;
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(postsData, { id: args.id })
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return postsData;
            }
        }

    }
})



//Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = User({
                    id: args.id,
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })
                return user.save();
            }
        },
        createPost: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let post = Post({
                    id: args.id,
                    comment: args.comment,
                    userId: args.userId
                })
                return post.save();
            }

        },
        createHobby: {
            type: HobbyType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let hobby = Hobby({
                    id: args.id,
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })
                return hobby.save();
            }
        }


    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})