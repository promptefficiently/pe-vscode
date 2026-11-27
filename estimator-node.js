const PE_CALS = () => [];
/* Prompt Efficiently estimator - on-device cost logic, shared with the web app.
   Source of truth: promptefficiently.com (generated from app.js). */
const PLATFORMS=[{"id":"chatgpt","logo":"assets/logos/chatgpt.png","name":"ChatGPT","unit":"messages","freeLabel":"Free: limited messages per window","paidLabel":"Go / Plus / Pro tiers","kind":"caps","unverified":"Caps are not published by OpenAI. Free gives unlimited GPT-6 text chats with guardrails and Go/Plus/Pro tiers exist (openai.com, 22 Nov), but per-message figures come from a third-party tracker. Treat as rough.","plans":[{"id":"free","label":"Free","unpublished":true},{"id":"go","label":"Go $8/mo","unpublished":true},{"id":"plus","label":"Plus $20/mo","unpublished":true},{"id":"pro","label":"Pro 200 $200/mo","unpublished":true},{"id":"pro100","label":"Pro 100 $100/mo","unpublished":true},{"id":"pro500","label":"Pro 500 $500/mo","unpublished":true}]},{"id":"claude","logo":"assets/logos/claude.png","name":"Claude","unit":"messages","freeLabel":"Free: limited every 5 hours and weekly","paidLabel":"Pro $20/mo · Max $100/mo · Ultra $200/mo","kind":"caps","unverified":"Window structure confirmed on claude.com (22 Nov), but exact caps are not published. Treat as rough.","plans":[{"id":"free","label":"Free","unpublished":true},{"id":"pro","label":"Pro $20/mo","unpublished":true},{"id":"max","label":"Max $100/mo","unpublished":true},{"id":"ultra","label":"Ultra $200/mo","unpublished":true}]},{"id":"gemini","logo":"assets/logos/gemini.png","name":"Gemini","unit":"messages","freeLabel":"Free tier with limits","paidLabel":"Google AI plans multiply limits 2x-4x","kind":"caps","unverified":"Paid plans raise limits 2x-4x (Google One, 22 Nov); exact free limits are not published. Treat as rough.","plans":[{"id":"free","label":"Free","unpublished":true},{"id":"aipro","label":"Google AI Pro","unpublished":true},{"id":"aiultra","label":"Google AI Ultra","unpublished":true}]},{"id":"grok","logo":"assets/logos/grok.png","name":"Grok","unit":"messages","freeLabel":"Free: limited chats, resets on its own schedule","paidLabel":"X Subscription $8-200/mo, shared weekly pool","kind":"caps","confidence":"Official (xAI FAQ, Nov 2026): paid plans share one weekly usage pool; the free tier has no published message count and resets on its own schedule. Reported, not official: pool sizes scale about 1x/4x/15x/50x by tier.","plans":[{"id":"free","label":"Free","unpublished":true},{"id":"plus","label":"Plus $8/mo","unpublished":true},{"id":"premium","label":"Premium $30/mo","unpublished":true},{"id":"super","label":"Super $100/mo","unpublished":true},{"id":"ultra","label":"Ultra $200/mo","unpublished":true}]},{"id":"town","logo":"assets/logos/town.png","name":"Town AI","unit":"messages","badge":"Msgs + credits","freeLabel":"Free: 30 messages a month","paidLabel":"Starter $15/mo · Pro $49/mo billed annually","kind":"credits","freeAllowance":30,"freeUnit":"messages","freePeriod":"month","perTask":{"small":[1,2],"medium":[2,4],"big":[4,8]},"creditPerTask":{"small":[5,12],"medium":[12,30],"big":[30,70]},"confidence":"Free plan verified on town.com (22 Nov): 30 chat messages a month. Paid plans include monthly credits (1,250+). Per-task rates are not published, so treat as rough.","plans":[{"id":"free","label":"Free","allowance":30,"unit":"messages","period":"month"},{"id":"starter","label":"Starter $15/mo","allowance":1250,"unit":"credits","period":"month"},{"id":"pro","label":"Pro $49/mo billed annually","allowance":5000,"unit":"credits","period":"month"},{"id":"power","label":"Power $99/mo billed annually","allowance":12000,"unit":"credits","period":"month"},{"id":"powerplus","label":"Power Plus $199/mo billed annually","allowance":40000,"unit":"credits","period":"month"}]},{"id":"manus","name":"Manus","unit":"credits","logo":"assets/logos/manus.png","freeLabel":"Free: 300 credits a day","paidLabel":"Pro from $20/mo","kind":"credits","freeAllowance":300,"freeUnit":"credits","freePeriod":"day","paidAllowance":4000,"paidUnit":"credits","paidPeriod":"month","perTask":{"small":[10,30],"medium":[30,80],"big":[80,200]},"perType":{"question":[10,30],"edit":[10,30],"feature":[30,80],"app":[80,200],"general":[10,80]},"confidence":"Free daily-refresh credits are limited to 1,500 credits of consumption per month and can only be used with Manus 2.0 lite. Actual credits depend on model tokens, virtual-machine work and external tools. Our task ranges are rough estimates, not Manus prices or a reading of your remaining balance.","plans":[{"id":"free","label":"Free","allowance":300,"unit":"credits","period":"day"},{"id":"pro","label":"Pro $20/mo","allowance":4000,"unit":"credits","period":"month","unpublished":true},{"id":"pro40","label":"Pro $40/mo","allowance":8000,"unit":"credits","period":"month","unpublished":true}]},{"id":"lovable","name":"Lovable","unit":"credits","logo":"assets/logos/lovable.png","freeLabel":"Free: 5 credits a day (max 30 a month)","paidLabel":"Pro $25/mo, 100 credits","kind":"credits","freeAllowance":5,"freeUnit":"credits","freePeriod":"day","paidAllowance":100,"paidUnit":"credits","paidPeriod":"month","perTask":{"small":[0.5,1],"medium":[1,2.5],"big":[2.5,5]},"perType":{"question":[0.5,1],"edit":[0.5,0.9],"feature":[0.9,1.7],"app":[1.7,4],"general":[0.5,1.7]},"confidence":"Based on Lovable’s published per-prompt costs: a small tweak is about 0.5 credits, a feature 0.9–1.7, a landing page 1.7 (lovable.dev, 22 Nov).","plans":[{"id":"free","label":"Free","allowance":5,"unit":"credits","period":"day","allowText":"5 credits a day, max 30 a month"},{"id":"pro","label":"Pro $25/mo","allowance":100,"unit":"credits","period":"month"}]},{"id":"bolt","logo":"assets/logos/bolt.png","name":"Bolt","unit":"tokens","freeLabel":"Free: ~300K tokens a day, 1M a month","paidLabel":"Pro $25/mo from 10M tokens","kind":"credits","freeAllowance":300000,"freeUnit":"tokens","freePeriod":"day","paidAllowance":10000000,"paidUnit":"tokens","paidPeriod":"month","perTask":{"small":[50000,150000],"medium":[150000,400000],"big":[400000,1000000]},"perType":{"question":[20000,60000],"edit":[50000,150000],"feature":[150000,400000],"app":[400000,1000000],"general":[50000,300000]},"confidence":"Bolt publishes its allowances (300K tokens a day free) but not per-task costs, so treat as rough.","plans":[{"id":"free","label":"Free","allowance":300000,"unit":"tokens","period":"day","allowText":"300K tokens a day, 1M a month"},{"id":"pro","label":"Pro $25/mo","allowance":10000000,"unit":"tokens","period":"month"}]},{"id":"replit","logo":"assets/logos/replit.png","name":"Replit","unit":"dollars","badge":"Credits ($)","freeLabel":"Trial usage credit","paidLabel":"Core $20/mo, $20 usage credit","kind":"credits","paidAllowance":20,"paidUnit":"dollars","paidPeriod":"month","perTask":{"small":[0.1,0.5],"medium":[0.5,2],"big":[2,8]},"perType":{"question":[0.05,0.25],"edit":[0.1,0.5],"feature":[0.5,2],"app":[2,8],"general":[0.1,2]},"confidence":"Replit charges in credits worth $1 each, priced by the effort the Agent spends (replit.com, 22 Nov). No per-task rates are published, so treat as rough.","plans":[{"id":"free","label":"Free"},{"id":"core","label":"Core $20/mo","allowance":20,"unit":"dollars","period":"month"},{"id":"pro","label":"Pro $100/mo","allowance":100,"unit":"dollars","period":"month"}]}];const API_PLATFORMS = [
  {
    "id": "openai_api",
    "name": "OpenAI API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 2.0,
    "outRate": 10.0,
    "modelNote": "priced as GPT-6 Sol",
    "confidence": "GPT-6 Sol rates (developers.openai.com pricing, 25 Nov). GPT-6 Luna is cheaper at $0.10/$0.50."
  },
  {
    "id": "anthropic_api",
    "name": "Anthropic API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 2.0,
    "outRate": 10.0,
    "modelNote": "priced as Claude Sonnet 5.5",
    "confidence": "Claude Sonnet 5.5 rates (platform.claude.com pricing, 25 Nov). Haiku 5.5 is cheaper at $0.10/$0.50."
  },
  {
    "id": "gemini_api",
    "name": "Gemini API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 1.5,
    "outRate": 7.5,
    "modelNote": "priced as Gemini 3.1 Flash",
    "confidence": "Gemini 3.1 Flash rates (ai.google.dev/gemini-api pricing, 25 Nov). Pro is $2/$10 until 30 Nov."
  },
  {
    "id": "deepseek",
    "name": "DeepSeek API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.3,
    "outRate": 1.2,
    "modelNote": "priced as deepseek-flash, peak",
    "confidence": "deepseek-flash peak rates, cache miss (api-docs.deepseek.com, 25 Nov). Off-peak is half."
  },
  {
    "id": "xai_api",
    "name": "xAI API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 2.0,
    "outRate": 6.0,
    "modelNote": "priced as grok-4.7",
    "confidence": "grok-4.7 short-context rates (docs.x.ai pricing, 25 Nov). Long context over 200k is double."
  },
  {
    "id": "mistral",
    "name": "Mistral API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.7,
    "outRate": 2.1,
    "modelNote": "priced as Mistral Large 4",
    "confidence": "Mistral Large 4 rates (docs.mistral.ai pricing, 25 Nov). Small 4 is $0.15/$0.60."
  },
  {
    "id": "groq",
    "name": "Groq",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.15,
    "outRate": 0.6,
    "modelNote": "priced as gpt-oss-120b",
    "confidence": "gpt-oss-120b rates (console.groq.com/docs/models, 25 Nov). gpt-oss-20b is $0.075/$0.30."
  },
  {
    "id": "together",
    "name": "Together AI",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.15,
    "outRate": 0.47,
    "modelNote": "priced as Qwen3.8 Flash",
    "confidence": "Qwen3.8 Flash rates (together.ai/pricing, 25 Nov). Other hosts and models vary."
  },
  {
    "id": "fireworks",
    "name": "Fireworks AI",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.15,
    "outRate": 0.5,
    "modelNote": "priced as GLM 5.3 Flash",
    "confidence": "GLM 5.3 Flash rates (fireworks.ai/pricing, 25 Nov). Other hosts and models vary."
  },
  {
    "id": "openrouter",
    "name": "OpenRouter",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.1,
    "outRate": 0.32,
    "modelNote": "priced as Llama 3.3 70B, cheapest host",
    "confidence": "Llama 3.3 70B from $0.10/$0.32 (openrouter.ai model page, 25 Nov). Price varies by model and host."
  },
  {
    "id": "qwen",
    "name": "Qwen API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 1.6,
    "outRate": 6.4,
    "modelNote": "priced as qwen-max, international",
    "confidence": "qwen-max international rates (alibabacloud.com Model Studio pricing, 25 Nov). China region is cheaper."
  },
  {
    "id": "zhipu",
    "name": "Zhipu GLM API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 1.4,
    "outRate": 4.4,
    "modelNote": "priced as GLM-5.3",
    "confidence": "GLM-5.3 rates (docs.z.ai pricing, 25 Nov). GLM-5.3-Flash is $0.15/$0.50."
  },
  {
    "id": "moonshot",
    "name": "Moonshot Kimi API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 2.0,
    "outRate": 10.0,
    "modelNote": "priced as kimi-k3.1-pro",
    "confidence": "kimi-k3.1-pro rates (platform.moonshot.ai pricing, 25 Nov). Batch API is 60% of standard."
  },
  {
    "id": "cohere",
    "name": "Cohere API",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 2.5,
    "outRate": 10.0,
    "modelNote": "priced as Command A",
    "confidence": "Command A rates (cohere.com pricing via openrouter.ai/cohere/command-a, 25 Nov)."
  },
  {
    "id": "ollama",
    "name": "Ollama (local)",
    "kind": "tokens",
    "plans": [{"id": "api", "label": "Pay per use"}],
    "inRate": 0.0,
    "outRate": 0.0,
    "modelNote": "local model, no per-token charge",
    "confidence": "Ollama runs models on your own machine: no token bill, only your hardware."
  }
];
PLATFORMS.push.apply(PLATFORMS, API_PLATFORMS);
PLATFORMS.push.apply(PLATFORMS, [{"id": "kimi", "name": "Kimi", "unit": "messages", "freeLabel": "Free: limited use", "paidLabel": "Plus, Pro, Max and Ultra plans", "kind": "caps", "unverified": "Kimi lists Plus, Pro, Max and Ultra plans (kimi.com membership). Message counts are not published. Treat as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}, {"id": "plus", "label": "Plus", "unpublished": true}, {"id": "pro", "label": "Pro", "unpublished": true}, {"id": "max", "label": "Max", "unpublished": true}, {"id": "ultra", "label": "Ultra", "unpublished": true}]}, {"id": "qwen_chat", "name": "Qwen Chat", "unit": "messages", "freeLabel": "Free: daily caps, sizes not published", "paidLabel": "Paid plans exist", "kind": "caps", "unverified": "Qwen Chat is free with daily caps by chat, model and feature. Sizes are not published. Treat as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}]}, {"id": "v0", "name": "v0", "unit": "messages", "freeLabel": "Free: 7 messages a day", "paidLabel": "Plus $30/user/mo with $30 credits", "kind": "caps", "unverified": "v0 Free has a 7 message a day limit and Plus includes $30 of monthly credits (v0.app/pricing). Credit cost per prompt varies. Treat as rough.", "plans": [{"id": "free", "label": "Free (7 messages a day)", "unpublished": true}, {"id": "plus", "label": "Plus $30/user/mo", "unpublished": true}]}, {"id": "elevenlabs", "name": "ElevenLabs", "unit": "credits", "freeLabel": "Free: 10,000 credits a month", "paidLabel": "Starter, Creator and higher plans", "kind": "caps", "unverified": "On standard voice models 1 credit is about 1 character of text (ElevenLabs). Cost varies by model and feature, so treat as rough.", "plans": [{"id": "free", "label": "Free (10,000 credits/mo)", "unpublished": true}, {"id": "starter", "label": "Starter", "unpublished": true}, {"id": "creator", "label": "Creator $22/mo", "unpublished": true}]}, {"id": "suno", "name": "Suno", "unit": "credits", "freeLabel": "Free: 50 credits renew each day", "paidLabel": "Pro 2,500 and Premier 10,000 credits a month", "kind": "caps", "unverified": "Suno gives 50 credits a day free, 2,500 a month on Pro and 10,000 on Premier (help.suno.com). Credits per song depend on the model. Treat as rough.", "plans": [{"id": "free", "label": "Free (50 credits/day)", "unpublished": true}, {"id": "pro", "label": "Pro (2,500/mo)", "unpublished": true}, {"id": "premier", "label": "Premier (10,000/mo)", "unpublished": true}]}, {"id": "runway", "name": "Runway", "unit": "credits", "freeLabel": "Free: 125 credits one time", "paidLabel": "Standard $12-15/mo, 625 credits", "kind": "caps", "unverified": "Runway Free gives 125 credits once and Standard 625 credits a month (runway.com/pricing). Cost varies by model and length. Treat as rough.", "plans": [{"id": "free", "label": "Free (125 credits once)", "unpublished": true}, {"id": "std", "label": "Standard (625/mo)", "unpublished": true}]}, {"id": "pika", "name": "Pika", "unit": "credits", "freeLabel": "Free: buy credit packs, no monthly allowance", "paidLabel": "Starter $10/mo, 600 credits", "kind": "caps", "unverified": "Pika lists about 122 credits for a 5 second 720p video and 7 for an image on some models (pika.art/pricing). Cost varies. Treat as rough.", "plans": [{"id": "free", "label": "Free (credit packs)", "unpublished": true}, {"id": "starter", "label": "Starter $10/mo (600)", "unpublished": true}]}]);
PLATFORMS.push.apply(PLATFORMS, [{"id": "le_chat", "name": "Le Chat", "unit": "messages", "freeLabel": "Free: limited messages and web searches", "paidLabel": "Pro $14.99/mo, up to about 6x Free's messages", "kind": "caps", "unverified": "Mistral lists Free with limited messages and web searches, and Pro at $14.99 a month with more usage (mistral.ai/pricing). Message counts are not published. Treat as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}, {"id": "pro", "label": "Pro $14.99/mo", "unpublished": true}]}, {"id": "perplexity", "name": "Perplexity", "unit": "messages", "freeLabel": "Free: limited daily use", "paidLabel": "Pro $17/mo billed yearly", "kind": "caps", "unverified": "Perplexity lists Free for limited daily use and Pro at $17 a month billed yearly (perplexity.ai/hub/pricing). Exact search counts are not published. Treat as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}, {"id": "pro", "label": "Pro $17/mo (yearly)", "unpublished": true}]}, {"id": "zai_chat", "name": "Z.ai chat", "unit": "messages", "freeLabel": "Free: works without an account", "paidLabel": "API and coding plans are separate", "kind": "caps", "unverified": "The Z.ai chat app is free and the page lists no message cap (chat.z.ai). Treat any estimate as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}]}, {"id": "character_ai", "name": "Character.ai", "unit": "messages", "freeLabel": "Free: messaging is free and unlimited", "paidLabel": "c.ai lite and c.ai+ add premium features", "kind": "caps", "unverified": "Character.ai says messaging is free and unlimited, with c.ai lite and c.ai+ adding premium chat styles and memory (character.ai/subscribe). Treat as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}, {"id": "lite", "label": "c.ai lite", "unpublished": true}, {"id": "plus", "label": "c.ai+", "unpublished": true}]}, {"id": "higgsfield", "name": "Higgsfield", "unit": "credits", "freeLabel": "Free: limited models, no monthly credits", "paidLabel": "Paid plans add monthly credits", "kind": "caps", "unverified": "Higgsfield's free plan has no monthly credits and opens a limited set of models. Paid plans add monthly credits, and cost per generation varies by model, length and resolution (higgsfield.ai help centre). Published plan sizes disagree between sources, so no numbers are shown. Treat as rough.", "plans": [{"id": "free", "label": "Free", "unpublished": true}, {"id": "paid", "label": "Paid plan", "unpublished": true}]}]);

