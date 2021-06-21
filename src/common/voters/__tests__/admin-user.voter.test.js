const { AccessDecisionManager } = require('@wizeline/access-decision-manager-express');
const voterFactory = require('../index');
const ATTRIBUTES = require('../../attributes');

describe('server', () => {
  describe('common', () => {
    describe('voters', () => {
      describe('access-roles', () => {
        describe('admin-user.voter', () => {
          describe('profile', () => {
            describe('get best-profession', () => {
              it('allows to get the best profession when the admin header is true', async () => {
                const mockUser = {
                  id: 1,
                };

                const mockVoterOpcs = {};
                const mockContext = {
                  req: {
                    headers: {
                      admin: true,
                    }
                  }
                };
                const mockSubject = {};

                const voters = voterFactory(mockVoterOpcs);
                const adm = new AccessDecisionManager(
                  mockUser,
                  voters,
                  mockContext,
                );

                const isAllowed = await adm.isGranted(
                  ATTRIBUTES.PROFILE_BEST_PROFESSION,
                  mockSubject,
                );

                expect(isAllowed).toBe(true);
              });
              it('denies to get the best profession when the admin header is false', async () => {
                const mockUser = {
                  id: 1,
                };

                const mockVoterOpcs = {};
                const mockContext = {
                  req: {
                    headers: {
                      admin: false,
                    }
                  }
                };
                const mockSubject = {};

                const voters = voterFactory(mockVoterOpcs);
                const adm = new AccessDecisionManager(
                  mockUser,
                  voters,
                  mockContext,
                );

                const isAllowed = await adm.isGranted(
                  ATTRIBUTES.PROFILE_BEST_PROFESSION,
                  mockSubject,
                );

                expect(isAllowed).toBe(false);
              });
            });

            describe('get best-clients', () => {
              it('allows to get the best clients when the admin header is true', async () => {
                const mockUser = {
                  id: 1,
                };

                const mockVoterOpcs = {};
                const mockContext = {
                  req: {
                    headers: {
                      admin: true,
                    }
                  }
                };
                const mockSubject = {};

                const voters = voterFactory(mockVoterOpcs);
                const adm = new AccessDecisionManager(
                  mockUser,
                  voters,
                  mockContext,
                );

                const isAllowed = await adm.isGranted(
                  ATTRIBUTES.PROFILE_BEST_CLIENTS,
                  mockSubject,
                );

                expect(isAllowed).toBe(true);
              });
              it('denies to get the best clients when the admin header is false', async () => {
                const mockUser = {
                  id: 1,
                };

                const mockVoterOpcs = {};
                const mockContext = {
                  req: {
                    headers: {
                      admin: false,
                    }
                  }
                };
                const mockSubject = {};

                const voters = voterFactory(mockVoterOpcs);
                const adm = new AccessDecisionManager(
                  mockUser,
                  voters,
                  mockContext,
                );

                const isAllowed = await adm.isGranted(
                  ATTRIBUTES.PROFILE_BEST_CLIENTS,
                  mockSubject,
                );

                expect(isAllowed).toBe(false);
              });
            });
          });
        });
      });
    });
  });
});
