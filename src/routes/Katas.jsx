import {useEffect, useState} from "react";
import {buyCredit, getAllKatas, getCredit} from "../services/contract.service.js";
import {Link} from "react-router-dom";
function Katas({userAddress, setUserAddress}) {

  const [katas, setKatas] = useState([]);
  const [credit, setCredit] = useState(null);

  useEffect( () => {
    async function fetchData() {
      const katas = await getAllKatas();
      const credit = await getCredit();
      setKatas(katas);
      setCredit(credit);
    }
    if (userAddress !== '') {
      fetchData();

    }
  }, [userAddress]);


  function buildListKatas() {
    return (
      <div className="w-3/5 flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                  <th scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                    Kata's name
                  </th>
                  <th scope="col" className="p-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {buildItemKata()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    );
  }

  function buildItemKata() {
    return katas.map((kata) => {
      return (
        <tr key={kata.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {kata.name} {kata.isOwned ? " (owned)" : ""}
          </td>
          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
            {!kata.isOwned ?
              <Link className="text-white hover:text-yellow-400 p-1 border-2 hover:border-yellow-400 rounded"
                    to='/try-kata'
                    state={{
                      userAddress: userAddress,
                      kata: kata
                    }}
              >Try</Link>
              :
              <></>
            }
          </td>
        </tr>
      );
    });
  }

  function buildKataRender() {
    if (userAddress === '') {
      return (
        <h1 className="mt-9 p-9 text-white text-lg rounded border-2 border-red-700">You need to connect to MetaMask</h1>
      );
    }
    if (katas.length === 0) {
      return (
        <h1 className="mt-9 p-9 text-white text-lg rounded border-2 border-amber-500">There are no kata at the moment...</h1>
      );
    }
    return buildListKatas();
  }

  function buildCreditRender() {
    if (credit === null) {
      return (
        <></>
      );
    }

    async function buyNow() {
      const newCredit = await buyCredit();
      setCredit(newCredit);
    }

    return (
      <div className="flex justify-center items-center">
        <h1 className="m-9 p-4 text-white text-lg">You have {credit} credit</h1>
        <button onClick={buyNow} className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
          Buy credit
        </button>
      </div>

    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      {buildCreditRender()}
      {buildKataRender()}
    </div>
  );
}

export default Katas;