

import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../services/supabase.js';

const SignupPage = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.session) {
      toast.success('회원가입을 완료했어요.');
    } else {
      toast.success('이메일에서 가입 확인 링크를 눌러 주세요.');
    }
  };

  return (
    <section className="page">
      <div className="page-heading">
        <h2>회원가입</h2>
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <label>
          이메일
          <input type="email" name="email" autoComplete="email" required />
        </label>

        <label>
          비밀번호
          <input type="password" name="password" autoComplete="new-password" required />
        </label>

        <button className="btn btn--primary" type="submit">
          가입하기
        </button>

        <Link className="login-form__signup" to="/login">
          로그인
        </Link>
      </form>
    </section>
  );
};

export default SignupPage;
