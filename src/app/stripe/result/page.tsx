import type {Stripe} from "stripe";

import PrintObject from "@/components/stripe/print-object";
import {stripe} from "@/lib/stripe";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

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

    return (
        <>
            <h2 className={'text-2xl font-semibold'}>
                Status:
                <span className={paymentStatus == 'paid' ? 'text-primary' : 'text-destructive'}>
                    {paymentStatus}
                </span>
            </h2>
            <h3 className={'text-xl'}>Checkout Session response:</h3>
            <PrintObject content={checkoutSession}/>
        </>
    );
}