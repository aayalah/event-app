const KEY = "currentUser";
const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

type StoredUser = { data: unknown; expiresAt: number };

export function setStoredUser(user: unknown): void {
    if (typeof window === 'undefined') return;
    const entry: StoredUser = { data: user, expiresAt: Date.now() + TTL_MS };
    localStorage.setItem(KEY, JSON.stringify(entry));
}

export function getStoredUser(): unknown | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const entry: StoredUser = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(KEY);
        return null;
    }
    return entry.data;
}

export function clearStoredUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEY);
}
