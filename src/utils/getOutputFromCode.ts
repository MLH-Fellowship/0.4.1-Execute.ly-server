import axios from "axios";
import { codeExecutionProgram } from "./interfaces";

export default function getOutputFromCode(
  program: codeExecutionProgram
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .post("https://api.jdoodle.com/execute", program)
      .then((output) => resolve(output.data))
      .catch((err) => reject(err));
  });
}
