// Lectura asistida opcional. No detecta auriculares ni cambia la salida del sistema.
window.electionAudio = (() => {
    let enabled = false, observer, voice, timer;
    const supported = () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    const status = text => { const node = document.getElementById('audio-status'); if (node) node.textContent = text; };
    const cancel = () => { clearTimeout(timer); if (supported()) window.speechSynthesis.cancel(); };
    function speak(text) {
        cancel();
        if (!enabled || !text || document.hidden || !document.getElementById('voter-audio-scope')) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = voice.lang;
        utterance.voice = voice;
        utterance.rate = 0.95;
        utterance.onerror = event => {
            if (!['canceled', 'interrupted'].includes(event.error)) status('No se pudo reproducir el audio. Verificá la voz y la salida de sonido.');
        };
        window.speechSynthesis.speak(utterance);
    }
    function screenText() {
        const main = document.getElementById('main-content');
        if (!main || !document.getElementById('voter-audio-scope')) return '';
        const clone = main.cloneNode(true);
        clone.querySelectorAll('.toolbar, .audio-controls, .steps, #voter-audio-scope, .simulation').forEach(node => node.remove());
        return (clone.textContent || '').replace(/\s+/g, ' ').trim();
    }
    function repeat() { speak(screenText()); }
    function stop() {
        enabled = false;
        cancel();
        observer?.disconnect();
        observer = undefined;
        document.removeEventListener('focusin', onFocus);
    }
    function onFocus(event) {
        const target = event.target.closest('button, input, select, textarea, a');
        if (!target || !target.closest('#main-content') || target.closest('.audio-controls')) return;
        const name = target.getAttribute('aria-label') || target.textContent || target.labels?.[0]?.textContent;
        if (name) speak(name.trim());
    }
    async function enable() {
        stop();
        if (!supported()) { status('Este navegador no admite lectura en voz alta. Podés usar el lector de pantalla del equipo.'); return false; }
        let voices = window.speechSynthesis.getVoices();
        if (!voices.length) {
            voices = await new Promise(resolve => {
                const finish = () => { clearTimeout(timeout); window.speechSynthesis.removeEventListener('voiceschanged', finish); resolve(window.speechSynthesis.getVoices()); };
                const timeout = setTimeout(finish, 1200);
                window.speechSynthesis.addEventListener('voiceschanged', finish);
            });
        }
        voice = voices.find(v => v.localService && /^es[-_]AR$/i.test(v.lang)) || voices.find(v => v.localService && /^es(?:[-_]|$)/i.test(v.lang));
        if (!voice) { status('No hay una voz local en español disponible. Instalá una voz en español en el equipo y volvé a abrir el navegador.'); return false; }
        enabled = true;
        let previous = screenText();
        observer = new MutationObserver(() => {
            if (!document.getElementById('voter-audio-scope')) { stop(); return; }
            const current = screenText();
            if (current === previous) return;
            previous = current;
            cancel();
            timer = setTimeout(repeat, 180);
        });
        observer.observe(document.getElementById('main-content'), {subtree: true, childList: true, characterData: true});
        document.addEventListener('focusin', onFocus);
        repeat();
        return true;
    }
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); });
    window.addEventListener('pagehide', stop);
    return {enable, repeat, stop};
})();
