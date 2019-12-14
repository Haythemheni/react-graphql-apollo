const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


// Customer Type
const VisitorType = new GraphQLObjectType({
    name:'Visitors',
    fields:() => ({
        date: {type:GraphQLString},
        device: {type: GraphQLString},
        ip: {type: GraphQLString},
       
    })
});

// Root Query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        // visitor:{
        //     type:VisitorType,
        //     args:{
        //         date:{type:GraphQLString}
        //     },
        //     resolve(parentValue, args){
               
        //         return axios.get('http://localhost:4000/visitors/'+ args.date)
        //             .then(res => res.data);

        //     }
        // },
        visitors:{
            type: new GraphQLList(VisitorType),
            args:{
                page:{type:GraphQLInt}
        },
            resolve(parentValue, args){
                return axios.get('http://localhost:5000/visitors?_page='+args.page+'&_limit=5')
                    .then(res => res.data);
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
    
});