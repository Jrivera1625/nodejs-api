const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "greenlinepos";

const getOrders = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const orders = await dynamoClient.scan(params).promise();
    console.log(orders);
    return orders;
}

const addOrUpdateOrder = async (order) => {
    const params = {
        TableName: TABLE_NAME,
        Item: order
    }
    return await dynamoClient.put(params).promise();
}

const getOrderById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise();
}

const deleteOrder = async (id) => {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id,
            }
        }
        return await dynamoClient.delete(params).promise();
    }
//addOrUpdateOrder(firstOrder);
getOrders();

module.exports = {
    dynamoClient,
    getOrderById,
    getOrders,
    addOrUpdateOrder,
    deleteOrder
};

const firstOrder = {
    "id" : "0",
    "name": "Harry Potter",
    "company": "Gryffindor",
    "orderplaced": "31-07-2022",
    "sales": {
        "product1": {
            'name': "holly wood",
            'sales': 40,
          },
        "product2": {
            'name': "phoenix feather",
            'sales': 10,
          },
    },
    "image": "http://hp-api.herokuapp.com/images/harry.jpg"
    }

const secondorder = [
    {
        "id" : "0",
        "name": "Harry Potter",
        "company": "Gryffindor",
        "orderplaced": "31-07-2022",
        "sales": {
            "product1": {
                'name': "holly wood",
                'sales': 40,
              },
            "product2": {
                'name': "phoenix feather",
                'sales': 10,
              },
        },
        "image": "http://hp-api.herokuapp.com/images/harry.jpg"
        },
        {
        "id" : "1",
        "name": "Hermione Granger",
        "company": "McDonalds",
        "orderplaced": "19-09-2022",
        "sales": {
            "product1": {
                'name': "vine wood",
                'sales': 10,
              },
            "product2": {
                'name': "dragon heart string",
                'sales': 50,
              },
        },
        "image": "http://hp-api.herokuapp.com/images/hermione.jpeg"
        },
        {
        "id": "2",
        "name": "Ron Weasley",
        "company": "findor",
        "orderplaced": "01-03-2022",
        "sales": {
            "product1": {
                'name': "willow wood",
                'sales': 30,
              },
            "product2": {
                'name': "unicorn tail-hair",
                'sales': 10,
              },
        },
        "image": "http://hp-api.herokuapp.com/images/ron.jpg"
        },
        {
        "id":  "3",
        "name": "Cedric Diggory",
        "company": "Hufflepuff",
        "orderplaced": "02-04-2022",
        "sales": {
            "product1": {
                'name': "willow wood",
                'sales': 30,
              },
            "product2": {
                'name': "unicorn tail-hair",
                'sales': 10,
              },
        },
        "image": "http://hp-api.herokuapp.com/images/cedric.png"
        },
        {"id": "4",
        "name": "Cho Chang",
        "company": "Ravenclaw",
        "orderplaced": "05-07-2022",
        "sales": {
            "product1": {
                'name': "wands",
                'sales': 30,
              },
            "product2": {
                'name': "shoes",
                'sales': 10,
              },
        },
        "image": "http://hp-api.herokuapp.com/images/cho.jpg"
        },          
];
/*
for (let i = 1; i < secondorder.length; i++){
    addOrUpdateOrder(secondorder[i]);
} */

