import * as KataCoins from "../contracts/KataCoins.json";
import {ethers} from "ethers";
import {Kata} from "../models/kata.js";

export async function getAllKatas() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    KataCoins.abi,
    provider.getSigner(0)
  );

  const response = await contract.getAllKata();

  let katas = [];

  response.forEach((data) => {
    let kata = data.kata;
    let isOwned = data.isOwned;
    katas.push(
        new Kata(kata.id.toNumber(), kata.name, kata.statement, kata.functionDeclaration, isOwned)
    );
  });

  return katas;
}

export async function getCredit() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    KataCoins.abi,
    provider.getSigner(0)
  );
  const response = await contract.functions.getCredit();
  return response[0].toNumber();
}

export async function buyCredit(nbTry = 20) {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    KataCoins.abi,
    provider.getSigner(0)
  );

  const execFee = (await contract.functions.getExecFee())[0].toNumber();
  const price = nbTry * execFee;

  try {
    await contract.functions.payCredit(
      nbTry, {value: price.toString()}
    );
  } catch (error) {
    // console.error(error);
    return await getCredit();
  }

  return await getCredit() + nbTry;
}