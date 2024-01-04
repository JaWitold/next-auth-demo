"use client";

import { Notes } from "@/xata";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function NoteTable({
  data,
  handleDeleteNote,
  currentPage,
  perPage,
}: {
  data: Notes[];
  handleDeleteNote: (record: Notes) => Promise<void>;
  currentPage: number;
  perPage: number;
}) {
  return (
    <Table>
      <TableBody>
        {data.map((record, index) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium text-left w-1/6">
              {(currentPage - 1) * perPage + index + 1}
            </TableCell>
            <TableCell className="w-4/6  ">{record.note}</TableCell>
            <TableCell className="text-right w-1/6">
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={() => handleDeleteNote(record)}
              >
                <Trash className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
