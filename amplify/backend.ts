import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { aws_dynamodb } from "aws-cdk-lib";

export const backend = defineBackend({
  auth,
  data,
});


const externalDataSourcesStack = backend.createStack("MyExternalDataSources");


const externalTable = aws_dynamodb.Table.fromTableName(
    externalDataSourcesStack,
    "MyExternalRaspberryPi_data_table",
    "raspberryPi_data_table"
);


backend.data.addDynamoDbDataSource(
    "ExternalRaspberryPi_data_tableSource",
    externalTable
);
