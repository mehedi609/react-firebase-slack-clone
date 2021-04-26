import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from "./router";

import 'semantic-ui-css/semantic.css'

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
