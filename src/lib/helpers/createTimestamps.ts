function createTimestamps(...entities: string[]) {
  const now = new Date().toISOString();
  return Object.fromEntries(
    entities.flatMap((type) => [
      [`createdAt${type}`, now],
      [`updatedAt${type}`, now],
    ]),
  );
}
export default createTimestamps;
