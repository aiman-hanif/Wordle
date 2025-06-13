# Namedle

A Wordle-inspired game where you guess names instead of words.

**Status**: 🚧 In Development

## How to Play

Guess the secret name in 5 attempts. Type letters and press Enter to submit.

- 🟢 Green: Correct letter, correct position
- 🟡 Yellow: Letter is in the name, wrong position
- ⚫ Gray: Letter not in the name

## Built With

- React + TypeScript
- Tailwind CSS

## Coming Soon

- User authentication and profiles
- Daily challenges with new names
- Progress tracking and statistics
- Leaderboards

## Customization

Change the target name in `App.tsx`:
```typescript
const name: string = "YOUR_NAME";
```
