import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default async function App() {

  return (
      <main>
        <h1>CIAO</h1>
      </main>
  );
}
