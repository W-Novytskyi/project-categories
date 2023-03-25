import axios from 'axios';

const API_KEY = 'XNJirPivuaKUCCSyIyJ0snmyEroNI0MP';

export { fetchCategories };

async function fetchCategories() {
    const url = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`;

    try {
            const response = await axios.get(url);
            const data = response.data;

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }