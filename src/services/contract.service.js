import * as KataCoins from "../contracts/KataCoins.json";
import {ethers} from "ethers";
import {Kata} from "../models/kata.js";

function getContract() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(
    contractAddress,
    KataCoins.abi,
    provider.getSigner(0)
  );
}
export async function getAllKatas() {
  const contract = getContract();
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
  const contract = getContract();

  const response = await contract.functions.getCredit();
  return response[0].toNumber();
}

export async function buyCredit(nbTry = 20) {
  const contract = getContract();

  const execFee = (await contract.functions.getExecFee())[0].toNumber();
  const price = nbTry * execFee;

  try {
    await contract.functions.payCredit(
      nbTry, {value: price.toString()}
    );
  } catch (error) {
    return await getCredit();
  }

  return await getCredit() + nbTry;
}

export async function createKata(name, statement, functionDeclaration, test) {
  const contract = getContract();

  try {
    await contract.functions.createKata(name, statement, functionDeclaration, test);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function mintKata(id) {
  const contract = getContract();

  try {
    await contract.functions.mintKata(id);
  } catch (error) {
    console.error(error);
  }
}

export async function getOwner() {
  const contract = getContract();

  const response = await contract.functions.owner();
  return response[0];
}