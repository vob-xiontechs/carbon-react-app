import React, { useState } from 'react';
import { TextInput, Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const login = useAuthStore(s => s.login);
  const [username, setUsername] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) setError('Tài khoản hoặc mật khẩu không đúng');
    else {
      setError(null);
      navigate('/');
    }
  };

  return (
    <form className="login-page" onSubmit={handleSubmit}>
      <div className="login-inner">
        <div className="login-header">
          <div className="login-avatar" aria-hidden>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
              <circle cx="12" cy="8" r="3" strokeWidth="1.4" />
              <path d="M4 20c0-3.3 4-5 8-5s8 1.7 8 5" strokeWidth="1.4" fill="none" />
            </svg>
          </div>
          <h2 className="login-title">Đăng nhập</h2>
        </div>
        <p className="login-desc">Nhập thông tin tài khoản của bạn để tiếp tục.</p>
        <TextInput
          id="u"
          labelText="User"
          className="login-input"
          placeholder="Email hoặc tên đăng nhập"
          value={username}
          onChange={e => setUsername((e.target as HTMLInputElement).value)}
        />

        {/* custom password field + switch */}
        <div className="password-row">
          <TextInput
            id="p"
            labelText="Password"
            className="login-input"
            placeholder="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="login-controls">
          <label className="show-pass-toggle">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={e => setShowPassword(e.target.checked)}
            />
            <span className="toggle-label">Hiện mật khẩu</span>
          </label>
        </div>

        {error && <div className="login-error">{error}</div>}
        <div className="actions">
          <Button type="submit" className="login-submit">
            Đăng nhập
          </Button>
        </div>
      </div>
    </form>
  );
}
