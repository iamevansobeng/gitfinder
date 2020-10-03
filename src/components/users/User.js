import React, { Component } from 'react'

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login)
    }
    render() {
        const { name, avatar_url, bio, blog, login, html_url, followers, following, public_repos, public_gist, hireable } = this.props.user

        const { loading } = this.props
        return (
            <div>
                <h1>{name}</h1>
            </div>
        )
    }
}

export default User
