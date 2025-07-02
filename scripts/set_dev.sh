SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export GITM_FILE_DIRECTORY=$SCRIPT_DIR/../files
export GITM_DB_FILE=$SCRIPT_DIR/../'db_v1.db'
export GITM_SERVER_PORT=4000
