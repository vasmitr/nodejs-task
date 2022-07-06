import { getCashInFee, getCashOutJuridicalFee, getCashOutNaturalFee } from '../api';

export default async function getFees() {
  const [
    cashInFee,
    cashOutNaturalFee,
    cashOutJuridicalFee,
  ] = await Promise.all([getCashInFee(), getCashOutNaturalFee(), getCashOutJuridicalFee()]);

  return {
    cashInFee,
    cashOutNaturalFee,
    cashOutJuridicalFee,
  };
}
