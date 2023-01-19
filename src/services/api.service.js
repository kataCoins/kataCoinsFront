import axios from "axios";
import {KataRunDto} from "./dto/kata-run.dto.js";
import {mintKata} from "./contract.service.js";

export async function executeKataRequest(code, userAddress, kataId) {
  const kataRunDto = new KataRunDto(userAddress, code, kataId);
  const url = `${import.meta.env.VITE_API_URL}/code/run`;

  try {
    const { data } = await axios.post(
      url,
      {
        ...kataRunDto,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.exec_result.status === 0) {
      await mintKata(kataId);
    } else {
      alert("Kata failed. Sorry!");
    }
  } catch (error) {
    console.error(error);
  }
}