import axios from "axios";

import { JdoodleStruct } from "../types";

export default function getOutputFromCode(
  program: JdoodleStruct
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    axios
      .post("https://api.jdoodle.com/execute", program)
      .then((output) => resolve(output.data))
      .catch((err) => reject(err));
  });
}
