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

    // benefits-gridのアニメーション処理を追加
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.children;
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, index * 400); // 200ms から 400ms に変更
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // benefits-gridを監視対象に追加
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (benefitsGrid) {
        observer.observe(benefitsGrid);
    }
};

// ページ読み込み時の処理
window.onload = function() {
    // URLからハッシュを削除して最上部にスクロール
    if (window.location.hash) {
        window.location.hash = '';
        window.scrollTo(0, 0);
    }
};

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    handleDOMLoad();
});
   