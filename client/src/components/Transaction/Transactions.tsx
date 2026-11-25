import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderRounded';
import LabelIcon from '@mui/icons-material/LabelOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import { getTransactions } from '@/api';
import { Button, Card, SectionTitle, Spinner } from '../Toolkit';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.media.handheld`
    gap: 12px;
    flex-wrap: wrap;
  `};
`;

const IconBubble = styled.span<{ $tone: 'add' | 'remove' | 'neutral' }>`
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $tone, theme }) =>
    $tone === 'add'
      ? '#e4f2e7'
      : $tone === 'remove'
        ? theme.colors.primaryVarient
        : theme.colors.secondaryVarient};
  color: ${({ $tone, theme }) =>
    $tone === 'add'
      ? '#2e7d32'
      : $tone === 'remove'
        ? theme.colors.primary
        : theme.colors.secondary};

  & svg {
    font-size: 1.6rem;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;

  ${({ theme }) => theme.media.handheld`
    flex-basis: calc(100% - 56px);
  `};
`;

const What = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const When = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SeeWine = styled(Link)`
  flex: none;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryVarient};
  }

  ${({ theme }) => theme.media.handheld`
    margin-left: 56px;
  `};
`;

const Pagination = styled.div`
  & > button {
    padding: 0 14px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

const PageInfo = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

interface Transaction {
  id: number;
  type: string;
  createdAt: string;
  wineId?: number | null;
  bottleId?: number | null;
  wineFamilyId?: number | null;
  favoriteId?: number | null;
  relatedWineId?: number | null;
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

function describe(transaction: Transaction): {
  label: string;
  tone: 'add' | 'remove' | 'neutral';
  icon: React.ReactElement;
} {
  const added = transaction.type === 'ADDED';
  if (transaction.wineId != null) {
    return added
      ? { label: 'Nouveau vin ajouté', tone: 'add', icon: <AddIcon /> }
      : { label: 'Vin terminé', tone: 'remove', icon: <RemoveIcon /> };
  }
  if (transaction.bottleId != null) {
    return added
      ? { label: 'Bouteille ajoutée', tone: 'add', icon: <AddIcon /> }
      : { label: 'Bouteille sortie', tone: 'remove', icon: <RemoveIcon /> };
  }
  if (transaction.favoriteId != null) {
    return {
      label: added ? 'Ajouté aux favoris' : 'Retiré des favoris',
      tone: 'neutral',
      icon: <FavoriteIcon />,
    };
  }
  return {
    label: added ? 'Nouvelle appellation' : 'Appellation supprimée',
    tone: 'neutral',
    icon: <LabelIcon />,
  };
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
      setError('Oups, impossible de charger l’historique pour le moment.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  let content: React.ReactNode;
  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <div role="alert">{error}</div>;
  } else if (transactions.length === 0) {
    content = <div>Aucune activité pour le moment.</div>;
  } else {
    content = (
      <List>
        {transactions.map((transaction) => {
          const { label, tone, icon } = describe(transaction);
          return (
            <Item key={transaction.id}>
              <IconBubble $tone={tone}>{icon}</IconBubble>
              <Info>
                <What>{label}</What>
                <When>{formatDate(transaction.createdAt)}</When>
              </Info>
              {transaction.relatedWineId && (
                <SeeWine to={`/wine/${transaction.relatedWineId}`}>
                  Voir le vin
                </SeeWine>
              )}
            </Item>
          );
        })}
      </List>
    );
  }

  return (
    <>
      <SectionTitle>Dernières activités</SectionTitle>
      <Card>
        {content}
        {pagination.totalPages > 1 && (
          <Pagination>
            <Button
              type="button"
              variant="ghost"
              onClick={() => fetchTransactions(pagination.page - 1)}
              disabled={loading || pagination.page === 1}
              aria-label="Page précédente"
            >
              <ChevronLeftIcon />
              Plus récent
            </Button>
            <PageInfo>
              {pagination.page} / {pagination.totalPages}
            </PageInfo>
            <Button
              type="button"
              variant="ghost"
              onClick={() => fetchTransactions(pagination.page + 1)}
              disabled={loading || pagination.page === pagination.totalPages}
              aria-label="Page suivante"
            >
              Plus ancien
              <ChevronRightIcon />
            </Button>
          </Pagination>
        )}
      </Card>
    </>
  );
};
