import * as serviceWorker from './serviceWorker';
import getSampleAppConfig from "./Sample/SampleConfig";
import {render} from "./lib/App"

import './lib/App/app.css';
import "./lib/App/Layout/Layout.css"

render("app", getSampleAppConfig());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
