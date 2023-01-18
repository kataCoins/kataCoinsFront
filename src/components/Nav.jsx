import {Link} from "react-router-dom";
import {useState} from "react";

function Nav({userAddress, setUserAddress}) {
  const { ethereum } = window;
  const [isConnected, setIsConnected] = useState(false);
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setUserAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }

  }
  function buildConnectionButton() {
    if (!isConnected && userAddress === '') {
      return (
        <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={connectWallet}
        >
          <span>Connect you with MetaMask</span>
        </button>
      );
    }
    return (
      <span className="text-gray-300">{userAddress.substring(0, 10)}...</span>
    );
  }
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-4">
                <Link to="/"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>

                <Link to="/katas"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Katas</Link>

                <Link to="/about"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <p className="relative">
              {buildConnectionButton()}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;