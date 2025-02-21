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

    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // flow-steps内の全てのflow-itemにanimate classを追加
                const flowItems = entry.target.querySelectorAll('.flow-item');
                flowItems.forEach(item => {
                    item.classList.add('animate');
                });
                // 一度アニメーションが開始したら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2  // 20%見えたらアニメーション開始
    });

    // flow-stepsを監視
    const flowSteps = document.querySelector('.flow-steps');
    if (flowSteps) {
        observer.observe(flowSteps);
    }

    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.benefit-item').forEach(item => {
                    item.classList.add('fade-in');
                });
                benefitsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    const benefitsGrid = document.querySelector('.benefits-grid');
    if (benefitsGrid) {
        benefitsObserver.observe(benefitsGrid);
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

// 背景画像の配列
const backgroundImages = [
    'images/team-meeting1.jpg',
    'images/team-meeting2.jpg',
    'images/team-meeting3.jpg',
    'images/team-meeting4.jpg'
];

// ランダムに画像を選択する関数
function getRandomImage(currentImage) {
    let newImage;
    do {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        newImage = `url('${backgroundImages[randomIndex]}')`;
    } while (newImage === currentImage);
    return newImage;
}

// 背景画像を切り替える関数
function changeBackground() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const currentImage = getComputedStyle(hero).getPropertyValue('--bg-image');
        const newImage = getRandomImage(currentImage);
        hero.style.setProperty('--bg-image', newImage);
    }
}

// ページ読み込み時に初期画像を設定し、定期的な切り替えを開始
window.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        // 初期画像を設定
        const initialImage = `url('${backgroundImages[0]}')`;
        hero.style.setProperty('--bg-image', initialImage);
        
        // 2秒ごとに背景を切り替え
        setInterval(changeBackground, 2000);
    }
});
   