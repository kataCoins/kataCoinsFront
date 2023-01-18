import {useLocation} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useEffect} from "react";

export default function TryKata() {
  const location = useLocation();
  const { userAddress, kata } = location.state;

  useEffect(() => {
    console.log(kata.statement)
  }, [])

  return (
    <div className="mt-4">
      <div className="row m-3 text-center">
        <h1 className="text-lg text-yellow-500">{kata.name}</h1>
      </div>

      <div className="flex flex-row m-1 border-2 border-red-700 h-5/6 space-x-1">
        <div className="border-2 border-gray-400 rounded bg-white h-4/5 w-1/2">
          <ReactMarkdown children={kata.statement} className="m-2"/>
        </div>
        <div>Editor WIP</div>
      </div>
    </div>
  );
}