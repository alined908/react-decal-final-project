const TrackAttributes = {
  attributes: [
    {
      name: "Acousticness",
      description: "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      name: "Danceability",
      description: "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      name: "Energy",
      description: "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.",
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      name: "Instrumentalness",
      description: "Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content.",
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      name: "Liveness",
      description: "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      name: "Speechiness",
      description: "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value.",
      min: 0,
      max: 1,
      step: 0.1
    },
    {
      name: "Popularity",
      description: "The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. ",
      min: 0,
      max: 100,
      step: 10
    },
    {
      name: "Valence",
      description: "	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
      min: 0,
      max: 1,
      step: 0.1
    }
  ]
}

export default TrackAttributes
