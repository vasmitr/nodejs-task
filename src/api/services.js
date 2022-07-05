import API from './axios';

export const getCashInFee = async () => {
  const res = await API.get('/cash-in');
  return res.data;
};

export const getCashOutNaturalFee = async () => {
  const res = await API.get('/cash-out-natural');
  return res.data;
};

export const getCashOutJuridicalFee = async () => {
  const res = await API.get('/cash-out-juridical');
  return res.data;
};
