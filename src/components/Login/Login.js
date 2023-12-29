import React, { Component } from 'react'

class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
               email: '',
               password: '',
               loading: false
          }
     }

     OnEmailChange = event => {
          this.setState({ email: event.target.value })
     }

     OnPasswordChange = event => {
          this.setState({ password: event.target.value })
     }

     onSubmit = event => {
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
               <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-6 center">
                    <main className="pa4 black-80">
                         <div className="measure">
                              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                   <legend className="f1 fw6 ph0 mh0 center">Login</legend>
                                   <div className="mt3">
                                        <label className="db font-bold font-mono text-xl" htmlFor="email-address">Email</label>
                                        <input onChange={this.OnEmailChange} className="pa2 input-reset ba bg-transparent w-100 font-bold  font-serif text-lg  text-center rounded-lg" type="email" name="email-address" id="email-address" />
                                   </div>
                                   <div className="mv3">
                                        <label className="db font-bold font-mono text-xl" htmlFor="password">Password</label>
                                        <input onChange={this.OnPasswordChange} className="b pa2 input-reset ba bg-transparent font-bold  font-serif text-lg  text-center rounded-lg w-100" type="password" name="password" id="password" />
                                   </div>
                              </fieldset>
                              <div className="">
                                   <input className="b ph3  pv2 input-reset ba b--black bg-transparent grow pointer rounded-2xl font-semibold text-lg " type="submit" disabled={this.state.loading} value={`${this.state.loading ? 'Loading...' : 'Login'}`} onClick={this.onSubmit} />
                              </div>
                              <div className="lh-copy mt3">
                                   <p onClick={() => onRouteChange('register')} href="#0" className="pointer f6 link dim black db font-bold">Register</p>
                              </div>
                         </div>
                    </main>
               </article>
          )
     }
}

export default Login