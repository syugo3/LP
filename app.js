// フォーム送信とスムーズスクロールの処理
const handleDOMLoad = () => {
    const form = document.getElementById('applicationForm');
    const formMessage = document.getElementById('formMessage');

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // フォーム送信処理
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            // ここで実際のAPIエンドポイントに送信する処理を実装
            console.log('送信データ:', data);
            formMessage.textContent = '応募ありがとうございます。担当者より連絡させていただきます。';
            formMessage.className = 'form-message success';
            form.reset();
        } catch (error) {
            formMessage.textContent = 'エラーが発生しました。もう一度お試しください。';
            formMessage.className = 'form-message error';
        }
    });
};

document.addEventListener('DOMContentLoaded', handleDOMLoad);
            <a href="#contact" class="cta-button">応募する</a>
   