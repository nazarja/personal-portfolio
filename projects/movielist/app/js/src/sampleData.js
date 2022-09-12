
/*
==================================================================
    SAMPLE LIST DATA
==================================================================
*/

const mylists = {
    movies: [
      {
        "vote_count": 1497,
        "id": 335983,
        "video": false,
        "vote_average": 6.6,
        "title": "Venom",
        "popularity": 401.758,
        "poster_path": "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
        "original_language": "en",
        "original_title": "Venom",
        "genre_ids": [
          878,
          28,
          80,
          28,
          27
        ],
        "backdrop_path": "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
        "adult": false,
        "overview": "When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego \"Venom\" to save his life.",
        "release_date": "2018-10-03"
      },
      {
        "vote_count": 922,
        "id": 332562,
        "video": false,
        "vote_average": 7.5,
        "title": "A Star Is Born",
        "popularity": 196.325,
        "poster_path": "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
        "original_language": "en",
        "original_title": "A Star Is Born",
        "genre_ids": [
          18,
          10402,
          10749
        ],
        "backdrop_path": "/840rbblaLc4SVxm8gF3DNdJ0YAE.jpg",
        "adult": false,
        "overview": "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
        "release_date": "2018-10-03"
      },
      {
        "vote_count": 533,
        "id": 445651,
        "video": false,
        "vote_average": 6.8,
        "title": "The Darkest Minds",
        "popularity": 83.035,
        "poster_path": "/94RaS52zmsqaiAe1TG20pdbJCZr.jpg",
        "original_language": "en",
        "original_title": "The Darkest Minds",
        "genre_ids": [
          878,
          53
        ],
        "backdrop_path": "/5BxrMNGl3YDiWgHCVJu8iLQoJDM.jpg",
        "adult": false,
        "overview": "After a disease kills 98% of America's children, the surviving 2% develop superpowers and are placed in internment camps. A 16-year-old girl escapes her camp and joins a group of other teens on the run from the government.",
        "release_date": "2018-08-02"
      },
      {
        "vote_count": 639,
        "id": 346910,
        "video": false,
        "vote_average": 5.3,
        "title": "The Predator",
        "popularity": 167.001,
        "poster_path": "/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg",
        "original_language": "en",
        "original_title": "The Predator",
        "genre_ids": [
          27,
          878,
          28,
          53
        ],
        "backdrop_path": "/f4E0ocYeToEuXvczZv6QArrMDJ.jpg",
        "adult": false,
        "overview": "From the outer reaches of space to the small-town streets of suburbia, the hunt comes home. Now, the universe’s most lethal hunters are stronger, smarter and deadlier than ever before, having genetically upgraded themselves with DNA from other species. When a young boy accidentally triggers their return to Earth, only a ragtag crew of ex-soldiers and a disgruntled science teacher can prevent the end of the human race.",
        "release_date": "2018-09-13"
      },
      {
        "vote_count": 8889,
        "id": 299536,
        "video": false,
        "vote_average": 8.3,
        "title": "Avengers: Infinity War",
        "popularity": 145.885,
        "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        "original_language": "en",
        "original_title": "Avengers: Infinity War",
        "genre_ids": [
          12,
          878,
          28,
          14
        ],
        "backdrop_path": "/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg",
        "adult": false,
        "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
        "release_date": "2018-04-25"
      },
      {
        "vote_count": 147,
        "id": 424139,
        "video": false,
        "vote_average": 6.6,
        "title": "Halloween",
        "popularity": 131.422,
        "poster_path": "/lNkDYKmrVem1J0aAfCnQlJOCKnT.jpg",
        "original_language": "en",
        "original_title": "Halloween",
        "genre_ids": [
          27
        ],
        "backdrop_path": "/hO1oTBGNxO5fBKVEuWnSpICJH7c.jpg",
        "adult": false,
        "overview": "Laurie Strode comes to her final confrontation with Michael Myers, the masked figure who has haunted her since she narrowly escaped his killing spree on Halloween night four decades ago.",
        "release_date": "2018-10-18"
      },
      {
        "vote_count": 2912,
        "id": 363088,
        "video": false,
        "vote_average": 7,
        "title": "Ant-Man and the Wasp",
        "popularity": 124.999,
        "poster_path": "/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
        "original_language": "en",
        "original_title": "Ant-Man and the Wasp",
        "genre_ids": [
          28,
          12,
          878,
          10749,
          35,
          10751
        ],
        "backdrop_path": "/6P3c80EOm7BodndGBUAJHHsHKrp.jpg",
        "adult": false,
        "overview": "Just when his time under house arrest is about to end, Scott Lang puts again his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.",
        "release_date": "2018-07-04"
      },
      {
        "vote_count": 268,
        "id": 369972,
        "video": false,
        "vote_average": 7.3,
        "title": "First Man",
        "popularity": 123.269,
        "poster_path": "/i91mfvFcPPlaegcbOyjGgiWfZzh.jpg",
        "original_language": "en",
        "original_title": "First Man",
        "genre_ids": [
          36,
          18
        ],
        "backdrop_path": "/z1FkoHO7bz40S4JiptWHSYoPpxq.jpg",
        "adult": false,
        "overview": "A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.",
        "release_date": "2018-10-11"
      },
      {
        "vote_count": 1177,
        "id": 439079,
        "video": false,
        "vote_average": 5.8,
        "title": "The Nun",
        "popularity": 108.868,
        "poster_path": "/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg",
        "original_language": "en",
        "original_title": "The Nun",
        "genre_ids": [
          27,
          9648,
          53
        ],
        "backdrop_path": "/fgsHxz21B27hOOqQBiw9L6yWcM7.jpg",
        "adult": false,
        "overview": "When a young nun at a cloistered abbey in Romania takes her own life, a priest with a haunted past and a novitiate on the threshold of her final vows are sent by the Vatican to investigate. Together they uncover the order’s unholy secret. Risking not only their lives but their faith and their very souls, they confront a malevolent force in the form of the same demonic nun that first terrorized audiences in “The Conjuring 2,” as the abbey becomes a horrific battleground between the living and the damned.",
        "release_date": "2018-09-05"
      },
      {
        "vote_count": 266,
        "id": 454992,
        "video": false,
        "vote_average": 6.5,
        "title": "The Spy Who Dumped Me",
        "popularity": 104.198,
        "poster_path": "/2lIr27lBdxCpzYDl6WUHzzD6l6H.jpg",
        "original_language": "en",
        "original_title": "The Spy Who Dumped Me",
        "genre_ids": [
          28,
          35,
          12
        ],
        "backdrop_path": "/uN6v3Hz4qI2CIqT1Ro4vPgAbub3.jpg",
        "adult": false,
        "overview": "Audrey and Morgan are best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy.",
        "release_date": "2018-08-02"
      }
    ],
    tv_shows: [
      {
        "original_name": "The Flash",
        "genre_ids": [
          18,
          10765
        ],
        "name": "The Flash",
        "popularity": 186.911,
        "origin_country": [
          "US"
        ],
        "vote_count": 2304,
        "first_air_date": "2014-10-07",
        "backdrop_path": "/mmxxEpTqVdwBlu5Pii7tbedBkPC.jpg",
        "original_language": "en",
        "id": 60735,
        "vote_average": 6.7,
        "overview": "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only \"meta-human\" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash.",
        "poster_path": "/fki3kBlwJzFp8QohL43g9ReV455.jpg"
      },
      {
        "original_name": "The Walking Dead",
        "genre_ids": [
          18,
          10759,
          10765
        ],
        "name": "The Walking Dead",
        "popularity": 111.067,
        "origin_country": [
          "US"
        ],
        "vote_count": 3725,
        "first_air_date": "2010-10-31",
        "backdrop_path": "/xVzvD5BPAU4HpleFSo8QOdHkndo.jpg",
        "original_language": "en",
        "id": 1402,
        "vote_average": 7.3,
        "overview": "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
        "poster_path": "/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        "original_name": "Marvel's Iron Fist",
        "genre_ids": [
          80,
          18,
          10759,
          10765
        ],
        "name": "Marvel's Iron Fist",
        "popularity": 101.916,
        "origin_country": [
          "US"
        ],
        "vote_count": 695,
        "first_air_date": "2017-03-17",
        "backdrop_path": "/xHCfWGlxwbtMeeOnTvxUCZRGnkk.jpg",
        "original_language": "en",
        "id": 62127,
        "vote_average": 6.1,
        "overview": "Danny Rand resurfaces 15 years after being presumed dead. Now, with the power of the Iron Fist, he seeks to reclaim his past and fulfill his destiny.",
        "poster_path": "/nv4nLXbDhcISPP8C1mgaxKU50KO.jpg"
      },
      {
        "original_name": "The Big Bang Theory",
        "genre_ids": [
          35
        ],
        "name": "The Big Bang Theory",
        "popularity": 100.293,
        "origin_country": [
          "US"
        ],
        "vote_count": 3335,
        "first_air_date": "2007-09-24",
        "backdrop_path": "/nGsNruW3W27V6r4gkyc3iiEGsKR.jpg",
        "original_language": "en",
        "id": 1418,
        "vote_average": 6.8,
        "overview": "The Big Bang Theory is centered on five characters living in Pasadena, California: roommates Leonard Hofstadter and Sheldon Cooper; Penny, a waitress and aspiring actress who lives across the hall; and Leonard and Sheldon's equally geeky and socially awkward friends and co-workers, mechanical engineer Howard Wolowitz and astrophysicist Raj Koothrappali. The geekiness and intellect of the four guys is contrasted for comic effect with Penny's social skills and common sense.",
        "poster_path": "/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg"
      },
      {
        "original_name": "Grey's Anatomy",
        "genre_ids": [
          18
        ],
        "name": "Grey's Anatomy",
        "popularity": 91.075,
        "origin_country": [
          "US"
        ],
        "vote_count": 802,
        "first_air_date": "2005-03-27",
        "backdrop_path": "/y6JABtgWMVYPx84Rvy7tROU5aNH.jpg",
        "original_language": "en",
        "id": 1416,
        "vote_average": 6.3,
        "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
        "poster_path": "/mgOZSS2FFIGtfVeac1buBw3Cx5w.jpg"
      },
      {
        "original_name": "Arrow",
        "genre_ids": [
          80,
          18,
          9648,
          10759
        ],
        "name": "Arrow",
        "popularity": 90.244,
        "origin_country": [
          "US"
        ],
        "vote_count": 1989,
        "first_air_date": "2012-10-10",
        "backdrop_path": "/dKxkwAJfGuznW8Hu0mhaDJtna0n.jpg",
        "original_language": "en",
        "id": 1412,
        "vote_average": 6,
        "overview": "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow.",
        "poster_path": "/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg"
      },
      {
        "original_name": "Supernatural",
        "genre_ids": [
          18,
          9648,
          10765
        ],
        "name": "Supernatural",
        "popularity": 78.692,
        "origin_country": [
          "US"
        ],
        "vote_count": 1587,
        "first_air_date": "2005-09-13",
        "backdrop_path": "/koMUCyGWNtH5LXYbGqjsUwvgtsT.jpg",
        "original_language": "en",
        "id": 1622,
        "vote_average": 7.2,
        "overview": "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
        "poster_path": "/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg"
      },
      {
        "original_name": "The Simpsons",
        "genre_ids": [
          16,
          35
        ],
        "name": "The Simpsons",
        "popularity": 72.094,
        "origin_country": [
          "US"
        ],
        "vote_count": 1722,
        "first_air_date": "1989-12-17",
        "backdrop_path": "/lnnrirKFGwFW18GiH3AmuYy40cz.jpg",
        "original_language": "en",
        "id": 456,
        "vote_average": 7.1,
        "overview": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.",
        "poster_path": "/yTZQkSsxUFJZJe67IenRM0AEklc.jpg"
      },
      {
        "original_name": "Game of Thrones",
        "genre_ids": [
          18,
          10759,
          10765
        ],
        "name": "Game of Thrones",
        "popularity": 56.138,
        "origin_country": [
          "US"
        ],
        "vote_count": 4952,
        "first_air_date": "2011-04-17",
        "backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg",
        "original_language": "en",
        "id": 1399,
        "vote_average": 8.2,
        "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
        "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg"
      },
      {
        "original_name": "American Horror Story",
        "genre_ids": [
          18,
          9648,
          10765
        ],
        "name": "American Horror Story",
        "popularity": 55.545,
        "origin_country": [
          "US"
        ],
        "vote_count": 922,
        "first_air_date": "2011-10-05",
        "backdrop_path": "/ilKE2RPD8tkynAOHefX9ZclG1yq.jpg",
        "original_language": "en",
        "id": 1413,
        "vote_average": 6.9,
        "overview": "An anthology horror drama series centering on different characters and locations, including a house with a murderous past, an asylum, a witch coven, a freak show, a hotel, a farmhouse in Roanoke and a cult.",
        "poster_path": "/zheiOgPKDMvYjrCSrMLv8FSNJn4.jpg"
      }
    ]
  };

  // CONVERT OBJECT TO JSON
  // USE AS SAMPLE LISTS WHEN ALL LIST DELETED
  let sampleData = JSON.stringify(mylists);