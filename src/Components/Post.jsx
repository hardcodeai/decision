import React from 'react';
import postCss from './post.css'

import { Button } from 'reactstrap';

export function Post(props) {

    const { content } = props;

    return (
        <div id="post-content">
            <h1>{content.title}</h1>
            <p>{content.body}</p>
        </div>
    );
}
