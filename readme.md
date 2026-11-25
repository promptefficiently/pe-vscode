# Prompt Efficiently for VS Code

Run explicit commands on a selected or pasted prompt. PE does not read your whole workspace, intercept chats or submit prompts to an AI.

## Install
Install the supplied `.vsix` using Extensions > ... > Install from VSIX. Open the Command Palette and run **PE: Sign in**, then enter the emailed code. PE account required for Free and Pro.

Select text and run **PE: Estimate selected or pasted prompt** or **PE: Tighten selected or pasted prompt**. No selection opens a paste box. Suggestions appear in the output panel for review and never overwrite your editor. Use **PE: Open account and Pro upgrade** for billing on the PE website. Website sign-in is separate. No card entry inside the extension.

Tokens are stored in VS Code SecretStorage, not workspace settings. Only email/code, session and usage IDs go to promptefficiently.com. Prompt text stays local. Quota checks fail closed, five free checks/day or the server-confirmed Pro plan. A request can consume one check even if connection drops after the server accepts it. Retry safety is enforced for the same request ID, but a new command creates a new check.

## Estimate limits
Rough input tokens use the existing PE word-based approximation, not a model tokenizer. They exclude chat history, files, repository context, tool calls and output. No provider credit price, full agent-run cost or exact quota is claimed. Tightening removes a leading polite phrase only. Review meaning before use.


Licence: MIT (see LICENSE). Sign-in, rewrites and billing run on Prompt Efficiently servers and are not part of this repository. Not affiliated with the AI products it supports.
