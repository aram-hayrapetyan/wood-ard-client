import React from "react";
import { Container } from "@material-ui/core";
import { useAppSelector } from "./app/hooks";
import './404.css';
import { Link } from "react-router-dom";

export default function NotFound() {
    const theme = useAppSelector(state => state.theme.value);

    return (
        <Container className={`not-found not-found-${theme}`}>
            <div className="not-found-box">
                <h1>404</h1>
                <p>Well. I guest you are lost.</p>
                <p>Here. use this spell to return home.</p>
                <p>The spell... kind of {':=>'} <Link id="toItems" to="/" >Spell to get home</Link></p>
            </div>
        </Container>
    )
}