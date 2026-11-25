const crypto = require('node:crypto');
const ORIGIN = 'https://promptefficiently.com';
const catalog = require('./estimator-node');
function estimate(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return {words, roughInputTokens: Math.round(words * 1.3), note:'Rough input tokens only. Not model-tokenized. Excludes repository context, output, tool calls and subscription credits. Not a bill or a remaining-balance reading.'};
}
function tighten(text) {
  const out = text.trim().replace(/^(?:(?:can|could|would) you (?:please )?|please (?:could you )?|i would like you to |i want you to |i need you to )/i, '');
  return out && /^[a-z]/.test(out) ? out[0].toUpperCase()+out.slice(1) : out;
}
async function api(path, token, data, transport=fetch) {
 const res=await transport(ORIGIN+path,{method:data===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(data===undefined?{}:{body:JSON.stringify(data)}),signal:AbortSignal.timeout(20000),redirect:'error'});
 if(!res.ok){const err=new Error(({401:'Sign in required or session expired.',429:'Five free estimates used today. Open your PE account to upgrade.',503:'PE is temporarily unavailable. No estimate was granted.'})[res.status]||'PE request failed ('+res.status+').');err.status=res.status;throw err;}
 return res.json();
}
async function run(text,token,kind='estimate',transport=fetch,requestId=crypto.randomUUID()) {
 if(!text.trim())throw new Error('Enter or select a prompt.');
 if(!token)throw new Error('Sign in to PE first.');
 const quota=await api('/api/usage',token,{requestId},transport);
 if(typeof quota.pro!=='boolean')throw new Error('Unrecognized quota response. No estimate was granted.');
 return {input:estimate(text),...(kind==='tighten'?{suggestion:tighten(text),review:'Review the suggestion before using it. PE never sends it to your AI or replaces your selection automatically.'}:{}),plan:quota.pro?'Pro':'Free',remaining:quota.remaining};
}
module.exports={ORIGIN,estimate,tighten,api,run,catalog};
