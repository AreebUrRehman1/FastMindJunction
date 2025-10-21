export const PUZZLE_CONFIG = {

  step10: {
    // Correct Answers
    slots: {
      slotA: ['vector'],
      slotB: ['direction'],
    },
    // All available items the user can drag
    draggableItems: ['scalar', 'vector', 'magnitude', 'direction'],

    // The structure of the sentence, including text and slot IDs
    sentenceParts: [
      { type: 'text', content: 'Force is a ' },
      { type: 'slot', id: 'slotA' },
      { type: 'text', content: ' quantity that has both magnitude and ' },
      { type: 'slot', id: 'slotB' },
      { type: 'text', content: '.' },
    ]
  }
};