import { Client } from "pg";

export default function handler(req,res ){

    const {method, query} = req;

    switch(method){

        case 'GET':

            console.log("GET RECU" + req.query[0] + req.query[1])

            break;

        case 'POST':

        console.log("POST RECU"+ req.query[0] + req.query[1])

            break;
    }

}