const API_OUTPUT_TOKENS = { small: [50, 300], medium: [300, 1500], big: [1500, 6000] };
function money(x) { if (x < 0.001) return '$' + x.toFixed(4); if (x < 0.1) return '$' + x.toFixed(3); return '$' + x.toFixed(2); }
function computeApiEstimate(platform, size, inputTokens) {
  if (!platform.inRate && !platform.outRate) {
    return { rangeText: '$0 per call', subText: platform.modelNote, pct: null, verdict: 'fits', verdictText: 'Free, runs on your own machine.' };
  }
  var o = API_OUTPUT_TOKENS[size] || API_OUTPUT_TOKENS.medium;
  var low = inputTokens * platform.inRate / 1000000 + o[0] * platform.outRate / 1000000;
  var high = inputTokens * platform.inRate / 1000000 + o[1] * platform.outRate / 1000000;
  var notable = high >= 0.05;
  return {
    rangeText: money(low) + '\u2013' + money(high) + ' per call',
    subText: platform.modelNote + ', plus ' + fmt(o[0]) + '\u2013' + fmt(o[1]) + ' output tokens',
    pct: null,
    verdict: notable ? 'tight' : 'fits',
    verdictText: notable ? 'Notable per-call cost. A shorter prompt cuts the input side.' : 'Cheap per call.'
  };
}

