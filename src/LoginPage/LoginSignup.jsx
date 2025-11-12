import React, { useState } from 'react';
import './style.css';

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const containerStyle = {
    position: 'relative',
    width: '900px',
    height: '550px',
    background: '#202c40',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  };

  const formPanelStyle = {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '50%', 
    transition: 'transform 0.6s ease-in-out',
    transform: isSignUp ? 'translateX(100%)' : 'translateX(0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const overlayPanelStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '50%',
    transition: 'transform 0.6s ease-in-out',
    transform: isSignUp ? 'translateX(-100%)' : 'translateX(0)',
  };

  const formContainerStyle = {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const formStyle = {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  };

  const h2Style = {
    marginBottom: '5px',
    color: '#ffffff',
  };

  const pStyle = {
    color: '#aba9a9',
    marginBottom: '2px',
    // textAlign: 'center',
  };

  const pStyle1 = {
    color: '#aba9a9',
    marginBottom: '20px',
    // textAlign: 'center',
  };

  const socialLoginStyle = {
    margin: '20px 0',
    display: 'flex',
    gap: '15px',
  };

  const socialBtnStyle = {
    width: '45px',
    height: '45px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '18px',
  };

  const dividerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#999',
    position: 'relative',
  };

  const inputStyle = {
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
  };

  const btnStyle = {
    padding: '12px',
    // marginTop: '15px',
    width: '99%',
    border: '1px solid #12162b',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const btnSignupStyle = {
    ...btnStyle,
    background: '#0b417a',
    color: '#fff',
  };

  const overlayStyle = {
    flex: '1',
    background: 'linear-gradient(135deg, #1dae83, #0b417a)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    textAlign: 'center',
    
    height: '100%',
  };

  const overlayBtnStyle = {
    padding: '12px 30px',
    border: '1px solid white',
    borderRadius: '25px',
    background: '#dededeff',
    color: '#434d81ff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const formGroupStyle = {
    position: 'relative',
    marginBottom: '10px',
    width: '100%',
  };

  const labelStyle = {
    position: 'absolute',
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.4)',
    transition: '0.3s ease all',
    pointerEvents: 'none',
  };
  
  const formInputStyle = {
    width: '350px',
    height: '50px',
    background: 'rgba(207, 203, 203, 0.1)',
    border: '1px solid rgb(50, 43, 79)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
    padding: '15px 20px',
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#121525',
    }}>
      <div style={containerStyle}>
        {/* Forms Panel */}
        <div style={formPanelStyle}>
          {/* Login Form */}
          <div style={{...formContainerStyle, position: 'absolute', left: 0, opacity: isSignUp ? 0 : 1, transition: 'opacity 0.6s ease-in-out', pointerEvents: isSignUp ? 'none' : 'auto'}}>
            <h2 style={h2Style}>Login to Your Account</h2>
            <p style={pStyle}>&nbsp;Login using social networks</p>
            
            <div style={socialLoginStyle}>&nbsp;
              <button style={{ ...socialBtnStyle, background: '#3b5998' }}>f</button>
              <button style={{ ...socialBtnStyle, background: '#dd3939ff' }}>G</button>
              <button style={{ ...socialBtnStyle, background: '#0077b5' }}>in</button>
            </div>
            <div style={dividerStyle}>-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;- OR -&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-</div>
            <form style={formStyle} action="#" method="post">
              <div style={formGroupStyle}>
                <input style={formInputStyle} type="email" id="login-email" name="email" required placeholder="Email Address" />
                <label style={labelStyle} htmlFor="login-email"></label>
              </div><br/>
              <div style={formGroupStyle}>
                <input style={formInputStyle} type="password" id="login-password" name="password" required placeholder="Password" />
                <label style={labelStyle} htmlFor="login-password"></label>
              </div><br/>
              <button style={{ ...btnStyle, background: '#20c997', color: '#fff' }} type="submit" className="btn btn-login">Login</button>
            </form>
          </div>
          {/* Signup Form */}
          <div style={{...formContainerStyle, position: 'absolute', right: 0, opacity: isSignUp ? 1 : 0, transition: 'opacity 0.6s ease-in-out', pointerEvents: isSignUp ? 'auto' : 'none'}}>
            <h2 style={h2Style}>Create an Account</h2>
            <p style={pStyle1}>Sign up to discover new opportunities</p><br /><br /><br /><br /><br />
            <form style={formStyle}>
              <div style={formGroupStyle}>
                <input style={formInputStyle} type="email" id="signup-email" name="email" required placeholder=" " />
                <label style={labelStyle} htmlFor="signup-email">Email Address</label>
              </div><br />
              <div style={formGroupStyle}>
                <input style={formInputStyle} type="tel" id="signup-phone" name="phone" required placeholder=" " />
                <label style={labelStyle} htmlFor="signup-phone">Phone Number</label>
              </div><br />
              <div style={formGroupStyle}>
                <input style={formInputStyle} type="password" id="signup-password" name="password" required placeholder=" " />
                <label style={labelStyle} htmlFor="signup-password">Password</label>
              </div><br />
              <div style={formGroupStyle}>
                <input style={formInputStyle} type="password" id="signup-confirm-password" name="confirm-password" required placeholder=" " />
                <label style={labelStyle} htmlFor="signup-confirm-password">Confirm Password</label>
              </div><br />
              <button style={btnSignupStyle} type="submit" className="btn btn-signup">Sign Up</button>
            </form>
          </div>
        </div>

        {/* Overlay Panel */}
        <div style={overlayPanelStyle}>
          <div style={overlayStyle}>
            <h2 style={h2Style}>{isSignUp ? "One of Us?" : "New Here?"}</h2>
            <p>{isSignUp ? "Sign in and discover a great amount of new opportunities!" : "Sign up and discover a great amount of new opportunities!"}</p>
            <button style={overlayBtnStyle} onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
