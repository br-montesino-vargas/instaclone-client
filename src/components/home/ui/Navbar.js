import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Image } from "semantic-ui-react";

import { Options } from "./Options";
import { Search } from "./Search";

import logo from "../../../assets/img/instaclone.png";

export const Navbar = () =>
{
    return (
        <div className="ui__navbar">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="ui__logo">
                        <Link to="/">
                            <Image src={logo} alt="Instaclone" />
                        </Link>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <Search />
                    </Grid.Column>

                    <Grid.Column width={3} className="ui__logo">
                        <Options />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
};
