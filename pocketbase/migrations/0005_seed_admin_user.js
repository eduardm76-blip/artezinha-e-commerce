migrate(
  (app) => {
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'eduardm76@hotmail.com')
      return
    } catch (_) {}

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const record = new Record(users)
    record.setEmail('eduardm76@hotmail.com')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Admin ArteZinha')
    record.set('role', 'sublimator')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'eduardm76@hotmail.com')
      app.delete(record)
    } catch (_) {}
  },
)
