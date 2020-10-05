import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

const App = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    const searchUsers = async (text) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        setUsers(res.data.items)
        setLoading(false)
    }
    // GET SINGLE USER 
    const getUser = async (username) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        setUser(res.data)
        setLoading(false)
    }
    const getUserRepos = async (username) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        setRepos(res.data)
        setLoading(false)
    }

    const clearUsers = () => {
        setUsers([])
        setLoading(false)
    }

    const showAlert = (msg, type) => {
        setAlert({ msg, type })
        setTimeout(() => setAlert(null), 2500)
    }
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path='/' render={props =>
                            <>
                                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} showAlert={showAlert} />
                                <Users loading={loading} users={users} />

                            </>} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/user/:login' render={props => (
                            <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
                        )} />
                    </Switch>
                    <Alert alert={alert} />

                </div>
            </div>
        </Router>
    )
}


export default App
