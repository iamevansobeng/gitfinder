import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserItem = ({ user: { avatar_url, login, html_url } }) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} alt={login + 'image'} className='round-img' style={{ width: '80px' }} />
            <h3>{login} </h3>
            <div>
                <Link to={`/user/${login}`} className="bnt btn-dark btn-sm my-1">More </Link>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}
export default UserItem
