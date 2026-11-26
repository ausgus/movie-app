

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../services/supabase.js';



const LoginPage = () => {
  const navigate = useNavigate();

  
  const onSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error('이메일 또는 비밀번호를 확인해 주십시오.');
      return;
    }

    toast.success('로그인 성공');
    navigate('/', { replace: true });
  };

  return (
    <section className="page">
      <div className="page-heading">
        <h2>로그인</h2>
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <label>
          이메일
          <input type="email" name="email" autoComplete="email" required />
        </label>

        <label>
          비밀번호
          <input type="password" name="password" autoComplete="current-password" required />
        </label>

        <button className="btn btn--primary" type="submit">
          로그인
        </button>

        <Link className="login-form__signup" to="/signup">
          회원가입
        </Link>
      </form>
    </section>
  );
};

export default LoginPage;
