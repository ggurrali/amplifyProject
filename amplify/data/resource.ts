import {type ClientSchema, a, defineData} from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
    Todo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    RaspberryPi_data_table: a.customType({
        idDevice: a.id().required(),
        author: a.string().required(),
        title: a.string(),
        content: a.string(),
        url: a.string(),
        ups: a.integer(),
        downs: a.integer(),
        version: a.integer(),
    }),

    getRaspberryPi_data_table: a
        .query()
        .arguments({ idDevice: a.id().required() })
        .returns(a.ref("RaspberryPi_data_table"))
        .authorization(allow => [allow.publicApiKey()])
        .handler(
            a.handler.custom({
                dataSource: "ExternalRaspberryPi_data_tableSource",
                entry: "./getRaspberryPi_data_table.js",
            })
        ),

    deleteRaspberryPi_data_table: a
        .mutation()
        .arguments({ idDevice: a.id().required(), expectedVersion: a.integer() })
        .returns(a.ref("RaspberryPi_data_table"))
        .authorization(allow => [allow.publicApiKey()])
        .handler(
            a.handler.custom({
                dataSource: "ExternalRaspberryPi_data_tableSource",
                entry: "./deleteRaspberryPi_data_table.js",
            })
        ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        // API Key is used for a.allow.public() rules
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
