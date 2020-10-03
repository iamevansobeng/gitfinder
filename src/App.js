import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
    }

    searchUsers = async (text) => {
        this.setState({ loading: true })
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        this.setState({ users: res.data.items, loading: false })
    }
    // GET SINGLE USER 
    getUser = async (username) => {
        this.setState({ loading: true })
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        this.setState({ user: res.data, loading: false })
    }

    clearUsers = () => this.setState({ users: [], loading: false })

    showAlert = (msg, type) => {
        this.setState({
            alert: { msg, type }
        })
        setTimeout(() => this.setState({ alert: null }), 2500)
    }
    render() {
        const { users, user, loading } = this.state
        return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' render={props =>
                                <>
                                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} showAlert={this.showAlert} />
                                    <Users loading={loading} users={users} />

                                </>} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' render={props => (
                                <User {...props} getUser={this.getUser} user={user} loading={loading} />
                            )} />
                        </Switch>
                        <Alert alert={this.state.alert} />

                    </div>
                </div>
            </Router>
        )
    }
}

export default App
