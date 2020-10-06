import React, { useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'


const User = ({ repos, getUserRepos, match }) => {
    const githubContext = useContext(GithubContext)
    const { user, loading, getUser } = githubContext
    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //eslint-disable-next-line
    }, [])


    const { name, avatar_url, bio, blog, login, html_url, followers, following, location, public_repos, public_gists, company, hireable } = user

    if (loading) return <Spinner />
    else return (
        <>
            <Link to='/' className="btn btn-light">Back to Search</Link>
                Hireable : { hireable ? <i className="fas fa-check text-success" /> :
                <i className="fas fa-times-circle text-danger" />}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' alt={name} style={{ width: '150px' }} />
                    {name && <h1> {name} </h1>}
                    {location && <p>Location : {location} </p>}
                </div>
                <div className="">
                    {bio &&
                        <>
                            <strong> User description</strong>
                            <p>{bio}</p>
                        </>}
                    <a href={html_url} className="btn btn-dark my-1" target='blank'>Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && <> <strong>Username : </strong>{login}  </>}
                        </li>
                        <li>
                            {company && <> <strong>Company : </strong>{company}  </>}
                        </li>
                        <li>
                            {blog && <> <strong>Website : </strong>{blog}  </>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers : {followers} </div>
                <div className="badge badge-success">Following : {following} </div>
                <div className="badge badge-danger">Public Repos : {public_repos} </div>
                <div className="badge badge-dark">Public Gist : {public_gists} </div>
            </div>
            <Repos repos={repos} />
        </>
    )
}


User.propTypes = {
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
}
export default User
