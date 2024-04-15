import {formatAmountForDisplay} from "@/utils/stripe-helpers";
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input";

export default function CustomDonationInput({
                                                name,
                                                min,
                                                max,
                                                currency,
                                                step,
                                                onChange,
                                                value,
                                                className,
                                            }: {
    name: string;
    min: number;
    max: number;
    currency: string;
    step: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: number;
    className?: string;
}): JSX.Element {
    return (
        <>
            <Label htmlFor="donation-input">
                Custom donation amount ({formatAmountForDisplay(min, currency)}-
                {formatAmountForDisplay(max, currency)}):

            </Label>

            <Input
                id="donation-input"
                type="range"
                name={name}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
                value={value}
                className={className}
            ></Input>
        </>
    );
}