import fetch from "node-fetch";
import { codeExecutionProgram } from "./interfaces";

function getOutputFromCode(program: codeExecutionProgram): any {
  return new Promise((resolve, reject) => {
    fetch("https://api.jdoodle.com/execute", {
      body: JSON.stringify(program),
      method: "POST",
    })
      .then((resp: any) => resolve(resp.body))
      .catch((err) => reject(err));
  });
}

export default getOutputFromCode;
