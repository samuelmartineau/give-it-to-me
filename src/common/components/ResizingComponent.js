import React, {Component} from 'react';
import debounce from 'lodash.debounce';

const DEFAULT_DEBOUNCE_WAIT = 100;

export default class ResizingComponent extends Component {
    constructor(props, context) {
        super(props, context);
        window.addEventListener('resize', debounce(this.updateLayout.bind(this), context.debounceWait || DEFAULT_DEBOUNCE_WAIT));
    }
}
