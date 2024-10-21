// 切换密码可见性
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function (e) {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('ri-eye-off-line');
        this.classList.toggle('ri-eye-line');
    });
}

// 获取页面元素
const loginForm = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const errorMessage = document.querySelector('#error-message');

// 处理登录表单提交
if (loginForm) { // 确保在登录页面才执行
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
        const data = { email, password: passwordValue };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = result.msg || 'Login failed. Please try again.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
            errorMessage.style.display = 'block';
        }
    });
}

// 处理注册表单提交
const registerForm = document.getElementById('registerForm');
if (registerForm) { // 确保在注册页面才执行
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // 阻止表单的默认提交行为

        const email = document.querySelector('#email').value;
        const passwordValue = document.querySelector('#password').value;

        console.log(email, passwordValue); // 用于调试，确保 email 和 password 值正确

        const data = { email, password: passwordValue }; // 构建要发送的数据

        try {
            const response = await fetch('/register', {
                method: 'POST', // 使用 POST 方法发送请求
                headers: {
                    'Content-Type': 'application/json' // 设置请求头为 JSON 类型
                },
                body: JSON.stringify(data) // 将数据转换为 JSON 字符串
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'index.html'; // 注册成功后跳转到登录页面
            } else {
                alert(result.msg || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred: ' + error.message);
        }
    });
}
