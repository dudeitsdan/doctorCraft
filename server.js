// Node.js Backend Example (server.js)
// const fs = require('fs')
// const fetch = require('node-fetch')
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
const OpenAI = require('openai');

const path = require('path')

//load NPCs
const NPC = require('./npc/mainNPCexport.js');
// console.log("THIS IS IT MAYBE", NPC)

//global conversation tracker
var outerGlobalConvo = [];

var condensedGlobalConvo = [];

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

const uri = process.env.uri;
const port = process.env.port || 3003
const apiKey = process.env.apiKey
const dbName = process.env.dbName
const openai = new OpenAI({apiKey: apiKey})

// Database connection function
async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db("Case1");
}

// Sample route for Collection1 in DB
// Sample route for db1

//POST ROUTE
    // TEST 1 POST
        postIt('/nurseData', 'Nurse', 'nurse')
    // TEST 2 POST
        postIt('/patientData', 'Patient', 'patient')
    // TEST 3 POST
        postIt('/familyMemberData', 'FamilyMember', 'familyMember')

    // TEST 4 POST
        postIt('/computerData', 'Computer', 'computer')

// Sample route for Collection2 in DB
    // TEST 1 GET
        getIt('/nurseData', 'Nurse')
    // TEST 2 GET   
        getIt('/patientData', 'Patient')
    // TEST 2 GET   
        getIt('/familyMemberData', 'FamilyMember')
        getIt('/computerData', 'Computer')
    // Initialization at the beginning w a IIFE to set up variables
        getIt('/dataFromGlobalConvo', 'mainCollection')

    // TEST 1 DELETE
        deleteIt('/nurseData', 'Nurse')
        deleteIt('/patientData', 'Patient')
        deleteIt('/familyMemberData', 'FamilyMember')
        deleteIt('/computerData', 'Computer')
        deleteIt('/dataFromGlobalConvo', 'mainCollection')
    // TEST 2 DELETE

//LISTENING
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

/////// GET METHOD BLANK FUNCTION

function getIt(location, collectn) {
    app.get(location, async (req, res) => {
        const client = await connectToDatabase();
        try {
            const collection = client.collection(collectn); // Specify the collection you want to access in db1
            const mainCollections = client.collection('mainCollection');
            // Perform operations on the collection
            // For example, find documents in the collection
            const data = await collection.find({}).toArray();
            const dataMain = await mainCollections.find({}).toArray();
            // console.log(data.length)
            // console.log(data[data.length-1].content)
            res.send(data); // Send the retrieved data as the response
            // console.log(data)
        } catch (error) {
            res.status(500).send("Error fetching data from:", location);
        // 
            } finally {
            // await client.close();
        }
    })
}

