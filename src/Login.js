import React from 'react'

class Login extends React.Component {
    state = {
        isLogin: false,
        values: {},
        error: ''
    }

    submitHandler = e => {
        e.preventDefault()

        const { isLogin, values } = this.state
        this.setState({ error: '' })
        fetch(
            `http://localhost:55555/user/${isLogin ? 'login' : ''}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }
        ).then(r => r.json())
            .then(res => {
                if (res.error)
                    this.setState({ error: res.error.message || res.error })
                else {
                    localStorage.token = res.token
                    localStorage.email = values.email
                    this.props.history.push('/')
                }
            })
            .catch(err => {
                this.setState({ error: err.message || err })
            })
    }

    changeHandler = e => {
        const { name, value } = e.target
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }

    render() {
        const { isLogin, error } = this.state

        if (localStorage.token) {
            this.props.history.push('/')
            return null
        }

        return <div>
            <h1>{isLogin ? 'כניסה' : 'הרשמה'}</h1>
            <form onSubmit={this.submitHandler} onChange={this.changeHandler} >
                {isLogin ? null : <input name='name' placeholder='שם' type='text' required />}
                <br />
                <input name='email' placeholder='דוא"ל' type='email' required />
                <br />
                <input name='password' placeholder='סיסמא ' type='password' required />
                <br />
                <input value='שלח' type='submit' />
            </form>
            {error ? <h3 style={{ color: 'red' }}>{error}</h3> : null}
            <button onClick={() => this.setState({ isLogin: !isLogin })}>{isLogin ? 'עוד לא רשום? לחץ כאן' : 'כבר רשום? לחץ כאן'}</button>
        </div>
    }
}

export default Login