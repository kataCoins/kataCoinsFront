import {useEffect} from "react";

function Home() {
  useEffect(() => {
    document.title = "KataCoins : Home";
  }, []);
  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}

export default Home;