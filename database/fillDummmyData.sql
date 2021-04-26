insert into eit.accounts
  (username)
values
(
  'mathiaschunnoo'
),
(
  'amaleen'
),
(
  'ellen'
),
(
  'kasper'
);

insert into eit.challenges
  (name, description, info, points, imagepath)
values
(
  'Bli med å sette panterekord',
  'Pant tomflasker du har hjemme',
  'Panter du én flaske, sparer du nok energi til å fullade mobilen 70 ganger',
  200,
  'img/recycle.jpg'
),
(
  'Grønn fredagstaco',
  'Bytt ut kjøttdeig med bønner i tacoen',
  'Hvis du bytter ut den tradisjonelle fredagstacoen med kjøttdeig med en miljøbevisst fredagstaco med bønner kan du spare 2080 kr på et år. ',
  500,
  null
),
(
  'Tjen penger og redd planeten',
  'Selg et klesplagg du ikke bruker (tise, finn, facebook markets, en venn)',
  'Når du selger et plagg, sparer du 7kg CO2.',
  200,
  null
),
(
  '#5forhvalen',
  'Plukk opp fem søppelting på din neste gå- eller joggetur.',
  'Hvis 1/5 nordmenn plukker opp fem søppelting fra naturen (35 g), fjerner vi sammen 35 tonn søppel fra naturen hver eneste dag',
  500,
  null
),
(
  'Hjemmelaget Earth Hour',
  'Skru av luset i hele huset/leiligheten i en time',
  'En lampe som lyser med 60 watt hele året, koster deg ca 400 kroner i året.',
  500,
  null
);

insert into eit.posts
  (userid, challengeid, posted, content, imagepath)
values
(
  2,
  4,
  timestamp '2021-03-10 12:00:00',
  'I dag har jeg vært på min første ploggetur',
  'img/plogging.jpg'
),
(
  3,
  1,
  timestamp '2021-03-09 13:00:00',
  'Vegetartaco <3',
  'img/vegetartaco.jpg'
),
(
  4,
  3,
  timestamp '2021-03-09 11:00:00',
  'Pant flasker for miljøet!',
  'img/pant.jpg'
);

insert into eit.follows values
(
  1,
  2
),
(
  1,
  3
),
(
  1,
  4
);

