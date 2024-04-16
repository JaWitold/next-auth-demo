"use client"

import {createBillingPortalSession} from "@/actions/stripe";
import React from "react";

export default function ManagementForm({customerId}: { customerId: string }) {

    const formAction = async (): Promise<void> => {
        const {url} = await createBillingPortalSession({customerId: customerId});
        window.location.assign(url as string);
    };

    return <form action={formAction} className={"text-muted-foreground"}>
        <button>Manage subscriptions</button>
    </form>
}