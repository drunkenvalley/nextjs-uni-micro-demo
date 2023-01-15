import { ComponentPropsWithoutRef } from "react";
import User from "./user";

interface Props extends ComponentPropsWithoutRef<"header"> {}

export default function Header (props: Props): JSX.Element {

    return (
        <header {...props}>
            <User />
        </header>
        )
}