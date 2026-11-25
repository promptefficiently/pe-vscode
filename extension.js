const vscode=require('vscode');const core=require('./core');
function activate(ctx){
 const out=vscode.window.createOutputChannel('Prompt Efficiently');ctx.subscriptions.push(out);
 const reg=(name,fn)=>ctx.subscriptions.push(vscode.commands.registerCommand('pe.'+name,async()=>{try{await fn();}catch(e){if(e.status===401)await ctx.secrets.delete('pe.session');vscode.window.showErrorMessage('PE: '+e.message);}}));
 const token=()=>ctx.secrets.get('pe.session');
 reg('signIn',async()=>{
  const email=await vscode.window.showInputBox({title:'PE sign-in',prompt:'Your PE email. A code will be emailed to you.',ignoreFocusOut:true});if(!email)return;
  await core.api('/api/send-code',null,{email});
  const code=await vscode.window.showInputBox({title:'PE email code',prompt:'Enter your six-digit code',password:true,ignoreFocusOut:true,validateInput:s=>/^\d{6}$/.test(s)?null:'Enter six digits'});if(!code)return;
  const result=await core.api('/api/verify-code',null,{email,code});if(!result.ok||!result.token)throw new Error('Sign-in could not be verified.');
  await ctx.secrets.store('pe.session',result.token);vscode.window.showInformationMessage('Signed in to PE.');
 });
 async function prompt(kind){
  let text='';const ed=vscode.window.activeTextEditor;if(ed&&!ed.selection.isEmpty)text=ed.document.getText(ed.selection);
  if(!text)text=await vscode.window.showInputBox({title:'PE: '+kind,prompt:'Paste the prompt to check. It stays on this device.',ignoreFocusOut:true});if(!text)return;
  const result=await core.run(text,await token(),kind);
  out.clear();out.appendLine('PROMPT EFFICIENTLY\n');out.appendLine('Rough input tokens: '+result.input.roughInputTokens);out.appendLine('Words: '+result.input.words);out.appendLine(result.input.note);out.appendLine('\nPlan: '+result.plan+(result.remaining===null?'':' | Free uses remaining: '+result.remaining));
  if(result.suggestion!==undefined){out.appendLine('\nSUGGESTION FOR REVIEW\n'+result.suggestion+'\n\n'+result.review);}
  const cats=core.catalog;
  const pick=await vscode.window.showQuickPick(cats.PLATFORMS.map(p=>({label:p.name,description:p.kind==='tokens'?'Pay per use':p.plans.map(q=>q.label).join(' / '),id:p.id})),{title:'PE: which AI tool are you sending this to?',placeHolder:'Local maths only - nothing is sent anywhere',ignoreFocusOut:true});
  if(pick){
   const sizePick=await vscode.window.showQuickPick([{label:'small',description:'a single task or question'},{label:'medium',description:'a small project or feature'},{label:'big',description:'a big build, many steps'}],{title:'PE: how big is the work?',ignoreFocusOut:true});
   if(sizePick){
    const platform=cats.PLATFORMS.find(p=>p.id===pick.id);const plan=platform.kind==='tokens'?null:platform.plans[0];
    const est=cats.computeEstimate(platform,sizePick.label,plan,cats.detectTaskType(text),cats.estimateTokens(text));
    out.appendLine('\n'+platform.name+(platform.kind==='tokens'?' (pay per use)':' on '+plan.label)+': '+est.rangeText);
    if(est.subText)out.appendLine(est.subText);if(est.verdictText)out.appendLine(est.verdictText);
    if(platform.confidence)out.appendLine(platform.confidence);out.appendLine(core.DISCLAIMER);
   }
  }
  out.show(true);
 }
 reg('estimate',()=>prompt('estimate'));reg('tighten',()=>prompt('tighten'));
 reg('status',async()=>{const t=await token();if(!t)throw new Error('Sign in first.');const s=await core.api('/api/billing/status',t);out.clear();out.appendLine('PE account status\n'+JSON.stringify(s,null,2));out.show(true);});
 reg('upgrade',()=>vscode.env.openExternal(vscode.Uri.parse(core.ORIGIN+'/app')));
 reg('signOut',async()=>{const t=await token();if(t)await core.api('/api/signout',t,{});await ctx.secrets.delete('pe.session');vscode.window.showInformationMessage('Signed out of PE.');});
}
module.exports={activate,deactivate(){}};
