Considerations

1.- Started reading and understanding the requirements of the challenge (see the image strategy.png).

2.- Wrote how to solve each endpoint and prioritized the tasks, so, I realized that a strategy for authorization
was important

3.- Created the strategy for the authorization using my open-source package for security https://www.npmjs.com/package/@wizeline/access-decision-manager-express

4.- Worked on /contracts/:id and restructured the folders to decouple some logic like the models, services, and controllers (so it's easier to test and to consume the modules)

5.- Work on every endpoint giving prioritization on security and modularity


Important notes:

* The security for the admin endpoints is with a header {admin: true}, so, the admin can hit all the endpoints (In real life this would be completely different)
* All the logic for the authorization is located at /src/common/voters


More notes:
* I would have liked to add swagger and some testing as I mentioned before it would be easy to add unit testing since the repo has modularity and
  for the integration/unit test I have created my strategy (example): https://github.com/wizeline/access-decision-manager/tree/master/packages/access-decision-manager-express/examples/blog-post--role-based-rbac/src/voters/__tests__

* Another pending task was the CI/CD, I would have used GitHub actions 



