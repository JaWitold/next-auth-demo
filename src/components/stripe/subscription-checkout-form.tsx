"use client"

import {Button} from "@/components/ui/button";
import {Stripe} from "stripe";
import {createSubscriptionCheckoutSession} from "@/actions/stripe";
import SubscriptionCheckoutButton from "@/components/stripe/subscription-checkout-button";
import React from "react";

export default function SubscriptionCheckoutForm({price, userEmail}: { price: Stripe.Price, userEmail: string | null | undefined }) {

    const formAction = async (price: Stripe.Price): Promise<void> => {
        // const uiMode = data.get(
        //     "uiMode",
        // ) as Stripe.Checkout.SessionCreateParams.UiMode;

        const {client_secret, url} = await createSubscriptionCheckoutSession({price: price, userEmail: userEmail});
        window.location.assign(url as string);
    };

    return <form action={() => formAction(price)} className={"w-full"}>
        <SubscriptionCheckoutButton/>
    </form>
}