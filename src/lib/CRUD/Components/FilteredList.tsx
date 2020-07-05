import React, {Component} from "react";
import {ListItem} from "../Data/Adapter";
import Filter from "./Filter";
import List from "./List";
import "./List.css";

interface Props {
    items: ListItem[]
    onSelect: (value: string) => void;
}

interface State {
    filter: string
}

export default class FilteredList extends Component<Props, any> {
    static defaultProps: Props = {
        items: [],
        onSelect: () => {
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {filter: ''} as State;
    }

    render() {
        return <div>
            <Filter onChange={(value) => {
                this.filter(value);
            }}/>
            <List items={this.items()} onSelect={(id: string) => this.props.onSelect(id)}/>
        </div>
    }

    private items(): ListItem[] {
        return this.props.items.filter((item: ListItem) => item.caption.indexOf(this.state.filter) >= 0)
    }

    private filter(value: string) {
        this.setState(() => {
            return {filter: value};
        })
    }
}