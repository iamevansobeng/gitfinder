import React from 'react'

const NotFound = () =>
    <>
        <h1 className='lead' style={{ textAlign: 'center' }}>Page not Found</h1>
        <p style={{ fontSize: '70px', padding: 20, margin: 5, letterSpacing: 12, textAlign: "center", background: 'black', color: 'white' }}>4<i className="far fa-frown" />4</p>

        <a href="/" className='btn btn-primary'> <i className="fas fa-home" /> Go home</a>
    </>

export default NotFound
