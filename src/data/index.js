/* eslint-disable import/prefer-default-export */
const reddit = 'platforms/reddit.png';
const linkedin = 'platforms/linkedin.png';
const quora = 'platforms/quora.png';
const twitter = 'platforms/twitter.png';
const facebook = 'platforms/facebook.png';
const instagram = 'platforms/instagram.png';
const pinterest = 'platforms/pinterest.png';
const tiktok = 'platforms/tiktok.png';

export const platformsSrc = {
    'reddit.com': reddit,
    'linkedin.com': linkedin,
    'quora.com': quora,
    'twitter.com': twitter,
    'facebook.com': facebook,
    'instagram.com': instagram,
    'pinterest.com': pinterest,
    'tiktok.com': tiktok
};

export const keywordColors = {
    1: {
        background: '#C7FCEB',
        color: '#0A362E'
    },
    2: {
        background: '#CDF2FA',
        color: '#0F3A4D'
    },
    3: {
        background: '#FFF1CD',
        color: '#3B2109'
    }
};

export const OPEN_AI_MODELS = [
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-1106',
    // 'gpt-3.5-turbo-instruct',
    //
    'gpt-4-turbo',
    'gpt-4-turbo-2024-04-09',
    'gpt-4-turbo-preview',
    'gpt-4-0125-preview',
    'gpt-4-1106-preview',
    'gpt-4',
    'gpt-4-0613',
    // 'gpt-4-0314',
    //
    'gpt-4o-mini',
    'gpt-4o-mini-2024-07-18',
    'gpt-4o',
    //
    'gpt-4o-2024-05-13',
    'gpt-4o-2024-08-06',
    'chatgpt-4o-latest'
];
export const GEMINI_MODELS = ['gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-1.0-pro', 'gemini-1.5-pro'];
// const geminiModels = ['gemini-1.5-flash', 'gemini-1.5', 'gemini', 'gemini-ultra', 'gemini-advanced'];
export const STRAICO_MODELS = [
    'anthropic/claude-3-haiku:beta',
    'anthropic/claude-3-opus',
    'anthropic/claude-3-sonnet',
    'anthropic/claude-3.5-sonnet',
    'cohere/command-r-08-2024',
    'cohere/command-r-plus-08-2024',
    'cognitivecomputations/dolphin-mixtral-8x7b',
    'alpindale/goliath-120b',
    'google/gemini-pro-1.5',
    'google/gemma-2-27b-it',
    'gryphe/mythomax-l2-13b',
    'meta-llama/llama-3-70b-instruct:nitro',
    'meta-llama/llama-3-8b-instruct',
    'meta-llama/llama-3.1-405b-instruct',
    'meta-llama/llama-3.1-70b-instruct',
    'mistralai/codestral-mamba',
    'mistralai/mistral-large',
    'mistralai/mixtral-8x7b-instruct',
    'nousresearch/hermes-3-llama-3.1-405b',
    'openai/gpt-3.5-turbo-0125',
    'openai/gpt-4',
    'openai/gpt-4-turbo-2024-04-09',
    'openai/gpt-4-vision-preview',
    'openai/gpt-4o-2024-08-06',
    'openai/gpt-4o',
    'openai/gpt-4o-mini',
    'perplexity/llama-3.1-sonar-huge-128k-online',
    'perplexity/llama-3-sonar-large-32k-online',
    // '    /llama-3-sonar-small-32k-online',
    'qwen/qwen-2-72b-instruct',
    'mattshumer/reflection-70b'
];
