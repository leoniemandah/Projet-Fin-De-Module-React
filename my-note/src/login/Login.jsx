import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import "./login.css";
import { history } from '_helpers';
import { authActions } from '_store';

export { Login };

function Login() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        
        if (authUser) history.navigate('/');

    }, []);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }

    return ( 

            <div class="container">
	<div class="screen">
		<div class="screen__content">
        
			<form class="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="alert alert-info">
                Pour tester l'application:<br />
                Username: loulou<br />
                Password: love
            </div>
            <center><h3>My Secret note</h3></center>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="User name / Email"  {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.username?.message}</div>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
				</div>
				<button class="button login__submit" disabled={isSubmitting} >
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
					<span class="button__text">Se connecter</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>		
                {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }		
			</form>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>

        
    )
}
