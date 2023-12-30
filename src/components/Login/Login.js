import React, { Component } from 'react'

class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
               email: '',
               password: '',
               error: '',
               loading: false
          }
     }

     OnEmailChange = event => {
          this.setState({ email: event.target.value })
          this.setState({ error: '' })
     }

     OnPasswordChange = event => {
          this.setState({ password: event.target.value })
          this.setState({ error: '' })
     }

     onSubmit = event => {
          if (this.state.email === '' || this.state.password === '') {
               this.setState({ error: 'Email & Password Required' })
               return ;
          }

          if (!String(this.state.email)
               .toLowerCase()
               .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               )) {
               this.setState({ error: 'Email is invalid' })
               return;
          }

          this.setState({ loading: true });
          fetch("https://face-recognition-api-three.vercel.app/signin", {
               method: 'post',
               headers: { 'content-type': 'application/json' },
               body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
               })
          }).then(res => {
               this.setState({ loading: false }); 
               if (res.status === 400) this.setState({ error: "Wrong Credentials" })
               return res.json()
          })
               .then(user => {
                    this.setState({ loading: false });
                    if (user.id) {
                         this.props.loadUser(user)
                         this.props.onRouteChange('home')
                    }
               })
     }

     render() {
          const { onRouteChange } = this.props
          return (
               <main className="pa4 black-80 br3 ba dark-gray  border broder-2 border-gray-500 z-2 mv4 w-100 w-50-m w-25-l mw6  shadow-2xl z-2 center  z-2">
                    <div className="measure">
                         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                              <legend className="f1 fw6 ph0 mh0 center">Login</legend>
                              <div className="mt3">
                                   <label className="db font-bold font-mono text-xl" htmlFor="email-address">Email</label>
                                   <input required onChange={this.OnEmailChange}
                                        className="  focus:outline-none
                                        pa2 input-reset ba bg-transparent w-100 font-bold  font-serif text-lg  text-center rounded-lg" type="email" name="email-address" id="email-address" />
                              </div>
                              <div className="mv3">
                                   <label className="db font-bold font-mono text-xl" htmlFor="password">Password</label>
                                   <input required onChange={this.OnPasswordChange} className="   focus:outline-none b pa2 input-reset ba bg-transparent font-bold  font-serif text-lg  text-center rounded-lg w-100" type="password" name="password" id="password" />
                              </div>
                              {this.state.error && <p className='text-red-700 text-xl font-bold'>{this.state.error}</p>}
                         </fieldset>
                         <div className="">
                              <input className="b ph3  pv2 input-reset ba b--black bg-transparent grow pointer rounded-2xl font-semibold text-lg " type="submit" disabled={this.state.loading} value={`${this.state.loading ? 'Loading...' : 'Login'}`} onClick={this.onSubmit} />
                         </div>
                         <p onClick={() => onRouteChange('register')} href="#0" className=" mt3 pointer underline text-sm  dim black  font-bold">Register</p>
                    </div>
               </main>
          )
     }
}

export default Login