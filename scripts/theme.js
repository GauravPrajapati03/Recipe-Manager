// Theme management (dark / light) - single source of truth via document.documentElement.classList
// Persisted in localStorage under key 'theme'

const THEME_KEY = 'theme';

function getStoredTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch (e) {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
        // ignore
    }
}

export function applyTheme(theme, { save = false } = {}) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    if (save) saveTheme(theme);
    updateToggleUI(theme);
    // Notify other modules if needed
    document.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
}

function updateToggleUI(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const pressed = theme === 'dark';
    btn.setAttribute('aria-pressed', String(pressed));
    btn.title = pressed ? 'Switch to light theme' : 'Switch to dark theme';

    const icon = btn.querySelector('.theme-icon');
    if (icon) {
        // swap icon class from moon to sun
        icon.className = pressed ? 'ri-sun-line theme-icon' : 'ri-moon-line theme-icon';
        icon.setAttribute('aria-hidden', 'true');
    }

    btn.classList.toggle('active', pressed);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next, { save: true });
}

function bindToggleButton() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('#themeToggle');
        if (!btn) return;
        e.preventDefault();
        toggleTheme();
        btn.focus();
    });
}

// Initialize on DOMContentLoaded: reflect stored theme and hook up button
function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const stored = getStoredTheme();
        if (stored) {
            // Apply without saving (already stored) to ensure UI is synced
            applyTheme(stored, { save: false });
        } else {
            // No stored value -> respect existing default (do nothing)
            updateToggleUI(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }

        bindToggleButton();
    });
}

// Auto-init when module is loaded so consumer files don't need to call anything
init();

// Expose for tests / other modules
export function getTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function setTheme(theme) {
    applyTheme(theme, { save: true });
}
