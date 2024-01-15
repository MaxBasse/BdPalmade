import { Client } from "pg";

export default async function handler(req,res ){
    const {method, query} = req;
    const email = query.args[0];
    const score = Math.round(query.args[1]);
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'BDE',
        user: 'postgres',
        password: '1234',
    })
    
    connectDb(client);

    switch(method){

        case 'GET':
            console.log("GET")
            res.status(200).json(await queryAll(client))
            
            break;

        case 'POST':
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
  
    const res = await client.query({text: 'SELECT * from scores ORDER BY score DESC LIMIT 10', rowMode: 'array'});
    console.log(res.rows)
    return res.rows
    client.end()

}

async function preparedStmtScore(client, email, score){    
    try {
        const res = await client.query({text: 'INSERT INTO scores VALUES ($1, $2)', values: [email, score],rowMode: 'array'});
        console.log("Data successfully inserted in the database")
     } catch (err) {
        console.error(err);
     } finally {
        await client.end()
     }
}