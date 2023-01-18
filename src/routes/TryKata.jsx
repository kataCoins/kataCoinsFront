import {useLocation} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";

export default function TryKata() {
  const location = useLocation();
  const { userAddress, kata } = location.state;
  const [kataContent, setKataContent] = useState(kata.functionDeclaration);

  return (
    <div className="mt-4 bottom-0">
      <div className="row m-3 text-center">
        <h1 className="text-lg text-yellow-500">{kata.name}</h1>
      </div>

      <div className="flex flex-row m-1 space-x-2 h-full">
        <div className="border-2 border-gray-400 rounded bg-gray-400 w-1/2">
          <ReactMarkdown children={kata.statement} className="m-2"/>
        </div>
        <div className="w-1/2 rounded">
          <Editor
            height="65vh"
            language="python"
            theme="vs-dark"
            value={kataContent}
            options={{
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: "line",
              automaticLayout: true,
            }}
            onChange={(newValue, e) => {
              setKataContent(newValue);
            }}
          />
        </div>
      </div>

      <div className="flex flex-row-reverse m-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            console.log(kataContent);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}