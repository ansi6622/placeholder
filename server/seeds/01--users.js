
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({email: 'usersowe33ne@example.com', name: 'Dwayne Johnson', password_hash: "EncryptPasswordNote"})

  );
};
