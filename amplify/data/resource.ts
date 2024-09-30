import {type ClientSchema, a, defineData} from "@aws-amplify/backend";

const schema = a.schema({
    RaspberryTable: a.customType({
        id: a.id().required(),
        author: a.string().required(),
        title: a.string(),
        content: a.string(),
        url: a.string(),
        ups: a.integer(),
        downs: a.integer(),
        version: a.integer(),
    }),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});

