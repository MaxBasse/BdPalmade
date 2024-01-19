import { Client } from "pg";
import data from "../../config.json"

export default async function handler(req,res ){
    const {method, query} = req;
    const email = query.args[0];
    const score = Math.round(query.args[1]);
    const client = new Client({
        host: data.host,
        port: data.port,
        database: data.database,
        user: data.user,
        password: data.password,
    })
    await connectDb(client);

    switch(method){

        case 'GET':
            console.log("GET")
            res.status(200).json(await queryAll(client))
            
            break;

        case 'POST':
            console.log(email)
            if(email=="null" || email==null) break;
            preparedStmtScore(client,email,score);
            res.status(200).json({response: "Post successful"})
            
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end()
            
            
    }

}

async function connectDb(client){
    await client.connect()
    console.log("CONNECTION WITH THE DATABASE ESTABLISHED")
}

async function queryAll(client){
    console.log("entering queryAll statement")
    const res = await client.query({text: 'SELECT email, MAX(score) FROM scores GROUP BY email ORDER BY MAX(score) DESC', rowMode: 'array'});
    client.end()
    return res.rows 

}

async function preparedStmtScore(client, email, score){    
    console.log("entering score prepared statement")
    
    try {
        const res = await client.query({text: 'INSERT INTO scores VALUES ($1, $2)', values: [email, score],rowMode: 'array'});
        console.log("Data successfully inserted in the database")
        client.end()
     } catch (err) {
        console.error(err);
     } finally {
        await client.end()
     }
}