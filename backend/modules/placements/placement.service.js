import placementRepository from './placement.repository.js';

export const getPlacements = async () => {
  return placementRepository.getPlacements();
};

export default {
  getPlacements,
};
