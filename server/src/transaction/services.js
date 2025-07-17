const getTransactions =
  (db) =>
  async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const transactions = await db.allAsync(
      `
    SELECT t.*,
           CASE 
             WHEN t.bottleId IS NOT NULL THEN b.wineId
             WHEN t.favoriteId IS NOT NULL THEN f.wineId
             ELSE t.wineId
           END as relatedWineId
    FROM transactions AS t
    LEFT JOIN bottles b ON t.bottleId = b.id
    LEFT JOIN favorites f ON t.favoriteId = f.id
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
