// eslint-disable-next-line no-unused-vars
import { GoogleLogin } from "react-google-login";

export function LoginWithGoogle(clientId) {
  const onSuccess = (res) => {
    console.log("logio success:", res.profileObj);
  };
  const onFail = (res) => {
    console.log("logio Fail:", res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFail}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
