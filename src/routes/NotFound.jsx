import {useEffect} from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found";
    setInterval(() => {
      window.location.href = "/";
    }, 4000);
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <h1 className="text-5xl text-white">404 Not Found</h1>
    </div>
  );
}
