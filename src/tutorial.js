const TUTORIAL_STORAGE_KEY = 'serverSurvivalTutorialComplete';

const TUTORIAL_STEPS = [
    {
        id: 'welcome',
        title: '欢迎，架构师！',
        text: '你将接管一套服务器基础设施。目标是正确路由流量并抵御攻击。让我们搭建第一版架构！',
        icon: '👋',
        highlight: null,
        action: 'next',
        position: 'center',
        hint: '点击播放后流量才会开始进入，先把防线准备好！'
    },
    {
        id: 'traffic-types',
        title: 'HTTP 流量类型',
        text: '<div class="space-y-2 text-left text-sm">' +
            '<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-400 inline-block"></span><span class="text-green-400 font-bold w-16">STATIC</span><span class="text-gray-300">GET • 图片、CSS、JS → <span class="text-emerald-400">存储</span></span></div>' +
            '<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-400 inline-block"></span><span class="text-blue-400 font-bold w-16">READ</span><span class="text-gray-300">GET • 用户/API 数据 → <span class="text-red-400">数据库</span></span></div>' +
            '<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-orange-400 inline-block"></span><span class="text-orange-400 font-bold w-16">WRITE</span><span class="text-gray-300">POST/PUT • 写入/更新 → <span class="text-red-400">数据库</span></span></div>' +
            '<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span><span class="text-yellow-400 font-bold w-16">UPLOAD</span><span class="text-gray-300">POST+文件 • 上传/媒体 → <span class="text-emerald-400">存储</span></span></div>' +
            '<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span><span class="text-cyan-400 font-bold w-16">SEARCH</span><span class="text-gray-300">GET+查询 • 全文搜索/过滤 → <span class="text-red-400">数据库</span></span></div>' +
            '<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-400 inline-block"></span><span class="text-red-400 font-bold w-16">ATTACK</span><span class="text-gray-300">DDoS、SQL 注入、机器人 → <span class="text-purple-400">用防火墙阻挡！</span></span></div>' +
            '</div>' +
            '<div class="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">' +
            '<div class="flex justify-between"><span>缓存可减轻数据库/存储压力：</span><span>STATIC 90% • READ 40% • SEARCH 15%</span></div>' +
            '<div class="flex justify-between"><span>耗时操作（更慢）：</span><span>UPLOAD 2× • SEARCH 2.5×</span></div>' +
            '</div>',
        icon: '🌐',
        highlight: null,
        action: 'next',
        position: 'center',
        hint: '真实后端也在处理这些流量类型！把它们路由到正确的终点才能赚钱。'
    },
    {
        id: 'place-firewall',
        title: '部署防火墙',
        text: '<span class="text-purple-400 font-bold">防火墙</span>是第一道防线，拦截会摧毁声望的<span class="text-red-400">恶意</span>流量。点击防火墙按钮，再在网格上放置。',
        icon: '🛡️',
        highlight: 'tool-waf',
        action: 'place_waf',
        hint: '把防火墙放在互联网节点（左侧青色方块）附近，连线更方便。'
    },
    {
        id: 'connect-firewall',
        title: '连接到互联网',
        text: '很好！现在把<span class="text-cyan-400 font-bold">互联网</span>连接到防火墙。选择<span class="text-blue-400 font-bold">连接</span>工具，先点互联网再点防火墙。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_internet_waf',
        hint: '所有流量都从互联网节点进入，没有这条线流量无法进入你的架构。'
    },
    {
        id: 'place-lb',
        title: '部署负载均衡',
        text: '<span class="text-blue-400 font-bold">负载均衡</span>把流量分发到多台服务器，防止过载，提升可靠性。',
        icon: '⚖️',
        highlight: 'tool-alb',
        action: 'place_alb',
        hint: '负载均衡使用轮询，自动均衡请求。'
    },
    {
        id: 'connect-fw-lb',
        title: '连接防火墙 → 负载均衡',
        text: '把防火墙连接到负载均衡，净化后的流量会从 防火墙 → 负载均衡 流动。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_waf_alb',
        hint: '完整流向：互联网 → 防火墙（拦截恶意） → 负载均衡 → ...'
    },
    {
        id: 'place-compute',
        title: '部署计算节点',
        text: '<span class="text-orange-400 font-bold">计算</span>处理所有请求，并把它们路由到正确终点：<span class="text-emerald-400">存储</span>处理 STATIC/UPLOAD，<span class="text-red-400">数据库</span>处理 READ/WRITE/SEARCH。',
        icon: '⚡',
        highlight: 'tool-lambda',
        action: 'place_compute',
        hint: '计算节点可升级以承载更多流量（1 → 2 → 3 级）。UPLOAD/SEARCH 处理时间更长。'
    },
    {
        id: 'connect-lb-compute',
        title: '连接负载均衡 → 计算',
        text: '把负载均衡连接到计算节点。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_alb_compute',
        hint: '可以放多台计算节点，负载均衡会自动分配请求。'
    },
    {
        id: 'place-storage',
        title: '部署文件存储',
        text: '<span class="text-emerald-400 font-bold">文件存储</span>处理<span class="text-green-400">STATIC</span>（绿）和<span class="text-yellow-400">UPLOAD</span>（黄）流量，没有它这些请求都会失败！',
        icon: '📁',
        highlight: 'tool-s3',
        action: 'place_s3',
        hint: 'STATIC = 图片/CSS/JS（90% 缓存命中）；UPLOAD = 文件上传（重处理，不缓存）。'
    },
    {
        id: 'place-cdn',
        title: '部署 CDN',
        text: '<span class="text-green-400 font-bold">CDN</span> 加速 <span class="text-green-400">STATIC</span> 内容，在互联网与存储之间。',
        icon: '🌍',
        highlight: 'tool-cdn',
        action: 'place_cdn',
        hint: 'CDN 缓存命中率高达 95%，多数请求无需触达存储！'
    },
    {
        id: 'connect-internet-cdn',
        title: '连接互联网 → CDN',
        text: '把<span class="text-cyan-400 font-bold">互联网</span>连到<span class="text-green-400 font-bold">CDN</span>，用户先命中边缘缓存。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_internet_cdn',
        hint: '流向：互联网 → CDN，如缓存未命中再走存储。'
    },
    {
        id: 'connect-cdn-s3',
        title: '连接 CDN → 存储',
        text: '把<span class="text-green-400 font-bold">CDN</span>连到<span class="text-emerald-400 font-bold">文件存储</span>，缓存未命中时可回源取文件。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_cdn_s3',
        hint: '只有约 5% 的缓存未命中会访问存储，节省成本与容量。'
    },
    {
        id: 'place-db',
        title: '部署数据库',
        text: '<span class="text-red-400 font-bold">SQL 数据库</span>处理 <span class="text-blue-400">READ</span>、<span class="text-orange-400">WRITE</span>、<span class="text-cyan-400">SEARCH</span> 流量，API 离不开数据库。',
        icon: '🗄️',
        highlight: 'tool-db',
        action: 'place_db',
        hint: 'READ = 读取（40% 缓存）；WRITE = 更新（不缓存）；SEARCH = 复杂查询（15% 缓存，重）。'
    },
    {
        id: 'connect-compute-storage',
        title: '连接到存储',
        text: '把<span class="text-orange-400">计算</span>连到<span class="text-emerald-400">文件存储</span>，使用连接工具。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_compute_s3',
        hint: '计算会自动将 STATIC 和 UPLOAD 路由到存储。'
    },
    {
        id: 'connect-compute-db',
        title: '连接到数据库',
        text: '把<span class="text-orange-400">计算</span>连到<span class="text-red-400">数据库</span>。',
        icon: '🔗',
        highlight: 'tool-connect',
        action: 'connect_compute_db',
        hint: '计算会自动将 READ、WRITE、SEARCH 路由到数据库。'
    },
    {
        id: 'ready',
        title: '基础架构就绪！',
        text: '基础架构搭好了！点击<span class="text-green-400 font-bold">播放</span>开始模拟，观察流量如何穿过系统。',
        icon: '🚀',
        highlight: 'btn-play',
        action: 'start_game',
        hint: '关注服务周围的彩色环：绿色正常，红色过载。需要时升级或再加服务。'
    },
    {
        id: 'complete',
        title: '教程完成！',
        text: '<span class="text-green-400">恭喜！</span> 你已掌握基础。记住：<br><br>' +
            '• <span class="text-red-400">红</span> = 恶意 → 用防火墙阻挡<br>' +
            '• <span class="text-green-400">绿</span> STATIC / <span class="text-yellow-400">黄</span> UPLOAD → 去存储<br>' +
            '• <span class="text-blue-400">蓝</span> READ / <span class="text-orange-400">橙</span> WRITE / <span class="text-cyan-400">青</span> SEARCH → 去数据库<br>' +
            '• 缓存可帮助：STATIC 90%、READ 40%、SEARCH 15%<br><br>' +
            '祝你好运，架构师！',
        icon: '🎉',
        highlight: null,
        action: 'finish',
        position: 'center',
        hint: '前期预算变负很正常！就像真实架构一样，先投入，处理请求后才盈利。每个完成的请求都会赚钱！'
    }
];

