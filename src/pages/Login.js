import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GoogleIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { connect } from 'react-redux'
// import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginAction, googleLogin, googleSignUp } from '../redux/actions/authAction'
function Login(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const googleSuccess = async (res) => {
    console.log(res);
    await props?.googleLogin(res?.credential, async (loginResults) => {
      if (loginResults === true) {
        history.push('/app')
      } else if (loginResults === 401) {
        alert("cre");
        await props.googleSignUp(res?.credential, async (signUpResults) => {
          if (signUpResults === true) {
            history.push('/app')
          } else {
            alert("not");
          }
        })
      }
      else {

      }
    })
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('google sign in unsuccesfull');
  }

  const regularLogin = async () => {
    await props.loginAction('nabilcambiaso@gmail.com', "123456", (res) => {
      if (res) {
        history.push('/app')
      }
      else {
        console.log("first")
      }
    })
  }

  useEffect(() => {

  }, [props.authState])


  return (
    <GoogleOAuthProvider clientId="583724674784-gd3eo44manqh04t2b46to4340k1hand8.apps.googleusercontent.com">
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                <Label>
                  <span>Email</span>
                  <Input className="mt-1" type="email" placeholder="john@doe.com" />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1" type="password" placeholder="***************" />
                </Label>

                <Button onClick={regularLogin} className="mt-4" block
                // tag={Link} to="/app"
                >
                  Log in
                </Button>

                <hr className="my-8" />
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleFailure}
                />
                {/* <GoogleLogin
                clientId='583724674784-gd3eo44manqh04t2b46to4340k1hand8.apps.googleusercontent.com'
                render={(renderProps) => (
                  <Button className="mt-4" block layout="outline" onClick={renderProps.onClick}>
                    <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Google
                  </Button>
                )}
                onSuccess={(res)=>googleSuccess(res)}
                onFailure={()=>googleFailure()}
              /> */}
                <Button className="mt-4" block layout="outline">
                  <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Twitter
                </Button>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/create-account"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}


const mapStatetoProps = (state) => {
  return {
    authState: state.authReducer,
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    loginAction: (email, password, callback) => dispatch(loginAction(email, password, callback)),
    googleLogin: (token, callback) => dispatch(googleLogin(token, callback)),
    googleSignUp: (token, callback) => dispatch(googleSignUp(token, callback)),
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
