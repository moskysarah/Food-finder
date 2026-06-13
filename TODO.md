# TODO - Fix TypeScript Meal typing errors

- [ ] Fix `Meal` type issues around `coordinates` and `description` (remove duplicate/contradictory fields).
- [ ] Ensure `App.tsx` structured meals always satisfy `Meal` interface (provide `description` string and `coordinates` if required).
- [ ] Fix any remaining references that expect `location.coordinates`.
- [ ] Run TypeScript build/lint (e.g., `npm test` / `npm run build` / `tsc --noEmit`) to confirm.

