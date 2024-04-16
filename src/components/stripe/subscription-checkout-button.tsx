import {Button} from "@/components/ui/button";

export default function SubscriptionCheckoutButton({variant = "default"}: {variant?: "default" | "destructive"| "outline"| "secondary"| "ghost"| "link"}) {
    return <Button className={"w-full"} variant={variant}>Buy</Button>
}