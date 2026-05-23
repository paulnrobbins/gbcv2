/**
 * Grace Bible Church — Statement of Faith
 * 14 numbered beliefs with scripture references, sourced verbatim from
 * gbcdayton.org/about-us/statement-of-faith.
 *
 * Paul can edit this file in any text editor and push to deploy.
 * The /about/beliefs page renders these as an editorial scrollytell.
 */

export interface Belief {
  number: number;
  /** Roman numeral for editorial display (I, II, III...) */
  numeral: string;
  /** Short title — used as the section heading */
  title: string;
  /** Full statement body — flows as prose, may include sub-statements */
  body: string;
  /** Scripture references that anchor this belief */
  scriptures: string[];
}

export const beliefs: Belief[] = [
  {
    number: 1,
    numeral: 'I',
    title: 'The Authority of Scripture',
    body:
      'That the Holy Bible, composed of the Old and New Testaments, is of final and supreme authority in faith and life, and being inspired by God, is inerrant in the original writings.',
    scriptures: ['Hebrews 4:12', 'John 17:17', 'II Timothy 3:16-17', 'II Peter 1:20-21'],
  },
  {
    number: 2,
    numeral: 'II',
    title: 'The Triune God',
    body:
      'In God the Father, God the Son, and God the Holy Spirit; this Trinity being one God, eternally existing in three persons.',
    scriptures: ['Genesis 1:26', 'II Corinthians 13:14', 'Matthew 28:19'],
  },
  {
    number: 3,
    numeral: 'III',
    title: 'The Virgin Birth',
    body:
      'In the virgin birth of Jesus Christ, that He was born of the virgin Mary and begotten of the Holy Spirit.',
    scriptures: ['Isaiah 7:14', 'Matthew 1:18-25'],
  },
  {
    number: 4,
    numeral: 'IV',
    title: 'Creation, Humanity, and Marriage',
    body:
      'The origin of mankind was by decree of God in the act of creation as related in the book of Genesis; that mankind was created in the image of God immutably male and female; that marriage of one man and one woman is the one God-ordained relationship for sexual activity.',
    scriptures: [
      'Genesis 1:26-27',
      'Genesis 2:24',
      'Matthew 19:5',
      'Romans 1:26-29',
      'I Corinthians 6:9-11',
      'Ephesians 2:1-3',
      'Hebrews 13:4',
    ],
  },
  {
    number: 5,
    numeral: 'V',
    title: 'The Fall of Humanity',
    body:
      'The sin of Adam and Eve incurred physical and spiritual death, so that all human beings have an inherent sinful nature and are in need of a Savior for their reconciliation to God.',
    scriptures: ['Genesis 3:1-21', 'Romans 5:12', 'II Corinthians 5:21', 'Psalm 51:5'],
  },
  {
    number: 6,
    numeral: 'VI',
    title: 'Salvation Through Christ Alone',
    body:
      'The Lord Jesus Christ is the only Savior, that He was crucified for our sins as a voluntary representative and substitutionary sacrifice, and all who believe in Him are justified eternally on the grounds of His shed blood.',
    scriptures: ['Romans 3:24-26', 'Romans 5:8', 'Acts 4:12', 'Ephesians 2:8-10'],
  },
  {
    number: 7,
    numeral: 'VII',
    title: "Christ's Resurrection and Return",
    body:
      'In the resurrection of the crucified body of Jesus, in His ascension into Heaven, and in His personal return to receive the saints, to set up His kingdom on earth, and ultimately to establish His eternal reign in the new heaven and the new earth.',
    scriptures: ['John 20:1-29', 'Acts 1:9-11', 'I Thessalonians 4:13-18', 'Titus 2:11-14'],
  },
  {
    number: 8,
    numeral: 'VIII',
    title: 'The Eternal State',
    body:
      'In the bodily resurrection of all persons, the saved to eternal life and the unsaved to judgment and everlasting punishment.',
    scriptures: ['I Thessalonians 4:13-18', 'Revelation 20:5-15'],
  },
  {
    number: 9,
    numeral: 'IX',
    title: 'The Church',
    body:
      'The universal Church is an organism composed of all who have received Christ as Savior and consequently have been baptized by the Holy Spirit into one body, that the local church is an organization composed of believers united for worship, instruction, fellowship, missionary endeavor, and service to God and one another.',
    scriptures: [
      'Matthew 16:16-18',
      'Acts 2:42-47',
      'I Corinthians 12:12-27',
      'Ephesians 4:3-10',
    ],
  },
  {
    number: 10,
    numeral: 'X',
    title: 'The Holy Spirit in the Believer',
    body:
      "God the Holy Spirit baptizes the believer into the body of Christ and indwells him completely at conversion. As the believer's heart is yielded to the Holy Spirit, the believer's life increasingly evidences the fruit of the Spirit.",
    scriptures: ['I Corinthians 12:13', 'Ephesians 5:18', 'Galatians 5:22-23'],
  },
  {
    number: 11,
    numeral: 'XI',
    title: "The Lord's Supper",
    body:
      "The Lord's Supper is a symbolic ordinance commemorating Christ's death and should be open to all believers who are living in fellowship with Christ.",
    scriptures: ['Luke 22:19-20', 'I Corinthians 11:20-34'],
  },
  {
    number: 12,
    numeral: 'XII',
    title: 'Believer\u2019s Baptism',
    body:
      "Water baptism is an ordinance for the believer, symbolic of the believer's identification with Christ in His death, burial and resurrection, and with His Church, the body of Christ.",
    scriptures: ['Matthew 28:19', 'Acts 10:43-48', 'Romans 6:3-4'],
  },
  {
    number: 13,
    numeral: 'XIII',
    title: 'The Pursuit of Holiness',
    body:
      'Believers are to passionately pursue holiness and to purposefully abstain from sinful practices.',
    scriptures: ['Romans 12:1-2', 'II Corinthians 6:14-18', 'I Peter 1:14-16'],
  },
  {
    number: 14,
    numeral: 'XIV',
    title: 'Witness to Christ',
    body:
      'Believers are to confess Christ before others by their words and their consistent godly living.',
    scriptures: ['Acts 1:8', 'Matthew 28:19-20', 'Colossians 4:5-6', 'I Peter 3:15'],
  },
];
