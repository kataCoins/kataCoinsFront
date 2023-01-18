import {useEffect, useState} from "react";
import {createKata, getOwner} from "../services/contract.service.js";
import Editor from "@monaco-editor/react";

export default function CreateKata({userAddress}) {
  const [tests, setTests] = useState("");
  const [name, setName] = useState("");
  const [statement, setStatement] = useState("");
  const [functionDeclaration, setFunctionDeclaration] = useState("");

  useEffect( () => {
    document.title = "Create kata"
    async function checkOwner() {
      const owner = await getOwner();
      if (userAddress.toUpperCase() !== owner.toUpperCase()) {
        window.location.href = "/";
      }
    }
    if (userAddress !== '') {
      checkOwner();
    }
  }, [userAddress]);

  function checkData() {
    return !(name === "" || statement === "" || functionDeclaration === "" || tests === "");
  }

  async function onSubmitCreateKata() {
    if (!checkData()) {
      alert("Please fill all the fields");
    }
    const isSuccess = await createKata(name, statement, functionDeclaration, tests);

    if (isSuccess) {
      alert("Kata created successfully");
      window.location.href = "/katas";
    } else {
      alert("Error creating kata");
    }
  }

  return (
    <div className="flex justify-center items-center w-screen">
      {buildRender()}
    </div>
  );

  function buildRender() {
    if (userAddress === "") {
      return (
        <h1 className="mt-9 p-9 text-white text-lg rounded border-2 border-red-700">You need to connect to MetaMask</h1>
      );
    }
    return buildForm();
  }

  function buildForm() {
    return (
      <div className="flex flex-col space-y-5">
        <div className="flex justify-center items-center">
          <h1 className="text-white text-lg rounded">Create a new Kata</h1>
        </div>
        <div className="flex flex-row justify-center items-center space-x-5">
          <label className="text-white text-lg rounded">Name :</label>
          <input className="border-2 border-white rounded " type="text" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="flex flex-row space-x-5 w-screen p-5">
          <div className="w-1/3 flex flex-col">
            <h2>Statement :</h2>
            <Editor
              height="65vh"
              language="markdown"
              theme="vs-dark"
              value={statement}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
              }}
              onChange={(newValue, e) => {
                setStatement(newValue);
              }}
            />
          </div>
          <div className="w-1/3 flex flex-col">
            <h2>Declaration :</h2>
            <Editor
              height="65vh"
              language="python"
              theme="vs-dark"
              value={functionDeclaration}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
              }}
              onChange={(newValue, e) => {
                setFunctionDeclaration(newValue);
              }}
            />
          </div>
          <div className="w-1/3 flex flex-col">
            <h2>Tests :</h2>
            <Editor
              height="65vh"
              language="python"
              theme="vs-dark"
              value={tests}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
              }}
              onChange={(newValue, e) => {
                setTests(newValue);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse m-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onSubmitCreateKata}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

}