import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default async function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const {data, errors} = await client.mutations.deleteRaspberryPi_data_table({
    id: "<post-id>"
  })

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
      <main>
        <h1>CIAO</h1>
      </main>
  );
}