function postIt (location, collectn, role) {
    //server-side post-requests are a matter of:
        /* 
            identifying location to reach out to
        */

    // console.log("This is the outerGlobalConvo", outerGlobalConvo)
    app.post(location, async (req, res) => {
        const client = await connectToDatabase();
        const collection = client.collection(collectn);
        const mainCollection = client.collection('mainCollection');
        const data = await collection.find({}).toArray();

        console.log("This is the outerGlobalConvo this round:", outerGlobalConvo)
        
        // create an inner array for the global conversation passing with respect to everyone's role
        var innerGlobalConvoArray = outerGlobalConvo;

        // create an inner array that is "role-specific"/"one-sided perspective" without everyone   
        var innerConvoArray = [...NPC[role].conversation];

        // create a message that should precede as instructions to the gpt model
        var thePreviewMessage = {
            "role": "system", "content": `Your role in this conversation is: ${role}. Your instructions are written in JSON as follows: ${JSON.stringify(NPC[role].conversation, null, 2)}.`
        }

        // console.log("These are the instructions:", JSON.stringify(NPC[role].conversation, null, 2))
        console.log("These are the instructions:", JSON.stringify(NPC[role].conversation, null, 2))
        // console.log("LOOK AT THIS: ", NPC[role].conversation)

        innerGlobalConvoArray.push(thePreviewMessage);
 
        var theMessage = {"role": "user", "content": `{ "content": "Doctor: ${req.body.content}", "performanceNow": "${performance.now()/1000} seconds since beginning",}`}

        innerGlobalConvoArray.push(theMessage);
        innerConvoArray.push(theMessage);

        // console.log(innerGlobalConvoArray, "without ID removed")
    
        // IMPORTANT... FOR THIS NEXT PART I SWITCHED OUT THE innerConvoArray FOR innerGlobalConvoArray TO TELL THE GPT-BOT ALL CONVERSATIONS AT THE SAME TIME.
        var cleanedLocalConvoArray = innerConvoArray.map(msg => {
            const { _id, ...cleanedMsg } = msg;
            return cleanedMsg;
        });

        var cleanedGlobalConvoArray = innerGlobalConvoArray.map(msg => {
            const { _id, ...cleanedMsg } = msg;
            return cleanedMsg;
        });

        console.log("This is what FEEDS into GPT:", cleanedGlobalConvoArray)

        const completion = await openai.chat.completions.create({
            messages: cleanedGlobalConvoArray, //you can mess with this to pick (global) conversation rather than (local) conversation.
            model: "gpt-3.5-turbo-1106", //"gpt-4-1106-preview",
            temperature: 1.0, // setting creativity
            max_tokens: 1500,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 0,
        });
        console.log("this is what is removed:", cleanedGlobalConvoArray[cleanedGlobalConvoArray.length-2])
        cleanedGlobalConvoArray.splice(cleanedGlobalConvoArray.length-2, 1)
        

        const botResponse = completion.choices[0].message;
        
            // console.log("This is what the convo is so far", innerConvoArray)
            // console.log(completion.choices[0].message)
            // console.log("this is the in the collection: ", data)
        const returningStatement = {
            role: "assistant", 
            content: botResponse.content
        }
        
        cleanedGlobalConvoArray.push(returningStatement);
        cleanedLocalConvoArray.push(returningStatement);

        // inserts USER message first to BOT-related database
        collection.insertOne(theMessage, (err, result) => {
            if (err) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result.ops[0]);
            }
        });

        // inserts BOT message second to BOT-related database
        collection.insertOne(returningStatement, (err, result) => {
            if (err) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result.ops[0]);
            }
        });

        // inserts USER message second to global database
        mainCollection.insertOne(returningStatement, (err, result) => {
            if (err) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result.ops[0]);
            }
        });

        // inserts USER message first to global database
        mainCollection.insertOne(theMessage, (err, result) => {
            if (err) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result.ops[0]);
            }
        })

        delete returningStatement._id
        
        console.log(returningStatement)

        // send this to client-side
        res.json(returningStatement);

        console.log("post-splicing/updated global variable: ", cleanedGlobalConvoArray)
        
        //new Array with updated conversation
        // NPC[role].conversation = cleanedLocalConvoArray;
        outerGlobalConvo = cleanedGlobalConvoArray;
        // console.log(innerGlobalConvoArray)
    });
}

function deleteIt(location, collectn) {
    
    app.delete(location, async (req, res) => {
        const client = await connectToDatabase();
        const collection = client.collection(collectn);
        outerGlobalConvo = [];
        console.log("This is the outerGlobalVariable after deletion", outerGlobalConvo)
        console.log("deletion executing")

        try {
            client.collection('/nurseData').deleteMany({});
            client.collection('/patientData').deleteMany({})
            collection.deleteMany({});
            res.send('All documents deleted successfully');
            
        } catch (error) {
            console.error('Error deleting documents:', error);
            res.status(500).send('Error deleting documents');

        } finally {
            // await client.close();

        }
    });

   
}

// GET route
app.get('/patientDetails', async (req, res) => {
    const client = await connectToDatabase();
    try {
        const collection = client.collection('patientDetails');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching data from MongoDB");
    } finally {
    }
});

// console.log(outerGlobalConvo, "this is outerGlobalConvo!!!")