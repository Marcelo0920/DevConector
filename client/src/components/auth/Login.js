import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) =>{

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const {email, password} = formData;

    const onSubmit = async e =>{
        e.preventDefault();
            /* const newUser = {
                name,
                email,
                password
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users', body, config);

                console.log(res.data);

            } catch (error) {
                console.error(error.response.data);
            } */
            login(email, password);
        }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    //REDIRECT if LOG IN

    if(isAuthenticated){
        return <Redirect to= "/dashboard" />
    }

    return(
        <Fragment>
            <h1>
                <Link to="/index"><i className="fas fa-code" /> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user" /> Sign Into Your Account</p>
                <form className="form" action="create-profile" onSubmit = {e =>onSubmit(e)}>

                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value = {email} 
                            onChange = { e => onChange(e)}
                            required
                            name="email" />

                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value = {password} 
                            onChange = { e => onChange(e)}
                            minLength={6} />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}


export default connect(mapStateToProps, {login})(Login);