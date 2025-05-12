import { hasRole } from './auth';

import { useStore } from '@/store';

jest.mock('@/store', () => ({
  useStore: jest.fn(),
}));

describe('auth', () => {
  describe('hasRole', () => {
    it('should return true when the user has the matching role.', () => {
      const mockStore = {
        userInfo: {
          roles: ['admin'],
        },
      };
      // @ts-ignore
      useStore.mockReturnValue(mockStore);

      expect(hasRole(['admin'])).toBe(true);
    });
  });
});
