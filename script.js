// 网站交互功能JavaScript

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 移动端菜单点击后关闭菜单
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // 联系表单提交处理
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (contactForm && formSuccess && formError) {
        // 获取提交按钮
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // 表单验证函数
        function validateForm() {
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                // 清除之前的错误状态
                input.classList.remove('border-red-500');
                input.classList.remove('focus:border-red-500');
                input.classList.remove('focus:ring-red-500');
                
                // 移除可能存在的错误提示
                const errorElement = input.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
                
                // 验证输入
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    
                    // 添加错误提示
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message text-red-500 text-sm mt-1';
                    errorMessage.textContent = input.getAttribute('aria-required') ? '此字段为必填项' : '请填写此字段';
                    input.parentNode.appendChild(errorMessage);
                } else if (input.type === 'email' && !validateEmail(input.value.trim())) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    
                    // 添加错误提示
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message text-red-500 text-sm mt-1';
                    errorMessage.textContent = '请输入有效的电子邮箱地址';
                    input.parentNode.appendChild(errorMessage);
                }
            });
            
            return isValid;
        }
        
        // 邮箱验证函数
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // 添加实时验证
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // 清除错误状态
                this.classList.remove('border-red-500');
                
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
                
                // 如果是邮箱输入，进行邮箱格式验证
                if (this.type === 'email' && this.value.trim() && !validateEmail(this.value.trim())) {
                    this.classList.add('border-red-500');
                    
                    // 添加错误提示
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message text-red-500 text-sm mt-1';
                    errorMessage.textContent = '请输入有效的电子邮箱地址';
                    this.parentNode.appendChild(errorMessage);
                }
            });
        });
        
        // 表单提交处理
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 隐藏之前的提示
            formSuccess.classList.add('hidden');
            formError.classList.add('hidden');
            
            // 验证表单
            if (!validateForm()) {
                return;
            }
            
            // 禁用提交按钮并显示加载状态
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 发送中...';
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('表单数据:', formValues);
            
            // 在实际应用中，这里会发送表单数据到服务器
            // 由于这是一个演示，我们使用模拟的API请求
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 随机模拟成功或失败（实际应用中应该根据API响应决定）
                const isSuccess = Math.random() > 0.2; // 80%概率成功
                
                // 恢复按钮状态
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                if (isSuccess) {
                    // 显示成功提示
                    formSuccess.classList.remove('hidden');
                    // 添加动画效果
                    formSuccess.classList.add('fade-in');
                    
                    // 重置表单
                    contactForm.reset();
                    
                    // 聚焦到表单顶部
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // 显示错误提示
                    formError.classList.remove('hidden');
                    // 添加动画效果
                    formError.classList.add('fade-in');
                    
                    // 聚焦到表单顶部
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                }
                
                // 5秒后自动隐藏提示
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    formError.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
    
    // FAQ折叠面板
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // 切换内容显示状态
            content.classList.toggle('hidden');
            
            // 切换图标
            if (icon.classList.contains('fa-plus')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
            
            // 关闭其他所有FAQ面板
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.nextElementSibling.classList.add('hidden');
                    const otherIcon = otherToggle.querySelector('i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
        });
    });
    
    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // 滚动时显示/隐藏返回顶部按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.classList.remove('opacity-100', 'visible');
            }
        });
        
        // 点击返回顶部
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 如果是直接的#或无效的锚点，则不执行平滑滚动
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // 计算滚动位置，考虑固定导航栏的高度
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 元素进入视口时添加动画效果
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // 初始调用一次
    animateOnScroll();
    
    // 滚动时调用
    window.addEventListener('scroll', animateOnScroll);
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', function() {
        // 如果移动菜单在桌面视图下打开，关闭它
        if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // 重新计算响应式布局
        handleResponsiveLayout();
        
        // 触发一次滚动动画检查
        animateOnScroll();
    });
    
    // 处理响应式布局调整
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        
        // 调整导航栏样式
        const nav = document.querySelector('nav');
        if (nav) {
            if (windowWidth < 768) {
                nav.classList.add('py-3');
                nav.classList.remove('py-4');
            } else {
                nav.classList.add('py-4');
                nav.classList.remove('py-3');
            }
        }
        
        // 调整卡片布局
        const cards = document.querySelectorAll('.rounded-xl.shadow-custom');
        cards.forEach(card => {
            if (windowWidth < 480) {
                card.classList.add('p-6');
                card.classList.remove('p-8');
            } else {
                card.classList.add('p-8');
                card.classList.remove('p-6');
            }
        });
    }
    
    // 初始化响应式布局
    handleResponsiveLayout();
    
    // 图片懒加载支持
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src || image.src;
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            images.forEach(image => imageObserver.observe(image));
        } else {
            // 降级方案
            images.forEach(image => {
                image.src = image.dataset.src || image.src;
            });
        }
    };
    
    // 初始化图片懒加载
    lazyLoadImages();
    
    // 表单输入验证
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('border-red-500');
                this.classList.add('focus:border-red-500');
                this.classList.add('focus:ring-red-500');
            } else {
                this.classList.remove('border-red-500');
                this.classList.remove('focus:border-red-500');
                this.classList.remove('focus:ring-red-500');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            this.classList.remove('focus:border-red-500');
            this.classList.remove('focus:ring-red-500');
        });
    });
});