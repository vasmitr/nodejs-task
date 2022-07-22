/* eslint-disable camelcase */
import { format } from 'date-fns';

export const mapUserFromData = ({ user_id, user_type }) => ({
  userId: user_id, userType: user_type, totalAmount: 0, lastTransactionDate: null,
});

export const mapTransactionFromData = ({
  date: _date, user_id, type, operation: { amount, currency },
}) => {
  const date = new Date(_date);
  const weekday = format(date, 'EEEE');
  return ({
    date: _date, userId: user_id, type, amount, currency, weekday,
  });
};