const SIZES = {
  small: 'A single task or question',
  medium: 'A small project or feature',
  big: 'A big build, many steps',
};

/* Rough window-message estimates for cap-based platforms (no published caps). */
const CAP_ESTIMATES = { small: [1, 2], medium: [2, 5], big: [5, 12] };
const CAP_PER_TYPE = { question: [1, 2], edit: [1, 2], feature: [2, 5], app: [5, 12], general: [1, 3] };

function meterBadge(platform) {
  return platform.badge || { credits: 'Credits', tokens: 'Tokens', messages: 'Messages', dollars: 'Credits ($)' }[platform.unit] || 'Credits';
}

function estimateTokens(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.round(words * 1.3);
}

function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
  if (n >= 1000) return Math.round(n / 1000) + 'K';
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function unitLabel(platform) {
  return { credits: 'credits', tokens: 'tokens', dollars: 'dollars', messages: 'messages' }[platform.unit];
}

/* Task-type detection: refines the range and tells the user what it heard. */
const TASK_TYPES = [
  { key: 'question', label: 'a question or explanation', re: /^(what|how|why|when|where|who|explain|summari[sz]e|write|draft|is |are |can |does|do )\b|\?\s*$/i },
  { key: 'edit', label: 'a small edit', re: /\b(fix|change|update|remove|rename|tweak|adjust|move|make the)\b/i },
  { key: 'app', label: 'a full build', re: /\b(app|website|marketplace|platform|dashboard|clone|system)\b/i },
  { key: 'feature', label: 'a feature or page', re: /\b(auth|login|sign ?up|form|page|section|component|table|checkout|search|filter|landing)\b/i },
];
function detectTaskType(text) {
  const t = (text || '').trim();
  if (!t) return null;
  for (const tt of TASK_TYPES) if (tt.re.test(t)) return tt;
  return { key: 'general', label: 'a general task' };
}

