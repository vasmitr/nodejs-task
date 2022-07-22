import { getCashInFee, getCashOutJuridicalFee, getCashOutNaturalFee } from '../api';

export default async function getFees() {
  try {
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
  } catch (e) {
    throw new Error(`Something wrong with the API ${e.message || e.text}`);
  }
}
