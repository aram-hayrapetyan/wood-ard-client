import { Container } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "./app/hooks";
import Header from "./components/header/header";

export default function PrivacyPolicy() {
    const theme = useAppSelector(state => state.theme.value);

    return (
        <div className={`Privacy-policy Privacy-policy-${theme}`}>
            <Header />
            <Container>
                Yes this is the privacy policy.
            </Container>
        </div>
    )
}