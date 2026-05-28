
  /* Password toggle */
  function togglePassword() {
    const input = document.getElementById('password');
    const eye   = document.getElementById('eyeToggle');
    const show  = input.type === 'password';
    input.type  = show ? 'text' : 'password';
    eye.textContent = show ? '🔒' : '👁';
  }

  /* Password strength */
  const segs   = [1,2,3,4].map(n => document.getElementById('s' + n));
  const colors = ['#EF4444', '#F97316', '#22C55E', '#15803D'];
  const labels = ['Too weak', 'Fair', 'Good', 'Strong'];

  function getStrength(pw) {
    let s = 0;
    if (pw.length >= 8)           s++;
    if (/[A-Z]/.test(pw))         s++;
    if (/[0-9]/.test(pw))         s++;
    if (/[^A-Za-z0-9]/.test(pw))  s++;
    return s;
  }

  document.getElementById('password').addEventListener('input', function () {
    const pw  = this.value;
    const lbl = document.getElementById('sLabel');
    if (!pw) {
      segs.forEach(s => s.style.background = '');
      lbl.textContent = '';
      return;
    }
    const s = getStrength(pw);
    segs.forEach((seg, i) => seg.style.background = i < s ? colors[s - 1] : 'var(--border)');
    lbl.textContent  = labels[s - 1];
    lbl.style.color  = colors[s - 1];
  });

  /* Email validation */
  document.getElementById('email').addEventListener('blur', function () {
    const hint = document.getElementById('emHint');
    if (!this.value) { hint.className = 'field-hint'; return; }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
    this.classList.toggle('is-valid',   ok);
    this.classList.toggle('is-invalid', !ok);
    hint.textContent = ok ? '✓ Looks good!' : 'Enter a valid email address';
    hint.className   = 'field-hint show ' + (ok ? 'ok' : 'err');
  });

  /* Username validation */
  document.getElementById('username').addEventListener('blur', function () {
    const hint = document.getElementById('unHint');
    if (!this.value) { hint.className = 'field-hint'; return; }
    const ok = this.value.length >= 3;
    this.classList.toggle('is-valid',   ok);
    this.classList.toggle('is-invalid', !ok);
    hint.textContent = ok ? '✓ Username looks good' : 'At least 3 characters required';
    hint.className   = 'field-hint show ' + (ok ? 'ok' : 'err');
  });

  /* Form submit guard */
  document.getElementById('signupForm').addEventListener('submit', function (e) {
    const allFilled = ['username', 'email', 'password']
                        .every(id => document.getElementById(id).value.trim());
    if (!allFilled) { e.preventDefault(); return; }
    const btn       = document.getElementById('submitBtn');
    btn.disabled    = true;
    btn.textContent = 'Creating account…';
  });
