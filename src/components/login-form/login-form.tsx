import { ReactElement } from "react";
import "./login-form.scss";

const LoginForm:React.FC = ():ReactElement => {
    const submitForm = (e:any) => {
        e.preventDefault();
    }
    return(
        <div className="login-content">
            <div className="login-messages">
                <p>Lorem Ipsum error!</p>
            </div>
            <form className="login-form" onSubmit={(e:any)=>submitForm(e)}>
                <div className="form-element">
                    <label>Email</label>
                    <input type="text" />
                </div>
                <div className="form-element">
                    <label>Hasło</label>
                    <input type="password" />
                </div>
                <div className="form-element form-submit">
                    <input type="submit" value={"Zaloguj"}/>
                </div>
                <div className="form-pass-reset">
                    <p>Zapomniałeś hasła?</p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm