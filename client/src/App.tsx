import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import "./App.css";

function App() {
  const { isLoading, error, data } = useQuery("fetchHealth", () =>
    axios.get("http://tickets.lol/users")
  );

  console.log(`data : ${data?.data.message}`);

  if (isLoading) return <div> Loading... </div>;

  if (error) return <div> "An error has occurred: " + {error}</div>;

  return <h1>{data?.data.message}</h1>;
}

export default App;