/* Personal sharpening (on-device only): after 3+ logs for a platform, scale ranges
   by the average actual/estimated ratio, clamped so one odd log can't swing it. */
function personalFactor(platformId) {
  const logs = PE_CALS().filter((c) => (c.platform === platformId || PLATFORMS.some(p => p.id === platformId && p.name === c.platform))).slice(-10);
  if (logs.length < 3) return 1;
  const ratios = logs.map((c) => {
    const m = c.predicted.match(/\$?([\d.]+)([KM]?)[–-]\$?([\d.]+)([KM]?)/i);
    if (!m) return null;
    const scale = x => ({K:1000,M:1000000}[x.toUpperCase()] || 1);
    const mid = (parseFloat(m[1])*scale(m[2]) + parseFloat(m[3])*scale(m[4])) / 2;
    return mid > 0 ? c.actual / mid : null;
  }).filter((r) => r !== null && isFinite(r) && r > 0);
  if (ratios.length < 3) return 1;
  const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  return Math.min(2, Math.max(0.5, avg));
}

function computeEstimate(platform, size, plan, typeKey, inputTokens) {
  if (platform.kind === 'tokens') return computeApiEstimate(platform, size, inputTokens || estimateTokens(''));
  const planLabel = plan ? plan.label : 'Free';
  if (platform.kind === 'caps') {
    const [lo, hi] = (typeKey && CAP_PER_TYPE[typeKey]) ? CAP_PER_TYPE[typeKey] : CAP_ESTIMATES[size];
    return {
      rangeText: `${lo}–${hi} messages`,
      subText: `on ${planLabel}. Windows are not published, so no exact percentage is possible.`,
      pct: null,
      verdict: size === 'big' ? 'tight' : 'fits',
      verdictText: size === 'big'
        ? 'Big builds can hit a message window fast. Split it into steps.'
        : 'Should fit in a normal window.',
    };
  }
  const useCredits = plan && plan.unit === 'credits' && platform.creditPerTask;
  let [lo, hi] = useCredits
    ? platform.creditPerTask[size]
    : ((typeKey && platform.perType && platform.perType[typeKey]) ? platform.perType[typeKey] : platform.perTask[size]);
  const factor = personalFactor(platform.id);
  if (factor !== 1) { lo = Math.round(lo * factor * 10) / 10; hi = Math.round(hi * factor * 10) / 10; }
  const rangeUnit = (plan && plan.unit) || platform.unit;
  const allowance = plan && plan.allowance;
  const period = plan && plan.period;
  let pctLo = null, pctHi = null, verdict = 'fits', verdictText = 'Fits comfortably.';
  if (allowance) {
    pctLo = (lo / allowance) * 100;
    pctHi = (hi / allowance) * 100;
    const worst = pctHi;
    const unitNoun = rangeUnit === 'messages' ? 'messages' : rangeUnit;
    if (worst >= 100) { verdict = 'over'; verdictText = `Likely blows your ${unitNoun} for the ${period} on ${planLabel}.`; }
    else if (worst >= 50) { verdict = 'tight'; verdictText = `Tight: up to about ${Math.round(worst)}% of your ${period}’s allowance.`; }
    else { verdict = 'fits'; verdictText = `Fits: about ${Math.max(1, Math.round(pctLo))}–${Math.max(1, Math.round(pctHi))}% of your ${period}’s allowance.`; }
  }
  const money = rangeUnit === 'dollars';
  const rangeText = money ? `$${lo.toFixed(2)}–$${hi.toFixed(2)}` : `${fmt(lo)}–${fmt(hi)} ${rangeUnit === 'messages' ? 'messages' : rangeUnit}`;
  const subText = allowance
    ? `against ${allowance >= 1000000 ? fmt(allowance) : allowance.toLocaleString('en-US')} ${rangeUnit === 'messages' ? 'messages' : rangeUnit} on ${planLabel} each ${period}`
    : `on ${planLabel}`;
  return { rangeText, subText, pct: pctHi ? Math.min(100, pctHi) : null, verdict, verdictText };
}

