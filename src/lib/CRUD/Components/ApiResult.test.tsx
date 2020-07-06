import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import React from 'react';
import ApiResult from "./ApiResult";

test('ApiResult renders nothing', () => {

    const {queryByTestId} = render(
        <ApiResult/>
    );

    expect(queryByTestId("api-result-error")).not.toBeInTheDocument();
    expect(queryByTestId("api-result-success")).not.toBeInTheDocument();
});

test('ApiResult renders success and error', () => {
    const error = "ERROR";
    const success = "SUCCESS";
    const {queryByTestId} = render(
        <ApiResult apiError={error} apiSuccess={success}/>
    );

    expect(queryByTestId("api-result-error")).toBeInTheDocument();
    expect(queryByTestId("api-result-success")).toBeInTheDocument();
});

