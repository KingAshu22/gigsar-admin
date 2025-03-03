const genreOptions = [
  "2-step garage",
  "20th-century classical music",
  "4-beat",
  "A cappella",
  "Absolute music",
  "Acid house",
  "Acid jazz",
  "Acid rock",
  "Acid techno",
  "Acid trance",
  "Acousmatic music",
  "Acoustic music",
  "Adult contemporary music",
  "African-American music",
  "African heavy metal",
  "African hip hop",
  "Afrobeat",
  "Afrobeats",
  "Afro-Cuban jazz",
  "Afro house",
  "Afroswing",
  "Afro tech",
  "African popular music",
  "Aguinaldo",
  "Aleatoric music",
  "Alternative country",
  "Alternative dance",
  "Alternative hip hop",
  "Alternative metal",
  "Alternative R&B",
  "Alternative reggaeton",
  "Alternative rock",
  "Ambient music",
  "Ambient house",
  "Ambient pop",
  "Ambient techno",
  "Ambrosian chant",
  "American folk music",
  "American folk-music revival",
  "Americana",
  "Anarcho-punk",
  "Ancient music",
  "Anglican chant",
  "Anatolian rock",
  "Anti-folk",
  "Apala",
  "Appalachian music",
  "Arabesque",
  "Arabic pop music",
  "Arena rock",
  "Argentine rock",
  "Armenian chant",
  "Ars antiqua",
  "Ars nova",
  "Ars subtilior",
  "Art pop",
  "Art punk",
  "Art rock",
  "Ashik",
  "Assyrian folk/pop music",
  "Assame",
  "Australian country music",
  "Australian hip hop",
  "Avant-funk",
  "Avant-garde music",
  "Avant-garde jazz",
  "Avant-garde metal",
  "Avant-pop",
  "Avant-prog",
  "Avant-punk",
  "Axé",
  "Azonto",
  "Bachata",
  "Baggy",
  "Baião",
  "Bakersfield sound",
  "Baila",
  "Baisha xiyue",
  "Bajourou",
  "Bal-musette",
  "Balakadri",
  "Balinese Gamelan",
  "Balearic beat",
  "Balkan brass",
  "Ballad",
  "Ballata",
  "Ballet",
  "Baltimore club",
  "Bambuco",
  "Banda music",
  "Bangsawan",
  "Bantowbol",
  "Bollywood/New",
  "Bollywood/Retro/Old",
  "Barbershop music",
  "Barcarolle",
  "Bard (Soviet Union)",
  "Barn dance",
  "Baroque music",
  "Baroque pop",
  "Barynya",
  "Bassline",
  "Batá-rumba",
  "Batucada",
  "Baul",
  "Beach music",
  "Beat music",
  "Beatboxing",
  "Beatlesque",
  "Beautiful music",
  "Bebop",
  "Beguine",
  "Beiguan music",
  "Bel canto",
  "Bend-skin",
  "Beneventan chant",
  "Benga music",
  "Bengali",
  "Bent edge",
  "Berlin School of electronic music",
  "Devotional/Bhajan",
  "Bhangra",
  "Bhangragga",
  "Big band",
  "Big beat",
  "Big room house",
  "Biguine",
  "Bihu",
  "Biker metal",
  "Biomusic",
  "Bitpop",
  "Blackened death metal",
  "Black metal",
  "Blackgaze",
  "Black MIDI",
  "Bluegrass music",
  "Blue-eyed soul",
  "Blues",
  "Blues ballad",
  "Blues rock",
  "Bongo Flava",
  "Boogie",
  "Boogie rock",
  "Boogie-woogie",
  "Boogaloo",
  "Boi",
  "Bosnian root music",
  "Bossa Nova",
  "Bothy Ballad",
  "Bounce music",
  "Bouncy techno",
  "Brass",
  "Breakbeat",
  "Breakbeat hardcore",
  "Breakcore",
  "Breakstep",
  "Brega",
  "Breton",
  "Brill Building Sound",
  "Brit funk",
  "Britpop",
  "British blues",
  "British folk rock",
  "British Invasion",
  "British hip hop",
  "British rhythm and blues",
  "British rock music",
  "British rock and roll",
  "Broken beat",
  "Brostep",
  "Brown-eyed soul",
  "Brukdown",
  "Bubblegum pop",
  "Buddhist music",
  "Bullerengue",
  "Bikutsi",
  "Bulerías",
  "Bunraku",
  "Burger-highlife",
  "Burgundian School",
  "Bush ballad",
  "Byzantine music",
  "Ca din tulnic",
  "Ca trù",
  "Cabaret",
  "Cadence-lypso",
  "Cadence rampa",
  "Cải lương",
  "Cajun music",
  "Cakewalk",
  "Calinda",
  "Čalgija",
  "Calypso music",
  "Calypso-style baila",
  "Campursari",
  "Can Can",
  "Canadian blues",
  "Candombe",
  "Canon",
  "Cantata",
  "Cante chico",
  "Cante jondo",
  "Canterbury scene",
  "Cantiñas",
  "Cantiga",
  "Canto livre",
  "Cantopop",
  "Cantu a tenore",
  "Canzone Napoletana",
  "Cape Breton fiddling",
  "Capoeira music",
  "Carimbó",
  "Cariso",
  "Carnatic music",
  "Carol",
  "Punjabi",
  "Punjabi Folk",
  "Punjabi Tappe",
  "Cartageneras",
  "Carnavalito",
  "Celempungan",
  "Cello rock",
  "Celtic chant",
  "Celtic fusion",
  "Celtic metal",
  "Celtic music",
  "Celtic punk",
  "Celtic reggae",
  "Celtic rock",
  "Cha-cha-cha",
  "Chacarera",
  "Chakacha",
  "Chalga",
  "Chamamé",
  "Chamarrita",
  "Chamber music",
  "Chamber jazz",
  "Chamber pop",
  "Champeta",
  "Changüí",
  "Chanson",
  "Chant",
  "Chap hop",
  "Charanga",
  "Charanga-vallenata",
  "Charikawi",
  "Charleston (dance)",
  "Chastushka",
  "Chầu văn",
  "Chèo",
  "Chicano rock",
  "Children's music",
  "Chicago blues",
  "Chicago house",
  "Chicago soul",
  "Chicken scratch",
  "Chill-out music",
  "Chillwave",
  "Chinese music",
  "Chinese rock",
  "Chiptune",
  "Chouval bwa",
  "Chowtal",
  "Choro",
  "Christmas carol",
  "Christmas music",
  "Christian alternative rock",
  "Christian country music",
  "Christian hardcore",
  "Christian hip hop",
  "Christian metal",
  "Christian music",
  "Christian punk",
  "Christian rock",
  "Christian ska",
  "Chylandyk",
  "Chula",
  "Chumba",
  "Church music",
  "Chut-kai-pang",
  "Chutney music",
  "Chutney Soca",
  "Cifra",
  "Circus music",
  "Classic country",
  "Classic rock",
  "Classic female blues",
  "Classical music",
  "Classical period",
  "Close harmony",
  "Coladeira",
  "Coldwave",
  "College rock",
  "Combined rhythm",
  "Comedy music",
  "Comedy rap",
  "Comedy rock",
  "Comic opera",
  "Compas",
  "Concerto",
  "Concerto grosso",
  "Conga",
  "Conjunto",
  "Contemporary Christian music",
  "Conscious hip hop",
  "Ravindra Sangeet",
  "Rajasthani / Marwari",
  "Contemporary folk music",
  "Bhojpuri",
  "Contemporary laïka",
  "Contemporary R&B",
  "Contradanza",
  "Cool jazz",
  "Coon song",
  "Coptic music",
  "Corrido",
  "Country music",
  "Country blues",
  "Country folk",
  "Country pop",
  "Country rap",
  "Country rock",
  "Coupé-Décalé",
  "Cowpunk",
  "Crabcore",
  "Creole music",
  "Cretan",
  "Crossover thrash",
  "Crunk",
  "Crunkcore",
  "Crust punk",
  "Csárdás",
  "Cuarteto",
  "Cueca",
  "Cumbia",
  "Cumbia villera",
  "Currulao",
  "Cyber Metal",
  "Czech bluegrass",
  "Dabke",
  "Dadra",
  "Daina",
  "Daina",
  "Dance music",
  "Dance-pop",
  "Dance-punk",
  "Dance-rock",
  "Dancehall",
  "Dangdut",
  "Danger music",
  "Dansband",
  "Danza",
  "Danzón",
  "Dappankuthu",
  "Dark ambient",
  "Dark cabaret",
  "Darkcore",
  "Darkstep",
  "Dark wave",
  "De dragoste",
  "Deathcore",
  "Deathgrind",
  "Death industrial",
  "Death metal",
  "Death-doom",
  "Death rock",
  "Décima",
  "Delta blues",
  "Deep funk",
  "Deep house",
  "Descarga",
  "Desi",
  "Detroit blues",
  "Detroit techno",
  "Dhamar",
  "Dhrupad",
  "Dhun",
  "Diablada",
  "Digital hardcore",
  "Dirge",
  "Dirty rap",
  "Disco",
  "Disco polo",
  "Diva house",
  "Dixieland",
  "Djent",
  "Doina",
  "Dolewave",
  "Dondang Sayang",
  "Donegal fiddle tradition",
  "Dongjing",
  "Doo-wop",
  "Doom metal",
  "Downtempo",
  "Dream pop",
  "Drone metal",
  "Drill music",
  "Drone music",
  "Drum and bass",
  "Drumstep",
  "Dub music",
  "Dub techno",
  "Dubtronica",
  "Dubstep",
  "Dubstyle",
  "Dungeon synth",
  "Dunun",
  "Dunedin Sound",
  "Dutch jazz",
  "Early music",
  "East Coast hip hop",
  "Easy listening",
  "Electric blues",
  "Electro",
  "Electro backbeat",
  "Electrogrind",
  "Electro house",
  "Electro-industrial",
  "Electro swing",
  "Electroacoustic music",
  "Electroclash",
  "Electronic body music",
  "Electronic dance music",
  "Electronic music",
  "Electronic rock",
  "Electronica",
  "Electronicore",
  "Electropop",
  "Electropunk",
  "Emo",
  "Emo hip hop",
  "Emo pop",
  "English/Western",
  "English folk music",
  "Enka",
  "Epic Metal",
  "Eremwu eu",
  "Ethereal wave",
  "Ethiopian chant",
  "Eurobeat",
  "Eurodance",
  "Euro disco",
  "Euro house",
  "Europop",
  "Eurotrance",
  "Exotica",
  "Experimental music",
  "Experimental pop",
  "Experimental rock",
  "Expressionist music",
  "Extempo",
  "Extreme metal",
  "Fado",
  "Falak music",
  "Fandango",
  "Farruca",
  "Festejo",
  "Fife and drum blues",
  "Filk music",
  "Fingerstyle",
  "Flamenco",
  "Florida breaks",
  "Folk jazz",
  "Folk metal",
  "Folk",
  "Folk pop",
  "Folk punk",
  "Folk rock",
  "Folktronica",
  "Forró",
  "Foxtrot",
  "Freakbeat",
  "Freak folk",
  "Free improvisation",
  "Free jazz",
  "Free tekno",
  "French house",
  "Frevo",
  "Fuji music",
  "Full-on",
  "Funaná",
  "Funeral doom",
  "Funeral march",
  "Funk",
  "Funk metal",
  "Funk rock",
  "Funky house",
  "Furniture music",
  "Future bass",
  "Future garage",
  "Future soul",
  "Futurepop",
  "G-funk",
  "Gaana",
  "Gabber",
  "Gagaku",
  "Ghana",
  "Gaita Zuliana",
  "Galant",
  "Gallican chant",
  "Gamelan",
  "Gamelan bebonangan",
  "Gamelan degung",
  "Gamelan gong kebyar",
  "Gamelan salendro",
  "Gamelan selunding",
  "Gamelan semar pegulingan",
  "Gammaldans",
  "Gandrung",
  "Gangsta rap",
  "Gar",
  "Garba / Dandiya",
  "Garage house",
  "Garage rock",
  "Garage rock revival",
  "Gato",
  "Gavotte",
  "Gender wayang",
  "Geek rock",
  "Gelineau psalmody",
  "German folk",
  "Ghazal",
  "Ghettotech",
  "Girl group",
  "Glam metal",
  "Glam punk",
  "Glam rock",
  "Glitch",
  "Gnawa music",
  "Go-go",
  "Goa trance",
  "Gong chime",
  "Goombay",
  "Goregrind",
  "Goshu ondo",
  "Gospel music",
  "Gospel blues",
  "Gothic country",
  "Gothic metal",
  "Gothic rock",
  "Gothabilly",
  "Gqom",
  "Grebo",
  "Gregorian chant",
  "Grime",
  "Grindcore",
  "Griot",
  "Groove metal",
  "Group Sounds",
  "Grunge",
  "Grupera",
  "Guarania",
  "Guajira",
  "Gujarati",
  "Gumbe",
  "Gunchei",
  "Gunka",
  "Guoyue",
  "Gwo ka",
  "Gwo ka moderne",
  "Gypsy jazz",
  "Gypsy punk",
  "Habanera",
  "Halling",
  "Hambo",
  "Hamburger Schule",
  "Happy hardcore",
  "Haqibah",
  "Harawi",
  "Hardcore hip hop",
  "Hardcore punk",
  "Hardcore",
  "Hard bop",
  "Hard house",
  "Hard rock",
  "Hardstep",
  "Hardstyle",
  "Hard trance",
  "Hasapiko",
  "Hát tuồng",
  "Heartland rock",
  "Heavy hardcore",
  "Heavy metal music",
  "Hi-NRG",
  "Hill country blues",
  "Highlife",
  "Hiplife",
  "Hip Hop",
  "Hip house",
  "Hindustani classical music",
  "Hiragasy",
  "Hoerspiel",
  "Honky-tonk",
  "Hokum",
  "Honkyoku",
  "Hora",
  "Hora lungă",
  "Hornpipe",
  "Horrorcore",
  "Horror punk",
  "House music",
  "Huayño",
  "Hula",
  "Humppa",
  "Hunguhungu",
  "Hyangak",
  "Hymn",
  "Hyphy",
  "Rock",
  "Pop",
  "Icaro",
  "IDM",
  "Mayra/Bhaat",
  "Igbo music",
  "Illbient",
  "Impressionist music",
  "Improvised",
  "Incidental music",
  "Indian rock",
  "Indietronica",
  "Indie (India)",
  "Indie folk (India)",
  "Independent music",
  "Indie pop (India)",
  "Indie rock (India)",
  "Indie",
  "Indie folk",
  "Indie pop",
  "Indie rock",
  "Indigenous music of North America",
  "Indigenous rock",
  "Indo jazz",
  "Industrial death metal",
  "Industrial hip hop",
  "Industrial music",
  "Industrial musical",
  "Industrial metal",
  "Industrial rock",
  "Industrial thrash metal",
  "Instrumental",
  "Instrumental hip hop",
  "Instrumental rock",
  "Inuit music",
  "Irish traditional music",
  "Irish rebel music",
  "Isicathamiya",
  "Islamic music",
  "Italo dance",
  "Italo disco",
  "Italo house",
  "J-pop",
  "Jaipongan",
  "Jam band",
  "Jam session",
  "Jamaican folk music",
  "Jamrieng samai",
  "Jangle",
  "Japanese rock",
  "Japanoise",
  "Jarana yucateca",
  "Jarocho",
  "Jawaiian",
  "Jazz",
  "Jazzcore",
  "Jazz improvisation",
  "Jazz-funk",
  "Jazz fusion",
  "Jazz rap",
  "Jazz rock",
  "Jegog",
  "Jenkka",
  "Jesus music",
  "Jewish",
  "Jig",
  "Jing ping",
  "Jingle",
  "Jit",
  "Jitterbug",
  "Jive",
  "Joged",
  "Joged bumbung",
  "Joik",
  "Joropo",
  "Jota",
  "Jug band",
  "Jùjú music",
  "Juke",
  "Jump blues",
  "Jumpstyle",
  "Jungle music",
  "Junkanoo",
  "K-pop",
  "Kabuki",
  "Kagok",
  "Kaiso",
  "Kalamatianó",
  "Kan ha diskan",
  "Kanikapila",
  "Kansas City blues",
  "Kantrum",
  "Kargyraa",
  "Kaseko",
  "Kachāshī",
  "Kawachi ondo",
  "Kawaii metal",
  "Kayōkyoku",
  "Kecak",
  "Kacapi suling",
  "Kertok",
  "Khaleeji",
  "Khene",
  "Khyal",
  "Kievan chant",
  "Kirtan",
  "Kiwi rock",
  "Kizomba",
  "Klapa",
  "Klasik",
  "Klezmer",
  "Kolomyjka",
  "Komagaku",
  "Kpanlogo",
  "Krakowiak",
  "Krautrock",
  "Kriti",
  "Kroncong",
  "Kuduro",
  "Kulintang",
  "Kundiman",
  "Kvæði",
  "Kwaito",
  "Kwassa kwassa",
  "Kwela",
  "Laiko",
  "Lambada",
  "Landó",
  "Latin alternative",
  "Latin hip hop",
  "Latin jazz",
  "Latin metal",
  "Latin music",
  "Latin pop",
  "Latino punk",
  "Latin rock",
  "Latin soul",
  "Lavani",
  "Legényes",
  "Letkajenkka",
  "Lhamo",
  "Lied",
  "Light Metal music",
  "Light music",
  "Liquid funk",
  "Lo-fi music",
  "Logobi",
  "Tehuelche",
  "Long song",
  "Louisiana blues",
  "Lounge music",
  "Lovers rock",
  "Lowercase",
  "Lu",
  "Lubbock sound",
  "Luk Krung",
  "Luk thung",
  "Lullaby",
  "Lundu",
  "M-Base",
  "Madchester",
  "Madrigal",
  "Maithili",
  "Mafioso rap",
  "Mahori",
  "Makossa",
  "Malhun",
  "Maloya",
  "Malambo",
  "Malayalam",
  "Mambo",
  "Manaschi",
  "Mandopop",
  "Manele",
  "Mangue bit",
  "Manila Sound",
  "Mapouka",
  "Marabi",
  "Maracatu",
  "March",
  "Mariachi",
  "Marrabenta",
  "Martial industrial",
  "Martial music",
  "Maskanda",
  "Marinera",
  "Martinetes",
  "Mashup",
  "Mass",
  "Matamuerte",
  "Mathcore",
  "Math rock",
  "Maxixe",
  "Mazurka",
  "Mbalax",
  "Mbube",
  "Meditation music",
  "Medieval folk rock",
  "Medieval metal",
  "Medieval music",
  "Mejoranera",
  "Malhun",
  "Melam",
  "Melisma",
  "Melodic hardcore",
  "Melodic metalcore",
  "Melodic music",
  "Memphis blues",
  "Memphis soul",
  "Mento",
  "Merengue music",
  "Merengue típico",
  "Méringue",
  "Metal music",
  "Metalcore",
  "Mexican rock music",
  "Meykhana",
  "Mezwed",
  "Miami bass",
  "Microhouse",
  "Microsound",
  "Middle Eastern music",
  "Mini-jazz",
  "Minuet",
  "Milonga",
  "Min'yō",
  "Minimal music",
  "Minimal techno",
  "Minstrel",
  "Minneapolis sound",
  "Modal jazz",
  "Modinha",
  "Modern rock",
  "Morenada",
  "Mor lam",
  "Mor lam sing",
  "Moombahton",
  "Moombahcore",
  "Motown",
  "Montuno",
  "Morna",
  "Mozambique",
  "Mozarabic chant",
  "Mugham",
  "Mumble rap",
  "Murga",
  "Musette",
  "Mushroom Jazz",
  "Music drama",
  "Music hall",
  "Música criolla",
  "Musica llanero",
  "Música popular brasileira",
  "Musique concrète",
  "Muwashshah",
  "Muzak",
  "Nagauta",
  "Nakasi",
  "Nangma",
  "Nanguan music",
  "Narcocorrido",
  "Nardcore",
  "Narodna muzika",
  "Nasheed",
  "Nashville sound",
  "National Socialist black metal",
  "Nazi punk",
  "Nederpop",
  "Neoclassical",
  "Neoclassical dark wave",
  "Neo-classical metal",
  "Neoclassical new age",
  "Neo kyma",
  "Neofolk",
  "Neo-Medieval music",
  "Neo-prog",
  "Neo-psychedelia",
  "Neo soul",
  "Neotraditional country",
  "Nerdcore",
  "Neue Deutsche Härte",
  "Neue Deutsche Welle",
  "Neue Deutsche Todeskunst",
  "Neurofunk",
  "New-age music",
  "New Beat",
  "New jack swing",
  "New Mexico music",
  "New Orleans blues",
  "New Orleans rhythm and blues",
  "New prog",
  "New rave",
  "Odissi / Odia / Odissa",
  "New school hip hop",
  "New Taiwanese Song",
  "New wave music",
  "New wave of new wave",
  "New Weird America",
  "Nintendocore",
  "Nisiotika",
  "No wave",
  "Noh",
  "Noise music",
  "Noise pop",
  "Noise rock",
  "Nordic folk music",
  "Nortec",
  "Norteño",
  "Northern soul",
  "Nu-disco",
  "Nu-funk",
  "Nu gaze",
  "Nu jazz",
  "Nu metal",
  "Nu skool breaks",
  "Nueva canción",
  "Nuevo tango",
  "Obscuro",
  "Obikhod",
  "Oi!",
  "Old-school hip hop",
  "Old Roman chant",
  "Old-time music",
  "Oldies",
  "Olonkho",
  "Old Time Radio",
  "Ondo",
  "Opera",
  "Operatic pop",
  "Operetta",
  "Oratorio",
  "Orchestra",
  "Bryan Adams Songs",
  "Orchestral pop",
  "Organ trio",
  "Organic ambient music",
  "Organum",
  "Oriental metal",
  "Orthodox",
  "Ottava rima",
  "Ottoman military band",
  "Outlaw country",
  "Outsider music",
  "P-Funk",
  "Karaoke",
  "Pachanga",
  "Pagan metal",
  "Pagan rock",
  "Pagode",
  "Paisley Underground",
  "Palm wine music",
  "Panambih",
  "Panchai baja",
  "Panchavadyam",
  "Pansori",
  "Paraguayan polka",
  "Paranda music",
  "Parranda",
  "Parody music",
  "Pambiche",
  "Parang",
  "Partido alto",
  "Pasacalle",
  "Pasillo",
  "Pasodoble",
  "Payada",
  "Peace Punk",
  "Pelimanni music",
  "Persian traditional music",
  "Peruvian cumbia",
  "Petenera",
  "Peyote Song",
  "Philadelphia soul",
  "Pibroch",
  "Piedmont blues",
  "Pilipino",
  "Pimba",
  "Pinoy rock",
  "Pinpeat orchestra",
  "Piphat",
  "Pirate metal",
  "Piyyutim",
  "Plainsong",
  "Plena",
  "Pleng phua cheewit",
  "Pleng Thai sakorn",
  "Plus 8",
  "Political hip hop",
  "Polka",
  "Polo",
  "Polonaise",
  "Pols",
  "Polska",
  "Pong lang",
  "Pop folk",
  "Pop music",
  "Pop punk",
  "Pop rap",
  "Pop rock",
  "Pop sunda",
  "Popular music",
  "Pornocore",
  "Pornogrind",
  "Porro",
  "Post-bop",
  "Post-Britpop",
  "Post-dubstep",
  "Post-disco",
  "Post-grunge",
  "Post-hardcore",
  "Post-industrial",
  "Post-metal",
  "Post-minimalism",
  "Postmodern music",
  "Post-punk",
  "Post-punk revival",
  "Post-rock",
  "Post-romanticism",
  "Powada",
  "Power electronics",
  "Power metal",
  "Power noise",
  "Power pop",
  "Power trio",
  "Powerviolence",
  "Pow-wow",
  "Ppongtchak",
  "Praise song",
  "Program symphony",
  "Progressive electronic music",
  "Progressive folk music",
  "Progressive house",
  "Progressive metal",
  "Progressive music",
  "Progressive pop",
  "Progressive rock",
  "Progressive trance",
  "Prostopinije",
  "Proto-punk",
  "Psychedelic music",
  "Psychedelic folk",
  "Psychedelic funk",
  "Psychedelic pop",
  "Psychedelic rock",
  "Psychedelic soul",
  "Psychedelic trance",
  "Psychobilly",
  "Pub rock",
  "Pungmul",
  "Punk blues",
  "Punk Cabaret",
  "Punk jazz",
  "Punk rock",
  "Punta",
  "Punta rock",
  "Puya",
  "Quan ho",
  "Qasidah",
  "Qasidah modern",
  "Qawwali",
  "Qin",
  "Quadrille",
  "Queercore",
  "Quiet Storm",
  "Raga rock",
  "Raga",
  "Raggamuffin",
  "Ragga Jungle",
  "Ragtime",
  "Rai",
  "Raicore",
  "Raï'n'B",
  "Rake-and-scrape",
  "Ramkbach",
  "Ramvong",
  "Ranchera",
  "Rapping",
  "Rapso",
  "Rap metal",
  "Rap rock",
  "Rara music",
  "Rare groove",
  "Rasiya",
  "Ravanahatha",
  "Rave music",
  "Rebetiko",
  "Red Dirt (music)",
  "reel",
  "Reggae",
  "Reggae fusion",
  "Reggae highlife",
  "Reggaeton",
  "Rekilaulu",
  "Religious music",
  "Renaissance music",
  "Retro / Old (Western / English)",
  "Requiem music",
  "Rhapsody",
  "Rhumba",
  "Rhyming spiritual",
  "Rhythm and blues",
  "Ricercar",
  "Rímur",
  "Ringbang",
  "Riot grrrl",
  "Rock music",
  "Rock opera",
  "Rock and roll",
  "Rock en español",
  "Rockabilly",
  "Rocksteady",
  "Rococo",
  "Rōkyoku",
  "Romani music",
  "Romantic period in music",
  "Ronggeng",
  "Roots reggae",
  "Roots rock",
  "Roots rock reggae",
  "Rumba",
  "Sabar",
  "Sacred Harp",
  "Sadcore",
  "Salsa dura",
  "Salsa music",
  "Salsa romántica",
  "Saltarello",
  "Samba",
  "Samba-canção",
  "Samba-reggae",
  "Samba rock",
  "Sambai",
  "Sambass",
  "Sampledelia",
  "Sampling",
  "Sanjo",
  "Sârbă",
  "Sardana",
  "Sato kagura",
  "Sawt",
  "Saya",
  "Schlager music",
  "Schottische",
  "Scottish Baroque music",
  "Scottish folk music",
  "Scrumpy and Western",
  "Screamo",
  "Sea shanty",
  "Sean-nós singing",
  "Seapunk",
  "Second Viennese School",
  "Sega music",
  "Seggae",
  "Seis",
  "Semba",
  "Sephardic music",
  "Serialism",
  "Sertanejo music",
  "Set dance",
  "Sevdalinka",
  "Sevillana",
  "Shabda",
  "Shalakho",
  "Shan'ge",
  "Shibuya-kei",
  "Shidaiqu",
  "Shima-uta",
  "Shock rock",
  "Shoegaze",
  "Shōka",
  "Shomyo",
  "Shota",
  "Show tune",
  "Siguiriyas",
  "Silat",
  "Sinawi",
  "Sindhi",
  "Singer-songwriter",
  "Ska",
  "Ska punk",
  "Skald",
  "Skate punk",
  "Skweee",
  "Skiffle",
  "Skyladiko",
  "Skullstep",
  "Slack-key guitar",
  "Slängpolska",
  "Slide music",
  "Slowcore",
  "Sludge metal",
  "Smooth jazz",
  "Smooth soul",
  "Soca music",
  "Soft rock",
  "Son-batá",
  "Son cubano",
  "Son montuno",
  "Sonata",
  "Songo music",
  "Songo-salsa",
  "Sophisti-pop",
  "Soukous",
  "Soul blues",
  "Soul jazz",
  "Soul music",
  "Sound poetry",
  "Soundtrack",
  "Southern Gospel",
  "Southern Gothic music",
  "Southern Harmony",
  "Southern hip hop",
  "Southern metal",
  "Southern rock",
  "Southern soul",
  "Sovietwave",
  "Space age pop",
  "Space disco",
  "Space music",
  "Space rock",
  "Spectralism",
  "Speedcore",
  "Speed metal",
  "Spirituals",
  "Spoken word",
  "Spouge",
  "Sprechgesang",
  "Square dance",
  "St. Louis blues",
  "Steelband",
  "Stoner metal",
  "Stoner rock",
  "Straight edge music",
  "Strathspey",
  "Stride",
  "String music",
  "String quartet",
  "Sufi",
  "Suite",
  "Sunshine pop",
  "Suomirock",
  "Super Eurobeat",
  "Surf music",
  "Swamp blues",
  "Swamp pop",
  "Swamp rock",
  "Swing",
  "Swing music",
  "Sygyt",
  "Symphonic black metal",
  "Symphonic metal",
  "Symphonic poem",
  "Symphonic rock",
  "Symphony",
  "Synth-pop",
  "Synth-punk",
  "Synthwave",
  "Syrian chant",
  "Taarab",
  "Tai tu",
  "Taiwanese opera",
  "Taiwanese pop",
  "Tala",
  "Talempong",
  "Talking blues",
  "Tamborito",
  "Tambu",
  "Tamburitza",
  "Tamil",
  "Tamil Christian keerthanai",
  "Táncház",
  "Tango music",
  "Tanguk",
  "Tappa",
  "Taqwacore",
  "Tarana",
  "Tarantella",
  "Tarantas",
  "Tech house",
  "Tech trance",
  "Technical death metal",
  "Technical metal",
  "Techno",
  "Technoid",
  "Telugu",
  "Techstep",
  "Techtonik",
  "Tecno brega",
  "Teen pop",
  "Tejano music",
  "Third Stream",
  "Tembang sunda",
  "Texas blues",
  "Theatre music",
  "Theme music",
  "Thillana",
  "Third wave ska",
  "Thirty-two-bar form",
  "Thrashcore",
  "Thrash metal",
  "Thumri",
  "Tibetan pop",
  "Tientos",
  "Timbila",
  "Tin Pan Alley",
  "Tinku",
  "Toeshey",
  "Togaku",
  "Tondero",
  "T'ong guitar",
  "Traditional bluegrass",
  "Traditional Nordic dance music",
  "Traditional pop",
  "Trallalero",
  "Trance music",
  "Trap music (EDM)",
  "Trap music (hip hop)",
  "Trival",
  "Tribal house",
  "Trikitixa",
  "Trip hop",
  "Tropicalia",
  "Tropical music",
  "Tropical house",
  "Tropipop",
  "Truck-driving country",
  "Tumba",
  "Turbo-folk",
  "Turntablism",
  "Tuvan throat-singing",
  "Twee pop",
  "Twelve-bar blues",
  "Twist",
  "Two-tone",
  "UK bass",
  "UK garage",
  "UK hardcore",
  "UK hard house",
  "Unblack metal",
  "Underground music",
  "Uplifting trance",
  "Urban Cowboy",
  "Urban Pasifika",
  "Vallenato",
  "Vaporwave",
  "Vaudeville",
  "Verbunkos",
  "Vedic / Musical Pheras",
  "Verismo",
  "Video game music",
  "Viking metal",
  "Villanella",
  "Virelais",
  "Visual kei",
  "Visual music",
  "Vocal house",
  "Vocal jazz",
  "Vocal music",
  "Vocaloid",
  "Volksmusik",
  "Waila",
  "Walking bass",
  "Wall of Sound",
  "Waltz",
  "Wangga",
  "Warabe uta",
  "Wassoulou music",
  "War song",
  "Waulking song",
  "Were music",
  "West Coast blues",
  "West Coast hip hop",
  "West Coast jazz",
  "Western blues",
  "Western swing",
  "Witch house",
  "Wizard rock",
  "Women's music",
  "Wong shadow",
  "Wonky",
  "Work song",
  "Worldbeat",
  "World music",
  "Xenomania",
  "Xoomii",
  "Xote",
  "Xhosa music",
  "Xylophonecore",
  "Yass",
  "Yayue",
  "Yé-yé",
  "Yo-pop",
  "Yodeling",
  "Youth crew",
  "Yukar",
  "Zajal",
  "Zamacueca",
  "Zamba",
  "Zamrock",
  "Zapin",
  "Zarzuela",
  "Zeuhl",
  "Zeibekiko",
  "Zef",
  "Ziglibithy",
  "Znamenny chant",
  "Zouglou",
  "Zouk",
  "Zouk Love",
  "Zulu music",
  "Zydeco",
  "Marathi",
  //Comedy Genres
  "Aggressive humour",
  "Alternative comedy",
  "Anecdotal comedy",
  "Anti-humor",
  "Black comedy",
  "Blue comedy",
  "Character comedy",
  "Cringe comedy",
  "Deadpan comedy",
  "Double act",
  "Gallows humor",
  "Improvisational comedy",
  "Insult comedy",
  "Musical comedy",
  "Observational comedy",
  "Physical comedy",
  "Prop comedy",
  "Satirical comedy",
  "Surreal humour",
  "Topical comedy",
  "Word play",
  "Slapstick comedy",
  "Situational comedy",
  "Stand-up comedy",
  "Sketch comedy",
  "Parody",
  "Spoof",
  "Farce",
  "Mockumentary",
  "One-line joke",
  "Practical joke",
  "Prank",
  "Slapstick",
  "Screwball comedy",
  "Romantic comedy",
  "Sitcom",
  "Clean Comedy",
  "Rap",
];

export default genreOptions;
