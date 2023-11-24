const API_BASE_URL = 'https://swapi.dev/api/';

async function crawlPlanets(signal) {
    let planets = [];
    let apiUrl = `${API_BASE_URL}/planets`;
    while (apiUrl) {
        const response = await fetch(apiUrl, {
            signal
        });
        if (response.status > 199 && response.status < 300) {
            const newPlanets = await response.json();
            planets.push(...newPlanets.results);
            apiUrl = newPlanets.next;
        } else {
            return [undefined, await createErrorFromResponse()]
        }
    }
    return [planets, undefined];
}

async function createErrorFromResponse(response) {
    return {
        error: response.status,
        message: await response.json() || 'Error'
    }
}

const STORAGE_KEY = 'planets';

export async function getPlanets(filter, signal) {
    try {
        // a small cache to make refresh faster
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return [JSON.parse(stored), undefined];
        }
        const [planets, error] = await crawlPlanets(signal);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(planets));
        return [planets, error];
    } catch (e) {
        return [undefined, e]
    }
}
