import type {Stripe} from "stripe";

export default function PrintObject({
                                        content,
                                    }: {
    content: Stripe.PaymentIntent | Stripe.Checkout.Session | (string | Stripe.Product | Stripe.DeletedProduct | null)[];
}): JSX.Element {
    const formattedContent: string = JSON.stringify(content, null, 2);
    return <pre className="text-sm">{formattedContent}</pre>;
}