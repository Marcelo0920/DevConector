import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) =>{

    const [formData, setFormData] = useState({
        name : '',
        email: '',
        password: '',
        password2: ''
    });
    
    const {name, email, password, password2} = formData;

    const onSubmit = async e =>{
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match', 'danger')
        }else{
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
                register({name, email, password});
        }
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
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user" /> Create Your Account</p>
                <form className="form" action="create-profile" onSubmit = {e =>onSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value = {name} 
                            onChange = { e => onChange(e)}
                        //    required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value = {email} 
                            onChange = { e => onChange(e)}
                        //    required
                            name="email" 
                        />
                        <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value = {password} 
                            onChange = { e => onChange(e)}
                        //    minLength={6} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            name="password2" 
                            value = {password2} 
                            onChange = { e => onChange(e)}
                        //    minLength={6} 
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" defaultValue="Register" />
                </form>
                <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}


export default connect(mapStateToProps, {setAlert, register})(Register);