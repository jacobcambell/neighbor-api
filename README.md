# Neighbor Technical Project

Built with Node.js

Features:

-   Route data validation (basic just for this project's sake)
-   Error catching route
-   Auto-restarting on uncaught errors with PM2
-   Deployed with Docker/PM2 on a VPS
-   Live domain pointed to the VPS
-   Unit tests using Vitest

Future improvements (if this were a real project):

-   Add a "limit" parameter to `findCheapestLocations()`. Right now it returns every possible result, but in a real world scenario limiting these results to as few as needed would improve performance
-   Route rate limiting
-   Add caching layer based on requested vehicles (no point in re-querying using the same data if not needed, especially if the DB query is slow at all)
-   Load balancing, redundancy, etc (obviously this project isn't using a production-grade deployment)
-   Add actual schema validation to the `vehicles' objects (checking datatypes, lengths, etc)

Feedback:

-   It's not mentioned in the requirements, but it's possible that no results are found (I just returned an empty array in my code in this case)
-   It says "All length and width values are multiples of 10." Yet the example request has a vehicle with a length of 25
-   Typo in the MD file given, it should say "README" (says "REAMDE") :)
-   I'm guessing that returning a listing that has more space than is actually needed is ok, I don't think the requirement is also to return listings that have as little space as possible so that's what I rolled with (I'd imagine customers wouldn't mind this). For example, if you query for 1 vehicle with a length of 10, the cheapest listing returned is 20x40, but is the cheapest (even though there are 10x10 listings). Might be worth noting that for future interviews
