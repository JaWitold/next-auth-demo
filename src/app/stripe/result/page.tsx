import type {Stripe} from "stripe";

import PrintObject from "@/components/stripe/print-object";
import {stripe} from "@/lib/stripe";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import { clerkClient } from "@clerk/nextjs";
import {User} from "@clerk/backend";
import {listActiveSubscriptions} from "@/actions/stripe";

export default async function ResultPage({searchParams}: {
    searchParams: { session_id: string };
}): Promise<JSX.Element> {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    if (!searchParams.session_id) {
        if (process.env.NODE_ENV !== "development") {
            redirect("/dashboard");
        } else {
            throw new Error("Please provide a valid session_id (`cs_test_...`)");
        }
    }

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(searchParams.session_id, {
            expand: ["line_items", "payment_intent"],
        });

    const paymentStatus = checkoutSession.payment_status as Stripe.Checkout.Session.PaymentStatus;

    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            stripeCustomerId: checkoutSession.customer
        }
    });

    const userData: User = await clerkClient.users.getUser(userId)
    const subscriptionsList = await listActiveSubscriptions({customerId: String(userData.privateMetadata?.stripeCustomerId)})
    const subscriptionsProducts =  subscriptionsList.data.flatMap(subscription => subscription.items.data.map(item => item.plan.product));


    return (
        <>
            <h2 className={'text-2xl font-semibold'}>
                Status: <span className={paymentStatus == 'paid' ? 'text-primary' : 'text-destructive'}>{paymentStatus}</span>
            </h2>
            <h3 className={'text-xl'}>Checkout Session response:</h3>
            <PrintObject content={checkoutSession}/>
            <h2 className={'text-2xl font-semibold mt-8'}>Current Subscriptions</h2>
            <PrintObject content={subscriptionsProducts}/>
        </>
    );
}