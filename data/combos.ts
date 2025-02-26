import { BeltRank } from "./enums";

interface Reference {
  title: string;
  url: string;
}

interface Combo {
  title: string;
  moves: string[];
  belt_requirement?: BeltRank;
  references?: Reference[];
}

export interface ComboCategory {
  category: string;
  combos: Combo[];
  references?: Reference[];
}

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
          "#5 jab, cross, lead upper-cut, cross, lead hook"
        ],
        belt_requirement: BeltRank.White
      },
      {
        title: "#'s 6-11 Hands",
        moves: [
          "#6 cross, lead hook, cross",
          "#7 lead hook, cross, lead hook",
          "#8 rear upper-cut, lead hook, cross",
          "#9 lead upper-cut, cross, lead hook",
          "#10 cross, lead hook, rear upper-cut",
          "#11 lead hook, cross, lead upper-cut"
        ],
        belt_requirement: BeltRank.Yellow
      }
    ]
  },
  {
    category: "Sticks Combos",
    combos: [
      {
        title: "Sticks Combination",
        moves: ["Jab, rear upper-cut, lead hook, rear body-kick"],
        belt_requirement: BeltRank.White
      },
      {
        title: "Advance Sticks Combination",
        moves: ["Switch-jab, rear upper-cut, lead hook, rear body-kick"]
      },
      {
        title: "Sticks Combination Counter - One Variation",
        moves: ["Lead inside-kick, rear over-head, lead body, rear kick (low, body, or head)"]
      }
    ],
    references: [
      {
        title: "Reviewing the Sticks Combo and Countering",
        url: "https://www.youtube.com/watch?v=uXJoA42aPuk&t=30s"
      }
    ]
  },
  {
    category: "Holland Combos",
    combos: [
      {
        title: "Holland Combination",
        moves: [
          "Jab, cross, lead hook",
          "Reload for lead body, reload for lead hook, rear low-kick"
        ],
        belt_requirement: BeltRank.Yellow
      }
    ],
    references: [
      {
        title: "Kickboxing For MMA: Holland Combination",
        url: "https://www.youtube.com/watch?v=uadMkjatsd0&list=PLhKjAOsodBLmddG0i5fakLyWCWOKVvnjg&index=3&t=33s"
      },
      {
        title: "BMT Holland Drill",
        url: "https://www.youtube.com/watch?v=RXi2E74K19I"
      }
    ]
  },
  {
    category: "Hemmers Combos",
    combos: [
      {
        title: "Hemmers Combination",
        moves: ["Lead hook, rear hook, lead hook", "Rear body, lead body", "Lead hook, rear hook, lead hook"],
        belt_requirement: BeltRank.Yellow
      },
      {
        title: "Hemmers Combination Variation",
        moves: [
          "Lead hook, rear hook, lead hook",
          "Rear body, lead body",
          "Lead hook, rear hook, lead hook",
          "Lead inside-kick, lead body-kick"
        ]
      }
    ],
    references: [
      {
        title: "Kickboxing: Hemmers Combo With Coach Joey Banks & Duane Ludwig",
        url: "https://www.youtube.com/watch?v=olzOj-21bfA"
      }
    ]
  },
  {
    category: "Dutch Drill Combos",
    combos: [
      {
        title: "Dutch Drill #1",
        moves: [
          "Lead hook, rear low-kick",
          "Cross, lead body-kick",
          "Cross, lead hook, rear low-kick",
          "Lead hook, cross, lead head-kick"
        ],
        belt_requirement: BeltRank.Yellow
      }
    ],
    references: [
      {
        title: "The Dutch Drill",
        url: "https://www.youtube.com/watch?v=aVZnAogUyVU&t=12s"
      },
      {
        title: "How to teach the BMT Dutch drill",
        url: "https://www.youtube.com/watch?v=qO-vm9sXthM"
      }
    ]
  },
  {
    category: "2:30 Combos",
    combos: [
      {
        title: "2:30",
        moves: [
          "Jab, cross",
          "Jab, rear over-head",
          "Jab, cross",
          "Jab, rear hook",
          "Jab, cross",
          "Jab, rear upper-cut"
        ],
        belt_requirement: BeltRank.Yellow
      },
      {
        title: "2:30 Variation",
        moves: [
          "Jab, cross, step back",
          "Jab, jab, rear over-head",
          "Lead low-kick"
        ]
      }
    ],
    references: [
      {
        title: "The 2:30",
        url: "https://www.youtube.com/watch?v=kOH7FYVtyWQ"
      },
      {
        title: "Drilling 2:30 Series From Open Stance",
        url: "https://www.youtube.com/watch?v=IzmzEgNkAh8&list=PLhKjAOsodBLmddG0i5fakLyWCWOKVvnjg&index=17"
      }
    ]
  },
  {
    category: "Dekkers Combos",
    combos: [
      {
        title: "Dekkers Combination",
        moves: [
          "Jab, cross",
          "Reload for cross, lead hook",
          "Reload for lead hook, cross (drop on the cross a little)",
          "Lead body, rear body",
          "Reload for rear upper-cut, lead hook, cross",
          "Two lead body-kicks"
        ],
        belt_requirement: BeltRank.Yellow
      },
      {
        title: "New Dekkers Combination",
        moves: [
          "Jab, cross",
          "Reload for cross, lead hook",
          "Reload for lead hook, cross (drop on the cross a little)",
          "Lead body, rear body",
          "Reload for rear upper-cut, lead hook, cross",
          "Lead inside-kick, lead high-kick"
        ]
      },
      {
        title: "Dekkers Combination Defensive Variations",
        moves: ["Combination is the same except with replacing reloads with slips, or rolls."]
      }
    ],
    references: [
      {
        title: "Kickboxing For MMA: Dekkers Combination",
        url: "https://www.youtube.com/watch?v=GclBhgtT8uQ&t=64s"
      }
    ]
  },
  {
    category: "Reem Drill Combos",
    combos: [
      {
        title: "Reem Drill",
        moves: [
          "Cross, lead knee (step forward or switch), land forward after knee",
          "Lead hook, cross"
        ],
        belt_requirement: BeltRank.Orange
      },
      {
        title: "Reem Setup Variation",
        moves: [
          "Lead hook, low-kick",
          "Cross, lead knee (step forward or switch), land forward after knee",
          "Lead hook, cross, lead hook",
          "Rear high-kick"
        ]
      }
    ],
    references: [
      {
        title: "How To Drill Reems & Returns",
        url: "https://www.youtube.com/watch?v=QbGz4xWVXTQ&t=36s"
      },
      {
        title: "Cross Reem / Bang Muay Thai / Kickboxing For MMA / 2020",
        url: "https://www.youtube.com/watch?v=-8PgdG8Vfs0"
      },
      {
        title: "Reem Set Up / Kickboxing For MMA / 2020",
        url: "https://www.youtube.com/watch?v=QmkDD6i3r4M"
      }
    ]
  },
  {
    category: "Back Them Up Combos",
    combos: [
      {
        title: "Back Them Up Drill",
        moves: [
          "Jab, jab, cross",
          "Jab, lead hook, cross",
          "Lead hook, jab, cross"
        ],
        belt_requirement: BeltRank.Orange
      }
    ],
    references: [
      {
        title: "Kickboxing For MMA: Back them up drill",
        url: "https://www.youtube.com/watch?v=9SX1jh4ATiI"
      },
      {
        title: "3 Different Ways to Use Combo #3 of the Back 'EM Up Drill",
        url: "https://www.youtube.com/watch?v=2dagVVXpMHk"
      }
    ]
  },
  {
    category: "One Body Two Body Combos",
    combos: [
      {
        title: "1 Body",
        moves: [
          "Jab",
          "Jab to chest",
          "Overhand"
        ],
        belt_requirement: BeltRank.Orange
      },
      {
        title: "2 Body",
        moves: [
          "Jab",
          "Cross to belly",
          "Lead Hook"
        ],
        belt_requirement: BeltRank.Orange
      }
    ]
  },
  {
    category: "Switch It Combos",
    combos: [
      {
        title: "Switch It",
        moves: [
          "Switch cross",
          "Lead hook",
          "Rear body-kick"
        ],
        belt_requirement: BeltRank.Orange
      }
    ]
  },
  {
    category: "Aldo Combos",
    combos: [
      {
        title: "Aldo Combination",
        moves: [
          "Jab",
          "Rear-upper",
          "Liver",
          "Rear low-kick"
        ],
        belt_requirement: BeltRank.Orange
      }
    ]
  },
  {
    category: "K.O. Drill Combos",
    combos: [
      {
        title: "K.O. Drill",
        moves: [
          "All punches are done while stepping back (which draws in your opponent)",
          "Cross, cross",
          "Rear over-head, rear over-head",
          "Rear hook, rear hook",
          "Rear upper-cut, rear upper-cut"
        ],
        belt_requirement: BeltRank.Orange
      }
    ],
    references: [
      {
        title: "The KO Drill With All Rear Punches",
        url: "https://www.youtube.com/watch?v=1DO4oQgdynI"
      }
    ]
  },
  {
    category: "Dekkers Combination #2",
    combos: [
      {
        title: "Dekkers Combination #2",
        moves: [
          "Jab, Cross, Roll",
          "Cross, Hook, Slip",
          "Lead-upper",
          "Rear-overhand (drop for body shot)",
          "Lead-body, Rear-body (reload for rear-upper)",
          "Rear-upper, Lead-hook, Cross",
          "Lead inside-kick, Lead body-kick"
        ],
        belt_requirement: BeltRank.Blue
      }
    ]
  },
  {
    category: "Timing of 2 Combos",
    combos: [
      {
        title: "Timing of 2",
        moves: [
          "Jab-Cross",
          "Jab, Pull, Cross",
          "Quick Jab-Cross",
          "Plays with different striking speeds. 'Pull' is a step back to draw opponent in and return with cross leading into a quick jab-cross"
        ],
        belt_requirement: BeltRank.Blue
      }
    ]
  },
  {
    category: "Check It Combos",
    combos: [
      {
        title: "Check It",
        moves: [
          "Jab",
          "Check (evades opponents cross)",
          "Lead-hook, Cross",
          "For 'Check' evade opponents cross by stepping towards lead-foot side and throw hook as you land on lead-foot"
        ],
        belt_requirement: BeltRank.Blue
      }
    ]
  },
  {
    category: "Shoulder Roll Combos",
    combos: [
      {
        title: "Shoulder Roll",
        moves: [
          "Rear-upper, Lead-upper, Rear-upper",
          "Lead-hook, Cross"
        ]
      }
    ]
  },
  {
    category: "Bas Combos",
    combos: [
      {
        title: "Bas Combo",
        moves: [
          "Lead jab, rear body",
          "Rear upper-cut, lead hook",
          "Slip and lead hook to liver, rear high-kick"
        ]
      }
    ],
    references: [
      {
        title: "How to drill the BMT Bas Combo",
        url: "https://www.youtube.com/watch?v=g2fTnaA-Qxk"
      }
    ]
  },
  {
    category: "Souwer Combos",
    combos: [
      {
        title: "Souwer Combination",
        moves: [
          "Hook, Cross (or overhand)",
          "Liver, Rear head-kick",
          "Cross can be substituted with overhand to lean in for liver shot"
        ]
      }
    ]
  },
  {
    category: "Sync Up Flow Combos",
    combos: [
      {
        title: "Sync Up Flow",
        moves: [
          "Jab",
          "Cross",
          "2 hands (Jab-Cross)",
          "'2 hands' is used to reference hands-combo #2 (jab-cross)"
        ]
      }
    ]
  }
];

export default combos;
