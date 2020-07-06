import React, {Component} from "react";
import {ListItem} from "../Data/Adapter";
import "./List.css";

interface Props {
    items: ListItem[]
    onSelect: (value: string) => void;
}

interface State {
    filter: string
    selectedId: string
}

export default class List extends Component<Props, any> {

    static defaultProps: Props = {
        items: [],
        onSelect: () => {
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {selectedId: ''} as State;
    }

    render() {
        return <div>
            <ul className={"List"}>
                {this.props.items.map((item: ListItem) =>
                    <li key={item.id}
                        data-testid={"entity-list-item-" + item.id}
                        onClick={() => this.select(item.id)}
                        className={this.state.selectedId === item.id ? 'selected' : 'unselected'}>{item.caption}</li>
                )}
            </ul>
        </div>
    }

    private select(id: string) {
        this.setState(() => {
            return {selectedId: id};
        });

        this.props.onSelect(id);
    }
}