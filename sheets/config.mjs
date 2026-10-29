// One entry per printable sheet. The build script renders each HTML source to
// a PDF in printables/ and generates a warm usage page in usage/ from the
// copy below. Keep all copy warm, plain-English, and completely unbranded.

export const PACK = {
  name: "The free stay-over welcome pack",
  tagline: "Free printables for hosting guests kindly.",
  intro:
    "Hosting a guest shouldn't take a spreadsheet, a login, or a subscription. " +
    "This pack is eight short, warm sheets you print at home and fill in by hand. " +
    "Everything builds locally on your own computer — no accounts, no tracking, no signups.",
};

export const SHEETS = [
  {
    id: "bedside-welcome-card",
    title: "Bedside welcome card",
    tagline: "A small paper hug on the nightstand.",
    intro:
      "This is the first thing your guest should find — before towels, before tea, before anything. " +
      "It's a two-sided card they can keep by the bed for the whole stay.",
    steps: [
      "Print the sheet on plain letter paper (regular printer paper is perfect).",
      "Cut the page in half along the vertical dashed line.",
      "Fold at the dashed crease so it stands or lies on the nightstand, next to the lamp.",
    ],
    where: "On the nightstand, where your guest will find it before they find anything else.",
    fill: "Fill in the earplugs spot, a morning wish line if you want to spoil them, and your name at the bottom.",
  },
  {
    id: "wifi-and-house-rules",
    title: "Wi-Fi & house rules sheet",
    tagline: "The two questions every guest has, answered once.",
    intro:
      "Wi-Fi and house rules are the first conversation every guest starts. Write them down once and " +
      "nobody has to interrupt you to ask about the password again.",
    steps: [
      "Print one copy and write the network name and password in the big dotted boxes.",
      "Tip: test the password yourself before your guest arrives — capital letters count.",
      "Tape it to the fridge or lean it on the entry table where it can't be missed.",
    ],
    where: "The fridge or the entry table — somewhere the guest passes a dozen times a day.",
    fill: "Fill in the blanks: quiet hours, shoes, keys, and any rule of your own for this visit.",
  },
  {
    id: "towels-and-quiet-hours",
    title: "Towels & quiet-hours note",
    tagline: "Everyday logistics, so nobody digs through cabinets.",
    intro:
      "Guests are quietly afraid of rummaging through your things. This note names the spots — " +
      "towels, blankets, earplugs, the hamper — so they can relax and help themselves.",
    steps: [
      "Print and fill in where things live; specific beats vague.",
      "If quiet hours matter in your home, write them in the middle section.",
      "Leave it in the guest bathroom or on the bed with the towels.",
    ],
    where: "The guest bathroom door, or folded on top of the towel stack.",
    fill: "Every blank is a location. Be almost annoyingly specific — it saves your guest a wobble of hesitation.",
  },
  {
    id: "help-yourself-kitchen-labels",
    title: "Help-yourself kitchen labels",
    tagline: "Permission, posted gently, so nobody has to ask.",
    intro:
      "Guests never quite believe they can have the good snacks. Eight cut-out labels say it out loud, " +
      "kindly, right where these debates happen.",
    steps: [
      "Print on paper or, for durability, card stock.",
      "Cut along the dashed borders — no straightedge needed, slight wonk is fine.",
      "Tape or tack them to the spots they describe: coffee shelf, snack shelf, fridge, sink.",
    ],
    where: "Wherever each label's message applies; the kitchen likes you.",
    fill: "Only the eggs and trash-day labels have blanks. The rest are ready as-is.",
  },
  {
    id: "pet-confirmation-card",
    title: "Pet confirmation card",
    tagline: "For the guest whose dog is basically family.",
    intro:
      "Pets travel, too. This card confirms the fine print of a pet stay: potty spots, bags, furniture " +
      "rules, and who to call — so tails wag and nobody tenses up.",
    steps: [
      "Print and fill in before the visit, or fill it in together as a nice arrival ritual.",
      "The 'good with other animals' line matters if you have a resident pet.",
      "Leave it on the counter with the water bowls.",
    ],
    where: "The counter or table where the leash and water bowls naturally land.",
    fill: "Pet name, potty spot, bag location, furniture rules, and a backup contact keep everyone calm.",
  },
  {
    id: "neighborhood-eats-shortlist",
    title: "Neighborhood eats shortlist",
    tagline: "Your handwriting beats any review app.",
    intro:
      "Guests trust a printed shortlist with your own notes far more than a five-star carousel online. " +
      "Six rows, honest picks, close enough to walk.",
    steps: [
      "Print and fill it in the day before your guest arrives.",
      "Use the gray hints as a guide: one place for breakfast, coffee, dinner, late-night, groceries, treats.",
      "In the 'always vouch for' box, write the place you'd defend at a dinner party.",
    ],
    where: "On the fridge, next to the Wi-Fi card, or tucked into the welcome-pack folder.",
    fill: "Three filled rows is a real shortlist. One vouched-for place is a gift.",
  },
  {
    id: "gift-bag-to-go-card",
    title: "To-go gift-bag card",
    tagline: "For partings that feel generous.",
    intro:
      "A filled tote by the door sends your guest off warm. This card tells them what's in it and adds " +
      "one rule: take two.",
    steps: [
      "Print and fill in where the bag lives (the door hook, the hallway bench).",
      "Write a short personal note at the bottom — three sentences maximum, it lands better.",
      "Restock the tote after every visit; the host checklist has you covered.",
    ],
    where: "Propped against the tote bag by the door, or inside it where it can't be missed.",
    fill: "Bag location and a short handwritten note. The supply list is checkbox-ready.",
  },
  {
    id: "host-restock-checklist",
    title: "Host restock checklist",
    tagline: "Ten minutes before, five minutes after. That's the whole job.",
    intro:
      "The one sheet in this pack that's for you, not your guest. It keeps hosting from snowballing into " +
      "a giant cleaning event every time.",
    steps: [
      "Run the 'after every stay' list the same day your guest leaves — small, fast, done.",
      "Run the 'before guests arrive' list whenever you're hosting again.",
      "Keep a copy in the guest-room closet so the routine stays with the room, not your memory.",
    ],
    where: "In the guest-room closet or taped inside a cabinet door.",
    fill: "It's a checklist, not a form — the blanks are just for your shopping list.",
  },
];
