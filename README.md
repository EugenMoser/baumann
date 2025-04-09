# Automatic Deletion of Documents in MongoDB

## Using TTL Indexes for Expiring Data

MongoDB provides a built-in mechanism to automatically delete documents after a certain period using **TTL (Time-To-Live) indexes**.

### Creating a TTL Index

If your documents contain an expiration timestamp (e.g., `expiresAt`), you can create a TTL index to automatically remove expired records:

```sh
db.password_reset.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

### How It Works

- The `expiresAt` field must be of type `Date`.
- The index ensures that documents are deleted as soon as their `expiresAt` timestamp is reached.
- `expireAfterSeconds: 0` means the document is removed exactly at the given `expiresAt` time.

### Verifying the Index

To check if the TTL index was successfully created, run:

```sh
db.password_reset.getIndexes()
```

This should display an entry with `expireAfterSeconds: 0`.

### Ensuring `expiresAt` Is a `Date` Type

Verify that your documents store `expiresAt` as an ISODate:

```sh
db.password_reset.find({}, { expiresAt: 1 }).limit(5)
```

If necessary, convert it:

```sh
db.password_reset.updateMany(
  {},
  [{ $set: { expiresAt: { $toDate: "$expiresAt" } } }]
)
```

### Conclusion

TTL indexes provide an efficient way to automatically remove expired documents without requiring manual cleanup or cron jobs.
