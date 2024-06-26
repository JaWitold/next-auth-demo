"use server";

import type {Stripe} from "stripe";

import {headers} from "next/headers";

import {CURRENCY} from "@/config/stripe";
import {formatAmountForStripe} from "@/utils/stripe-helpers";
import {stripe} from "@/lib/stripe";
import {z} from "zod";
import {stripePriceForm, stripeProductForm, stripeSubscriptionForm} from "@/actions/form-util";

export async function createCheckoutSession(
    data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
    const ui_mode = data.get(
        "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;

    const origin: string = headers().get("origin") as string;

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: "payment",
            submit_type: "donate",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: CURRENCY,
                        product_data: {
                            name: "Custom amount donation",
                        },
                        unit_amount: formatAmountForStripe(
                            Number(data.get("customDonation") as string),
                            CURRENCY,
                        ),
                    },
                },
            ],
            ...(ui_mode === "hosted" && {
                success_url: `${origin}/payment/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/payment/checkout`,
            }),
            // ...(ui_mode === "embedded" && {
            //     return_url: `${origin}/donate-with-embedded-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
            // }),
            ui_mode,
        });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}

export async function createSubscriptionCheckoutSession(
    {price, userEmail, customerId}: {
        price: Stripe.Price,
        userEmail?: string,
        customerId?: string | null | undefined
    }
): Promise<{ client_secret: string | null; url: string | null }> {

    const origin: string = headers().get("origin") as string;

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    quantity: 1,
                    price: price.id
                },
            ],
            success_url: `${origin}/stripe/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/stripe/store`,
            ui_mode: "hosted",
            ...(customerId && {customer: customerId}),
            ...(userEmail && !customerId && {customer_email: userEmail}),
        });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}

export async function searchProducts(
    value: z.infer<typeof stripeProductForm>
): Promise<Stripe.Response<Stripe.ApiSearchResultPromise<Stripe.Product>>> {

    // console.log(products.then(s => console.log(s.data.map(x => x.name))))
    return stripe.products.search({query: `active:'${value.active}' AND name~'${value.name}'`})
}

export async function searchPrices(
    value: z.infer<typeof stripePriceForm>
): Promise<Stripe.Response<Stripe.ApiSearchResultPromise<Stripe.Price>>> {
    return stripe.prices.search({query: `active:'${value.active}' AND lookup_key:'${value.lookupKey}'`})
}

export async function listActiveSubscriptions(
    value: z.infer<typeof stripeSubscriptionForm>
): Promise<Stripe.Response<Stripe.ApiListPromise<Stripe.Subscription>>> {
    return stripe.subscriptions.list({customer: value.customerId, status: "active"})
}

export async function createBillingPortalSession(
    {customerId}: {customerId: string}
): Promise<{ url: string | null }> {

    const origin: string = headers().get("origin") as string;
    // const referer: string = headers().get("referer") as string;

    const checkoutSession: Stripe.BillingPortal.Session =
        await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${origin}/dashboard`,
            // return_url: referer,
        })

    return {
        url: checkoutSession.url,
    };
}

// export async function createPaymentIntent(
//     data: FormData,
// ): Promise<{ client_secret: string }> {
//     const paymentIntent: Stripe.PaymentIntent =
//         await stripe.paymentIntents.create({
//             amount: formatAmountForStripe(
//                 Number(data.get("customDonation") as string),
//                 CURRENCY,
//             ),
//             automatic_payment_methods: {enabled: true},
//             currency: CURRENCY,r
//         });
//
//     return {client_secret: paymentIntent.client_secret as string};
// }