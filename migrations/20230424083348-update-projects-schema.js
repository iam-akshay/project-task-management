module.exports = {
  async up(db) {
    await db.collection('projects').updateMany({}, { $set: { settings: { is_active: true } } });
  },

  async down(db) {
    await db.collection('projects').updateMany({}, { $unset: {} });
  }
};
