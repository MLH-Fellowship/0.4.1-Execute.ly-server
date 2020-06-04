import { Request } from "express";

export interface OCRResponse {
  text: string;
}

export interface OCRApiResponse {
  fullTextAnnotation: OCRResponse;
}

export interface codeExecutionApiResponse {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: number;
}

export interface codeExecutionProgram {
  script: string;
  stdin: string;
  language: string;
  versionIndex: string;
  clientId: string;
  clientSecret: string;
}

export interface RequestCarryingFile extends Request {
  file?: any;
}
