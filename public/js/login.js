function togglePassword() {
    const input = document.getElementById('password');
    const eye   = document.getElementById('eyeToggle');
    const show  = input.type === 'password';
    input.type  = show ? 'text' : 'password';
    eye.textContent = show ? '🔒' : '👁';
  }

  document.getElementById('username').addEventListener('blur', function () {
    const hint = document.getElementById('unHint');
    if (!this.value) { hint.className = 'field-hint'; return; }
    const ok = this.value.trim().length >= 3;
    this.classList.toggle('is-invalid', !ok);
    hint.textContent = ok ? '' : 'At least 3 characters required';
    hint.className   = ok ? 'field-hint' : 'field-hint show err';
  });

  document.getElementById('password').addEventListener('blur', function () {
    const hint = document.getElementById('pwHint');
    if (!this.value) { hint.className = 'field-hint'; return; }
    const ok = this.value.length >= 6;
    this.classList.toggle('is-invalid', !ok);
    hint.textContent = ok ? '' : 'Password seems too short';
    hint.className   = ok ? 'field-hint' : 'field-hint show err';
  });

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    const allFilled = ['username', 'password']
                        .every(id => document.getElementById(id).value.trim());
    if (!allFilled) { e.preventDefault(); return; }
    const btn       = document.getElementById('submitBtn');
    btn.disabled    = true;
    btn.textContent = 'Signing in…';
  });
