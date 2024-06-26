import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {searchProducts} from "@/actions/stripe";
import {Suspense} from "react";
import ProductCard from "@/components/stripe/product-card";
import ProductCardLoading from "@/components/stripe/product-card-loading";
import ManagementForm from "@/components/stripe/management-form";
import {auth, clerkClient} from "@clerk/nextjs";

export type BillingIntervalType = 'month' | 'year';

export default async function StorePage() {
    const BillingInterval: BillingIntervalType[] = ['month', 'year']
    const products = await searchProducts({active: true, name: "plan"})
    const {userId} = auth();
    const customerId = userId && (await clerkClient.users.getUser(userId)).privateMetadata.stripeCustomerId as string

    return (
        <>
            <h1 className="text-6xl font-bold">Pricing Plans</h1>
            <p className="text-xl my-8">Start creating AI written content with standard plan. Account plans unlock
                additional features.</p>
            <Tabs defaultValue="month" className="mx-4 w-full lg:w-max-[1000px] lg:w-3/4 ">
                <TabsList className="grid w-full md:w-3/4 lg:w-1/2 grid-cols-2 mx-auto">
                    <TabsTrigger value="month">Monthly billing</TabsTrigger>
                    <TabsTrigger value="year">Yearly billing</TabsTrigger>
                </TabsList>
                {BillingInterval.map(interval =>
                    <TabsContent key={interval} value={interval}
                                 className="mt-8 flex flex-col lg:flex-row justify-center items-center gap-4 data-[state=inactive]:mt-0">
                        {products.data.map((product, index) =>
                            <Suspense key={index} fallback={<ProductCardLoading/>}>
                                <ProductCard product={product} interval={interval} customerId={customerId} />
                            </Suspense>
                        )}
                    </TabsContent>
                )}
            </Tabs>
            {customerId && <div className="mx-4 w-full lg:px-7 lg:w-3/4 max-w-[950px] mt-8 text-xs"><ManagementForm customerId={customerId}/></div>}
        </>
    )
}