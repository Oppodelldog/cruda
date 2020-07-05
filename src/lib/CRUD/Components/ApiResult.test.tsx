import {render} from '@testing-library/react';
import React from 'react';
import ApiResult from "./ApiResult";

test('ApiResult renders nothing', () => {

    const {queryByTestId} = render(
        <ApiResult/>
    );

    // noinspection TypeScriptUnresolvedFunction
    expect(queryByTestId("api-result-error")).not.toBeInTheDocument();

    // noinspection TypeScriptUnresolvedFunction
    expect(queryByTestId("api-result-success")).not.toBeInTheDocument();
});

test('ApiResult renders success and error', () => {
    const error = "ERROR";
    const success = "SUCCESS";
    const {queryByTestId} = render(
        <ApiResult apiError={error} apiSuccess={success}/>
    );

    // noinspection TypeScriptUnresolvedFunction
    expect(queryByTestId("api-result-error")).toBeInTheDocument();

    // noinspection TypeScriptUnresolvedFunction
    expect(queryByTestId("api-result-success")).toBeInTheDocument();
});

