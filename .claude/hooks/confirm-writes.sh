#!/usr/bin/env bash
# PreToolUse hook (Bash): asks for confirmation before any command that changes
# something in Sender.net (campaigns, schedules, subscribers, groups, forms...)
# or in Google Forms/Drive, so no email is sent and no form is changed by
# mistake. Read-only commands (GET, dry runs) go through without asking.

command=$(jq -r '.tool_input.command // empty')
writes='(-X|--request)[ =]*"?(POST|PUT|PATCH|DELETE)|method[^a-zA-Z]{0,5}(POST|PUT|PATCH|DELETE)|"(POST|PUT|PATCH|DELETE)"|--data|--json|-d |-F |data='

reason=""
if grep -qE '(emails:schedule|schedule\.mjs).*--apply' <<<"$command"; then
  reason="Crea o programa campañas en Sender.net"
elif grep -qi 'sender\.net' <<<"$command" && grep -qE "$writes" <<<"$command"; then
  reason="Cambia algo en Sender.net (campañas, envíos, suscriptores, grupos...)"
elif grep -qE '(forms:api|forms/api\.mjs).*update' <<<"$command"; then
  reason="Cambia un formulario de Google Forms"
elif grep -qi 'googleapis\.com' <<<"$command" && grep -qE "batchUpdate|$writes" <<<"$command"; then
  reason="Cambia algo en Google Forms o Google Drive"
fi

if [ -n "$reason" ]; then
  jq -n --arg reason "$reason" '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "ask", permissionDecisionReason: $reason}}'
fi
exit 0
