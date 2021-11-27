const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectID,
const ObjectId = require('mongodb').ObjectId;
const port = 5000;

//addbutton
//RSSi2zzpWh0FENsW

// Middelware 
app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://addbutton:RSSi2zzpWh0FENsW@cluster0.lt5tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        console.log("database succesful connect");

        const database = client.db("UserInfo");
        const users = database.collection("users");

        // retrieve all users
        app.get('/users', async (req, res) => {
            const cursor = users.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

        // app.post('/users', async (req, res) => {
        //     const user = req.body;
        //     const filter = { email: user.email };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             user
        //         },
        //     };
        //     const result = await users.insertOne(filter, updateDoc, options);
        //     console.log(user);
        //     console.log(result);
        //     res.json(result);

        // });
        app.put('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const filter = { email: user.email };
            console.log("filter", filter);
            const options = { upsert: true };
            const updateDoc = {
                $set: user
            };
            console.log(updateDoc);
            const result = await users.updateOne(filter, updateDoc, options);
            res.json(result);
            console.log(result);
        })
        app.delete('/users/:id', async (req, res) => {

            const id = req.params.id;
            console.log("delete", id);
            const query = { _id: ObjectId(id) }
            const result = await users.deleteOne(query);
            res.json(result)
        })


    }
    finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})