/* ---------- Prompt optimiser ---------- */
const FILLER_PHRASES = [
  /\bcan you please\b/gi, /\bcould you please\b/gi, /\bwould you please\b/gi,
  /\bplease could you\b/gi, /\bcan you\b/gi, /\bcould you\b/gi, /\bwould you\b/gi,
  /\bi would like you to\b/gi, /\bi want you to\b/gi, /\bi need you to\b/gi,
  /\bi was wondering if you could\b/gi, /\bif you don'?t mind\b/gi,
  /\bif that makes sense\b/gi, /\bthank you( very much)?\b/gi, /\bthanks in advance\b/gi,
  /\bkindly\b/gi, /\bbasically\b/gi, /\bactually\b/gi, /\breally\b/gi, /\bvery\b/gi,
  /\bjust\b/gi, /\bquite\b/gi, /\bsimply\b/gi,
];

function optimisePrompt(text) {
  // Only remove leading politeness, never phrases inside task instructions or quotes.
  let out = text.trim().replace(/^(?:(?:can|could|would) you (?:please )?|please (?:could you )?|i would like you to |i want you to |i need you to )/i, '');
  if (out.length && /^[a-z]/.test(out)) out = out[0].toUpperCase() + out.slice(1);
  return out;
}
/* ---------- Cheapest free fit: rough cross-platform guide ---------- */
function cheapestFreeFit(size, typeKey) {
  var best = null;
  PLATFORMS.forEach(function (p) {
    if (p.kind !== 'credits' || !p.freeAllowance) return;
    var r = (p.perType && typeKey && p.perType[typeKey]) || (p.perTask && p.perTask[size]);
    if (!r || r[0] + r[1] <= 0) return;
    var mid = (r[0] + r[1]) / 2;
    var headroom = p.freeAllowance / mid;
    if (!best || headroom > best.headroom) {
      best = { platform: p, headroom: headroom, rangeText: fmt(r[0]) + '\u2013' + fmt(r[1]) + ' ' + p.freeUnit };
    }
  });
  return best;
}

module.exports = { PLATFORMS, estimateTokens, detectTaskType, computeEstimate, money };
