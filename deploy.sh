sshpass -p $SSH_PASSWORD rsync -avz client/dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_CLIENT_PATH"
sshpass -p $SSH_PASSWORD rsync -avz server/src/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_SERVER_PATH/src"
sshpass -p $SSH_PASSWORD rsync -avz server/package.json "$REMOTE_USER@$REMOTE_HOST:$REMOTE_SERVER_PATH"
ssh "$REMOTE_USER@$REMOTE_HOST" 'pm2 restart cave'
