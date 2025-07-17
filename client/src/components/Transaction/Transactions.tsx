import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTransactions } from '@/api';
import { Button } from '../Toolkit';

const TransactionsContainer = styled.div`
  margin: 2rem 1rem;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TransactionList = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const TransactionKind = styled.span`
  font-weight: bold;
  color: #333;
`;

const TransactionType = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const TransactionDate = styled.span`
  font-size: 0.85em;
  color: #888;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

const PageInfo = styled.span`
  font-size: 0.9em;
  color: #666;
`;

interface Transaction {
  id: number;
  type: string;
  createdAt: string;
  wineId?: number;
  bottleId?: number;
  wineFamilyId?: number;
  favoriteId?: number;
  relatedWineId?: number;
}

interface TransactionResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function getLabel(transaction: Transaction) {
  if (transaction.wineId !== null) return 'Vin';
  if (transaction.bottleId !== null) return 'Bouteille';
  if (transaction.favoriteId !== null) return 'Favori';
  if (transaction.wineFamilyId !== null) return 'Appellation';
}

function getAction(transaction: Transaction) {
  if (transaction.type === 'DELETED') return 'supprimé';
  if (transaction.type === 'ADDED') return 'ajouté';
}

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response: TransactionResponse = await getTransactions(page, 10);
      setTransactions(response.transactions);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchTransactions(pagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchTransactions(pagination.page + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <TransactionsContainer>
        <Title>Transactions</Title>
        <div>Loading...</div>
      </TransactionsContainer>
    );
  }

  if (error) {
    return (
      <TransactionsContainer>
        <Title>Transactions</Title>
        <div style={{ color: 'red' }}>{error}</div>
      </TransactionsContainer>
    );
  }

  return (
    <TransactionsContainer>
      <Title>Transactions</Title>
      <TransactionList>
        {transactions.length === 0 ? (
          <div>No transactions found.</div>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionInfo>
                <TransactionKind>{getLabel(transaction)}</TransactionKind>
                <TransactionType>{getAction(transaction)}</TransactionType>
                <TransactionDate>
                  {formatDate(transaction.createdAt)}
                </TransactionDate>
                {transaction.relatedWineId && (
                  <a href={`/wine/${transaction.relatedWineId}`}>Voir le vin</a>
                )}
              </TransactionInfo>
            </TransactionItem>
          ))
        )}
      </TransactionList>

      {pagination.totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={handlePrevPage}
            disabled={pagination.page === 1}
          >
            Précédent
          </PaginationButton>
          <PageInfo>
            Page {pagination.page} sur {pagination.totalPages} (
            {pagination.total} total)
          </PageInfo>
          <Button
            onClick={handleNextPage}
            disabled={pagination.page === pagination.totalPages}
          >
            Suivant
          </Button>
        </PaginationContainer>
      )}
    </TransactionsContainer>
  );
};
