// noinspection TypeScriptCheckImport
import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import Filter from "./Filter";

test('Filter sends onChange if filter changes', () => {

    let changeEventParamValue = ""
    const onChange = (txt) => {
        changeEventParamValue = txt;
    }

    const {getByTestId} = render(
        <Filter onChange={onChange}/>
    );
    const testInputStub = "test-input";
    doFilterInput(testInputStub, getByTestId)

    expect(changeEventParamValue).toEqual(testInputStub)
});

export function doFilterInput(value: string, getByTestId: any) {
    fireEvent.change(getByTestId("filter-input"), {target: {value: value}})
}