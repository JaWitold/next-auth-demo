import {BillingIntervalType} from "@/app/stripe/store/page";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {searchPrices} from "@/actions/stripe";
import {Stripe} from "stripe";
import {formatAmountForDisplay} from "@/utils/stripe-helpers";
import * as config from "@/config/stripe";
import SubscriptionCheckoutForm from "@/components/stripe/subscription-checkout-form";
import {currentUser, SignInButton} from "@clerk/nextjs";
import {EmailAddress} from "@clerk/backend";
import SubscriptionCheckoutButton from "@/components/stripe/subscription-checkout-button";

export default async function ProductCard({product, interval, customerId}: {
    product: Stripe.Product,
    interval: BillingIntervalType,
    customerId: string | null | undefined
}) {
    const price = await searchPrices({
        active: true,
        lookupKey: `${interval}_${product.name.substring(0, product.name.indexOf(" ")).toLowerCase()}`
    })
    const user = await currentUser();
    return <>
        {price.data[0] &&
            <Card className={"w-full lg:w-fit"}>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    {/*<CardDescription>{product.description}</CardDescription>*/}
                    <CardDescription>All the basics for starting AI marketing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 my-1">
                    <span className={"text-4xl font-bold"}>{formatAmountForDisplay((price.data[0].unit_amount ?? 0) / 100, config.CURRENCY)}</span>
                    <span>/{interval}</span>
                </CardContent>
                <CardFooter >
                    {!user ?
                        <SignInButton afterSignInUrl={'/stripe/store'} afterSignUpUrl={'/stripe/store'}>
                            <SubscriptionCheckoutButton variant={"outline"}/>
                        </SignInButton> :
                        <SubscriptionCheckoutForm price={price.data[0]}
                                                  userEmail={(user.emailAddresses.find(item => item.id === user.primaryEmailAddressId) as EmailAddress)?.emailAddress}
                                                  customerId={customerId}
                        />}
                </CardFooter>
            </Card>
        }
    </>
}