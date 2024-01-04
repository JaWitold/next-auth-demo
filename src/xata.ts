// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Notes",
    columns: [
      { name: "note", type: "text", notNull: true, defaultValue: "<empty>" },
      {
        name: "userId",
        type: "string",
        notNull: true,
        defaultValue: "<empty_user>",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Notes = InferredTypes["Notes"];
export type NotesRecord = Notes & XataRecord;

export type DatabaseSchema = {
  Notes: NotesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Witold-Karas-s-workspace-ji4q25.eu-central-1.xata.sh/db/next-auth-demo",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};