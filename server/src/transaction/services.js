const getTransactions =
  (db) =>
  async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const transactions = await db.allAsync(
      `
    SELECT t.*
    FROM transactions AS t
    ORDER BY t.createdAt DESC
    LIMIT $limit OFFSET $offset
  `,
      {
        $limit: limit,
        $offset: offset,
      },
    );

    const totalCount = await db.getAsync(`
    SELECT COUNT(*) as count 
    FROM transactions AS t
  `);

    return {
      transactions,
      pagination: {
        page,
        limit,
        total: totalCount.count,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  };

export const transactionServices = (db) => ({
  getTransactions: getTransactions(db),
});
