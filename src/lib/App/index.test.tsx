import React from 'react';
import {AppConfig} from "./Config/AppConfig";
import {render} from "./index";

test('renders', () => {
    const originalFunc = document.getElementById

    document.getElementById = () => {
        return document.createElement("div");
    }

    render('root', {pages: []} as AppConfig)

    document.getElementById = originalFunc
});
