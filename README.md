# Meal Prep Math

Meal prep, batch and container arithmetic. The 2 people at 2 meals a day for 5 days need 20 meals.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The meals truth** - the people (1 to 100) times the meals a day (1 to 10) times the days (1 to 60).
- **The batch truth** - the meals (1 to 100000) divided by the portions a batch (1 to 1000), rounded up, with the portions spare.
- **The box truth** - the meals divided by the containers a pack (1 to 1000), rounded up, with the containers spare.
- **The cost truth** - the batches and the packs (1 to 100000 each), each at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not met any household and does not know recipes, appetites, storage, how long food keeps or any food safety rule, and it gives no verdict that a plan is enough, safe or healthy. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/mealprepmath/
Repo: https://github.com/iLanis-agent/mealprepmath
