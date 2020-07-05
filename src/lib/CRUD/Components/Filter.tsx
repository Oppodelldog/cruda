import React, {Component} from "react";
import "./Filter.css";

interface Props {
    onChange: (value: string) => void;
}

export default class Filter extends Component<Props, any> {
    render() {
        return <div className={"filter"}>
            <label htmlFor={"filter"}>Filter</label>
            <input id={"filter"}
                   data-testid={"filter-input"}
                   className={"form-control"}
                   type={"text"} onChange={
                (e) => {
                    const value = e.target.value;
                    this.props.onChange(value)
                }
            }
            />
        </div>
    }
}