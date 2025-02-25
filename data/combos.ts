// Define interfaces for clarity and type safety
interface Reference {
  title: string;
  url: string;
}

interface Combo {
  title: string;
  moves: string[];
  // Optional: if some combos have their own references
  references?: Reference[];
}

export interface ComboCategory {
  category: string;
  combos: Combo[];
  // Optional: if the entire category shares reference videos
  references?: Reference[];
}

// Reorganized data structure
const combos: ComboCategory[] = [
  {
    category: "Hand Combos",
    combos: [
      {
        title: "#'s 1-5 Hands",
        moves: [
          "#1 jab",
          "#2 jab, cross",
          "#3 jab, cross, lead hook",
          "#4 jab, cross, lead hook, cross",
          "#5 jab, cross, lead upper-cut, cross, lead hook",
        ],
      },
      {
        title: "#'s 6-11 Hands",
        moves: [
          "#6 cross, lead hook, cross",
          "#7 lead hook, cross, lead hook",
          "#8 rear upper-cut, lead hook, cross",
          "#9 lead upper-cut, cross, lead hook",
          "#10 cross, lead hook, rear upper-cut",
          "#11 lead hook, cross, lead upper-cut",
        ],
      },
    ],
  },
  {
    category: "Sticks Combos",
    combos: [
      {
        title: "Sticks Combination",
        moves: ["Jab, rear upper-cut, lead hook, rear body-kick"],
      },
      {
        title: "Advance Sticks Combination",
        moves: ["Switch-jab, rear upper-cut, lead hook, rear body-kick"],
      },
      {
        title: "Sticks Combination Counter - One Variation",
        moves: [
          "Lead inside-kick, rear over-head, lead body, rear kick (low, body, or head)",
        ],
      },
    ],
    references: [
      {
        title: "Reviewing the Sticks Combo and Countering",
        url: "https://www.youtube.com/watch?v=uXJoA42aPuk&t=30s",
      },
    ],
  },
  {
    category: "Holland Combos",
    combos: [
      {
        title: "Holland Combination",
        moves: [
          "Jab, cross, lead hook",
          "Reload for lead body, reload for lead hook, rear low-kick",
        ],
      },
    ],
    references: [
      {
        title: "Kickboxing For MMA: Holland Combination",
        url: "https://www.youtube.com/watch?v=uadMkjatsd0&list=PLhKjAOsodBLmddG0i5fakLyWCWOKVvnjg&index=3&t=33s",
      },
      {
        title: "BMT Holland Drill",
        url: "https://www.youtube.com/watch?v=RXi2E74K19I",
      },
    ],
  },
  // Additional categories would follow the same structure...
];

export default combos;
