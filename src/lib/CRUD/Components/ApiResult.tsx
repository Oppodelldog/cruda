import React, {Component} from "react";
import "./ApiResult.css";

interface Props {
    apiError: string
    apiSuccess: string
}

export default class ApiResult extends Component<Props, any> {
    static defaultProps: Props = {
        apiError: "",
        apiSuccess: ""
    }

    render() {
        return <div>
            {this.getSuccess()}
            {this.getError()}
        </div>
    }

    private getSuccess() {
        if (this.props.apiSuccess === "") {
            return <></>
        }

        return <div
            data-testid={"api-result-success"}
            className={"apiSuccess alert alert-success"}>
            {this.props.apiSuccess}
        </div>;
    }

    private getError() {
        if (this.props.apiError === "") {
            return <></>
        }

        return <div
            data-testid={"api-result-error"}
            className={"apiError alert alert-danger"}>
            {this.props.apiError}
        </div>;
    }
}

