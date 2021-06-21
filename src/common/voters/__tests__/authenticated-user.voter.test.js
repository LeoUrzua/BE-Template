const { AccessDecisionManager } = require('@wizeline/access-decision-manager-express');
const voterFactory = require('../index');
const ATTRIBUTES = require('../../attributes');

describe('server', () => {
  describe('common', () => {
    describe('voters', () => {
      describe('access-roles', () => {
        describe('authenticated-user.voter', () => {
          describe('contracts', () => {
            describe('get contract', () => {
              it('aloows to get the contract with an authenticated request', async () => {
                const mockUser = {
                  id: 1,
                };

                const mockVoterOpcs = {};
                const mockContext = {
                  req: {
                    headers: {
                      profile_id: 1,
                    },
                    params: {
                      id: 1
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
                  ATTRIBUTES.CONTRACT_GET_ONE,
                  mockSubject,
                );

                expect(isAllowed).toBe(true);
              });
              it('denies to get the contract with an unauthenticated request', async () => {
                const mockUser = {
                };

                const mockVoterOpcs = {};
                const mockContext = {
                  req: {
                    headers: {
                      profile_id: 1,
                    },
                    params: {
                      id: 1
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
                  ATTRIBUTES.CONTRACT_GET_ONE,
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
