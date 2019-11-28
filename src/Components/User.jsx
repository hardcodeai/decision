import React from 'react';

export function User(props) {

    const { user } = props;

    return (
        <div style={{ color: '#00203fff' }}>
            <h3>{user.username}</h3>
            <hr></hr>
            <p>{user.name}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
            <p>{user.email}</p>
        </div>
    );
}