class Tutorial {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.completedActions = new Set();
        this.modal = document.getElementById('tutorial-modal');
        this.popup = document.getElementById('tutorial-popup');
        this.backdrop = document.getElementById('tutorial-backdrop');
        this.highlight = document.getElementById('tutorial-highlight');
        this.titleEl = document.getElementById('tutorial-title');
        this.textEl = document.getElementById('tutorial-text');
        this.iconEl = document.getElementById('tutorial-icon');
        this.stepNumEl = document.getElementById('tutorial-step-num');
        this.totalStepsEl = document.getElementById('tutorial-total-steps');
        this.hintEl = document.getElementById('tutorial-hint');
        this.hintTextEl = document.getElementById('tutorial-hint-text');
        this.nextBtn = document.getElementById('tutorial-next');
        this.skipBtn = document.getElementById('tutorial-skip');
        this.progressEl = document.getElementById('tutorial-progress');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.nextBtn?.addEventListener('click', () => this.nextStep());
        this.skipBtn?.addEventListener('click', () => this.skip());
    }

    isCompleted() {
        return localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
    }

    markCompleted() {
        localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    }

    reset() {
        localStorage.removeItem(TUTORIAL_STORAGE_KEY);
    }

    start() {
        this.isActive = true;
        this.currentStep = 0;
        this.completedActions.clear();
        this.modal.classList.remove('hidden');
        this.totalStepsEl.textContent = TUTORIAL_STEPS.length;
        this.renderProgress();
        this.popup.classList.add('tutorial-enter');
        setTimeout(() => this.popup.classList.remove('tutorial-enter'), 500);
        this.showStep();
        document.getElementById('btn-play')?.classList.remove('pulse-green');

        return true;
    }

    showStep() {
        const step = TUTORIAL_STEPS[this.currentStep];
        if (!step) return;

        this.titleEl.textContent = step.title;
        this.textEl.innerHTML = step.text;
        this.iconEl.textContent = step.icon;
        this.stepNumEl.textContent = this.currentStep + 1;

        if (step.hint) {
            this.hintEl.classList.remove('hidden');
            this.hintTextEl.textContent = step.hint;
        } else {
            this.hintEl.classList.add('hidden');
        }

        if (step.action === 'next' || step.action === 'finish') {
            this.nextBtn.classList.remove('hidden');
            this.nextBtn.textContent = step.action === 'finish' ? 'Start Playing!' : 'Next';
        } else {
            this.nextBtn.classList.add('hidden');
        }

        this.clearHighlights();
        if (step.highlight) this.highlightElement(step.highlight);
        this.positionPopup(step);
        this.updateProgress();
    }

    highlightElement(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.classList.add('tutorial-tool-highlight');
        const rect = el.getBoundingClientRect();
        this.highlight.style.left = `${rect.left - 4}px`;
        this.highlight.style.top = `${rect.top - 4}px`;
        this.highlight.style.width = `${rect.width + 8}px`;
        this.highlight.style.height = `${rect.height + 8}px`;
        this.highlight.classList.remove('hidden');
    }

    clearHighlights() {
        document.querySelectorAll('.tutorial-tool-highlight').forEach(el => el.classList.remove('tutorial-tool-highlight'));
        this.highlight.classList.add('hidden');
    }

    positionPopup(step) {
        if (step.position === 'center') {
            this.popup.style.right = 'auto';
            this.popup.style.bottom = 'auto';
            this.popup.style.left = '50%';
            this.popup.style.top = '50%';
            this.popup.style.transform = 'translate(-50%, -50%)';
        } else {
            this.popup.style.transform = '';
            this.popup.style.left = 'auto';
            this.popup.style.top = 'auto';
            this.popup.style.right = '20px';
            this.popup.style.bottom = '140px';
        }
    }

    renderProgress() {
        this.progressEl.innerHTML = '';
        TUTORIAL_STEPS.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'w-2 h-2 rounded-full transition-all duration-300';
            if (i < this.currentStep) {
                dot.className += ' bg-cyan-500';
            } else if (i === this.currentStep) {
                dot.className += ' bg-cyan-400 w-4';
            } else {
                dot.className += ' bg-gray-600';
            }
            this.progressEl.appendChild(dot);
        });
    }

    updateProgress() {
        const dots = this.progressEl.children;
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            dot.className = 'w-2 h-2 rounded-full transition-all duration-300';
            if (i < this.currentStep) {
                dot.className += ' bg-cyan-500';
            } else if (i === this.currentStep) {
                dot.className += ' bg-cyan-400 w-4';
            } else {
                dot.className += ' bg-gray-600';
            }
        }
    }

    nextStep() {
        const step = TUTORIAL_STEPS[this.currentStep];

        if (step.action === 'finish') {
            this.complete();
            return;
        }

        this.currentStep++;
        if (this.currentStep >= TUTORIAL_STEPS.length) {
            this.complete();
        } else {
            this.popup.classList.add('tutorial-step-change');
            setTimeout(() => this.popup.classList.remove('tutorial-step-change'), 300);
            this.showStep();
            new Audio('assets/sounds/click-5.mp3').play();
        }
    }

    onAction(actionType, data = {}) {
        if (!this.isActive) return;

        const step = TUTORIAL_STEPS[this.currentStep];
        if (!step) return;

        let actionMatches = false;

        switch (step.action) {
            case 'place_waf':
                actionMatches = actionType === 'place' && data.type === 'waf';
                break;
            case 'place_alb':
                actionMatches = actionType === 'place' && data.type === 'alb';
                break;
            case 'place_compute':
                actionMatches = actionType === 'place' && data.type === 'compute';
                break;
            case 'place_s3':
                actionMatches = actionType === 'place' && data.type === 's3';
                break;
            case 'place_db':
                actionMatches = actionType === 'place' && data.type === 'db';
                break;
            case 'connect_internet_waf':
                actionMatches = actionType === 'connect' && data.from === 'internet' && data.toType === 'waf';
                break;
            case 'connect_waf_alb':
                actionMatches = actionType === 'connect' && data.fromType === 'waf' && data.toType === 'alb';
                break;
            case 'connect_alb_compute':
                actionMatches = actionType === 'connect' && data.fromType === 'alb' && data.toType === 'compute';
                break;
            case 'connect_compute_s3':
                actionMatches = actionType === 'connect' && data.fromType === 'compute' && data.toType === 's3';
                break;
            case 'connect_compute_db':
                actionMatches = actionType === 'connect' && data.fromType === 'compute' && data.toType === 'db';
                break;
            case 'place_cdn':
                actionMatches = actionType === 'place' && data.type === 'cdn';
                break;
            case 'connect_internet_cdn':
                actionMatches = actionType === 'connect' && data.from === 'internet' && data.toType === 'cdn';
                break;
            case 'connect_cdn_s3':
                actionMatches = actionType === 'connect' && data.fromType === 'cdn' && data.toType === 's3';
                break;
            case 'start_game':
                actionMatches = actionType === 'start_game';
                break;
        }

        if (actionMatches) {
            this.completedActions.add(step.action);
            setTimeout(() => {
                this.nextStep();
            }, 300);
        }
    }

    skip() {
        this.complete();
    }

    complete() {
        this.isActive = false;
        this.clearHighlights();
        this.modal.classList.add('hidden');
        this.markCompleted();
        STATE?.sound?.playSuccess();
    }

    hide() {
        this.modal.classList.add('hidden');
        this.clearHighlights();
    }

    show() {
        if (this.isActive) {
            this.modal.classList.remove('hidden');
            this.showStep();
        }
    }
}

window.tutorial = new Tutorial();
window.resetTutorial = () => {
    window.tutorial.reset();
    console.log('Tutorial reset. Start a new Survival game to see the tutorial.');
};
