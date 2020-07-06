import {render} from "@testing-library/react";
import React from 'react';
import {doFilterInput} from "./Filter.test";
import FilteredList from "./FilteredList";
import {
    expectListCallsOnSelect,
    expectListHighlightSelectedItem,
    expectListRendersListItems,
    ListTestBed
} from "./List.test";

test('List renders ListItems', () => {
    const testBed = new ListTestBed();
    expectListRendersListItems(testBed, <FilteredList items={testBed.items}/>);
});

test('List calls onSelect with the id of the clicked item', () => {
    const testBed = new ListTestBed();
    expectListCallsOnSelect(testBed, <FilteredList items={testBed.items} onSelect={testBed.onSelect.bind(testBed)}/>);
});

test('List highlights the clicked item', () => {
    const testBed = new ListTestBed();
    expectListHighlightSelectedItem(
        testBed,
        <FilteredList
            items={testBed.items}
            onSelect={testBed.onSelect.bind(testBed)}/>
    );
});

test('FilteredList renders ListItems filtered by Filter', () => {
    const listTestBed = new ListTestBed();
    const {getByTestId, queryByText} = render(
        <FilteredList items={listTestBed.items}/>
    );

    doFilterInput(listTestBed.item2.caption, getByTestId)

    const entry1 = queryByText(listTestBed.item1.caption)
    const entry2 = queryByText(listTestBed.item2.caption)

    expect(entry1).not.toBeInTheDocument()
    expect(entry2).toBeInTheDocument()
});
