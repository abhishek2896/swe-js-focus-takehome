# TableCheck SWE (js focus) takehome Handover

## Intro

I wanted to express my sincerest gratitude for the opportunity to interview for SWE (js focus) at TableCheck. I thoroughly enjoyed doing the takehome task and learn more about the company code architecture.

I would like to take this opportunity to express my gratitude for the time and effort you invested in creating the takehome task. The entire experience was insightful, and I genuinely enjoyed working on it.


## Incomplete Tasks

### Task: Set Party and let all mock test pass

### Understading

We need to create a reservation with valid party size. The valid party size would follow following rules
- show babies counter id `showBaby` is true.
- show children counter id `showChild` is true.
- show seniors counter id `showSenior` is true.
- adult counter is always shown.
- party size can never be less than 1.
- party size can never be Infinity.
- party min size can never be greater than party max size.
- party size should be between min and max of shop.
- If menu context is provided and `isGroupOrder` is enabled then the min max of shop is overwritten by `minOrderQty` and `maxOrderQty` of menu context, respectively.

### Process of tasks and what is completed

- A simple UI of reservation is created.
- Updated `openapi/spec.json` to fulfill for request for `/shop/{id}`.
- Updated matchPath in `/openapi/matchers.ts` to visiting path properly to get mock data.
- Set shop slug according to path `/:shop/book`.

### Remaining / Missing

- Add key in cypress/e2e/spec.ts in order to mock apis properly.


### Query / Confusion

Faced an issue while mock tests. 
- Party min size = 3.
- Party max size = 6 / 5.

The test want to restrict `add` button on following conditions
- { adult: 3, child: 0, baby: 0, senior: 1}
- { adult: 4, child: 0, baby: 0, senior: 0}

The test runs fine if we restrict the party max size to 4.