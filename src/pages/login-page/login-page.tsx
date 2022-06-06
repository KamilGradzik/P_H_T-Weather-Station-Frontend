import { ReactElement } from "react"
import LoginForm from "../../components/login-form/login-form"
import "./login-page.scss";

const LoginPage:React.FC = ():ReactElement => {
    return(
        <div className="login-page">
            <div className="login-page-content">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage