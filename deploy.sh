#!/usr/bin/env bash
# Deploys the built client and the server to the VPS.
# Expects SSH_PASSWORD, REMOTE_USER, REMOTE_HOST, REMOTE_CLIENT_PATH and
# REMOTE_SERVER_PATH in the environment (see the deploy job in ci.yaml).
set -euo pipefail

REMOTE="$REMOTE_USER@$REMOTE_HOST"

remote_rsync() {
  sshpass -p "$SSH_PASSWORD" rsync -avz "$@"
}

remote_ssh() {
  sshpass -p "$SSH_PASSWORD" ssh "$REMOTE" "$@"
}

remote_rsync client/dist/ "$REMOTE:$REMOTE_CLIENT_PATH"
remote_rsync server/src/ "$REMOTE:$REMOTE_SERVER_PATH/src"
remote_rsync server/package.json server/package-lock.json "$REMOTE:$REMOTE_SERVER_PATH/"
remote_rsync config "$REMOTE:$REMOTE_SERVER_PATH/.."

# Non-interactive SSH sessions don't read ~/.bashrc, so load nvm explicitly
# to get the Node 26, npm and pm2 installed through it.
remote_ssh bash -s -- "$REMOTE_SERVER_PATH" <<'REMOTE_SCRIPT'
set -eo pipefail
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh" # nvm.sh is not compatible with `set -u`
cd "$1"
npm ci --omit=dev
if ! pm2 describe cave > /dev/null 2>&1; then
  echo "pm2 process 'cave' not found: start it once on the server with its GITM_* env variables" >&2
  exit 1
fi
pm2 restart cave
REMOTE_SCRIPT
