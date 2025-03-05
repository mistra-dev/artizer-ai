document.addEventListener('DOMContentLoaded', () => {
    const articleUrl = document.getElementById('articleUrl');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = themeToggle.querySelector('.theme-label');
    const html = document.documentElement;
    const analysisType = document.getElementById('analysisType');
    const language = document.getElementById('language');
    const customPromptContainer = document.getElementById('customPromptContainer');
    const customPrompt = document.getElementById('customPrompt');
    const resultContainer = document.getElementById('resultContainer');
    const loadingTemplate = document.getElementById('loadingTemplate');
    const resultTemplate = document.getElementById('resultTemplate');

    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeLabel.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    
    analysisType.addEventListener('change', () => {
        customPromptContainer.style.display = 
            analysisType.value === 'custom' ? 'block' : 'none';
    });

    function formatMarkdown(text) {
        return text
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^\* (.*$)/gm, '<li>$1</li>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)\n/g, '<ul>$1</ul>')
            .replace(/<\/ul>\n<ul>/g, '');
    }

    analyzeBtn.addEventListener('click', async () => {
        const url = articleUrl.value.trim();
        if (!url) {
            alert('Mohon masukkan URL artikel');
            return;
        }

        try {
            resultContainer.innerHTML = '';
            resultContainer.appendChild(loadingTemplate.content.cloneNode(true));
            
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: url,
                    analysisType: analysisType.value,
                    language: language.value,
                    customPrompt: customPrompt.value
                })
            });

            const data = await response.json();
            resultContainer.innerHTML = '';

            if (data.success) {
                const resultNode = resultTemplate.content.cloneNode(true);
                resultNode.querySelector('.result-content').innerHTML = formatMarkdown(data.analysis);
                
                const copyBtn = resultNode.querySelector('.copy-btn');
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(data.analysis)
                        .then(() => {
                            copyBtn.textContent = 'Tersalin!';
                            setTimeout(() => {
                                copyBtn.textContent = 'Copy';
                            }, 2000);
                        })
                        .catch(() => alert('Gagal menyalin teks'));
                });

                resultContainer.appendChild(resultNode);
                resultContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
            resultContainer.innerHTML = '';
        }
    });

    
    articleUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });
}); 