import {useEffect} from "react";
import logo from '../assets/logo.svg';
import kataImg from '../assets/do_it.png';
function Home() {
  useEffect(() => {
    document.title = "KataCoins : Home";
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-x-6">
      <div className="flex flex-row m-9">
        <img height={40} width={40} src={logo}/>
        <h1 className="text-3xl text-yellow-500">Welcome to KataCoins</h1>
        <img height={40} width={40} src={logo}/>
      </div>

      <div className="flex flex-row m-9 space-x-6 justify-center items-center">
        <span className="text-xl text-white">Write code, success tests and mint our NFTs</span>
        <img className="rounded" width={600} src={kataImg}/>
      </div>
    </div>
  );
}

export default Home;