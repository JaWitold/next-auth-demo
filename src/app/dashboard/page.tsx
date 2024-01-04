import { Notes, NotesRecord, getXataClient } from "@/xata";
import NoteForm, { formSchema } from "./note-form";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import NoteTable from "./note-table";
import { NotePagination } from "./note-pagination";
import { Page, SelectedPick } from "@xata.io/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? 1;
  const size = searchParams["perPage"] ?? 5;

  const offset = (Number(page) - 1) * Number(size);
  const { userId } = auth();

  async function fetchData(
    offset: number = 0,
    size: number = 5
  ): Promise<Page<NotesRecord, Readonly<SelectedPick<NotesRecord, ["*"]>>>> {
    "use server";
    if (!userId) {
      revalidatePath("/");
    }
    const xata = getXataClient();
    const data = xata.db.Notes.filter({
      userId: userId as string,
    }).getPaginated({
      pagination: {
        size: size,
        offset: offset,
      },
    });

    if (offset != 0 && (await data).records.length == 0) {
      redirect("/dashboard");
    }
    return data;
  }

  async function handleCreateNote(values: z.infer<typeof formSchema>) {
    "use server";
    if (!userId) {
      return;
    }
    const xata = getXataClient();
    await xata.db.Notes.create({ note: values.note, userId: userId });
    revalidatePath("/");
  }

  async function handleDeleteNote(record: Notes) {
    "use server";
    if (!userId) {
      return;
    }
    const xata = getXataClient();
    await xata.db.Notes.delete(record);
    revalidatePath("/");
  }

  const fetchedData = await fetchData(offset, Number(size));
  return (
    <>
      <h1 className="h1 font-bold text-xl">Dashboard</h1>
      <NoteForm handleCreateNote={handleCreateNote} />
      <NoteTable
        data={(fetchedData.records as Notes[]).map((record) => ({
          ...record,
        }))}
        handleDeleteNote={handleDeleteNote}
        currentPage={Number(page)}
        perPage={Number(size)}
      />
      <NotePagination
        currentPage={Number(page)}
        perPage={Number(size)}
        hasNextPage={fetchedData.hasNextPage()}
      />
    </>
  );
}
