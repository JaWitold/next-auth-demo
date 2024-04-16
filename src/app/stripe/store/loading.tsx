import {Skeleton} from "@/components/ui/skeleton";

export default function StoreLoading() {
    return (
        <>
            <h1 className="text-6xl font-bold"><Skeleton className={"h-[60px] w-[363px]"}/></h1>
            <p className="text-xl my-8"><Skeleton className={"h-8 w-[800px]"}/></p>
            <Skeleton className="h-10 w-[540px]"/>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
                {[1, 2, 3].map((item, index) => (
                    <Skeleton key={index} className={"w-[285px] h-[237px]"}/>
                ))}
            </div>
        </>

    )
}