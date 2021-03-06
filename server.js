var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema

var schema = buildSchema(`
    type Query {
        course(id : Int!) : Course
        courses(topic: String): [Course]
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [
    {
        id : 1,
        title: ' The complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        Description: 'Node.js',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id : 2,
        title: ' Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        Description: 'Node.js',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {

        id : 3,
        title: ' Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        Description: 'Node.js',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'

    }
]

var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course =>{
        return course.id == id;
    })[0];
}

var getCourses = function(args){
    if(args.topic){
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    }else{
        return coursesData;
    }

}
// Root resolver
var root = {
    course: getCourse,
    courses: getCourses
};

//Create and express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema : schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL server now runnig on local host:4000/graphql'));
