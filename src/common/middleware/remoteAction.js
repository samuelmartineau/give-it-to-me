export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', Object.assign({}, action));
  }
  return next(action);
}
