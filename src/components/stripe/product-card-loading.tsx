import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function ProductCardLoading() {
    return <Card>
        <CardHeader>
            <CardTitle><Skeleton className={"w-[160px] h-7"}/></CardTitle>
            <CardDescription><Skeleton className={"w-[236px] h-6"}/></CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 my-1">
            <Skeleton className={"w-[150px] h-12"}/>
        </CardContent>
        <CardFooter>
            <Skeleton className={"w-[236px] h-10"}/>
        </CardFooter>
    </Card>
}