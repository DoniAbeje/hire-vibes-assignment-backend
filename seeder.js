const env = require('dotenv');
env.config();

const mongoose = require('mongoose');
let filmCollection;
let commentCollection;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION);
  filmCollection = mongoose.connection.collection('films');
  commentCollection = mongoose.connection.collection('comments');
  await truncateDb();
  await seed();
}

async function seed() {
  const firstFilm = {
    slug: 'spider-man-no-way-home',
    photo:
      'https://firebasestorage.googleapis.com/v0/b/test-project-706e3.appspot.com/o/1642596820698.jpg?alt=media&token=d5b3c934-0b4a-403a-bd14-64afd841746e',
    genre: ['Horror'],
    country: 'England',
    ticketPrice: 60.99,
    rating: 4,
    releaseDate: new Date('2022-01-15T00:00:00.000Z'),
    description:
      'Set in utopian Piltover and the oppressed underground of Zaun. the story follows the origins of two iconic League champions-and the power that will tear them apart.',
    name: 'Spider-Man: No Way Home',
  };

  const secondFilm = {
    slug: 'game-of-thrones',
    photo:
      'https://firebasestorage.googleapis.com/v0/b/test-project-706e3.appspot.com/o/1642596690234.jpg?alt=media&token=76b930cc-a319-45ee-8748-c63a9d06003f',
    genre: ['Drama'],
    country: 'Brasil',
    ticketPrice: 33.5,
    rating: 3,
    releaseDate: new Date('2022-01-14T00:00:00.000Z'),
    description:
      "Nine noble families wage war against each other in order to gain control over the mythical land of Westeros. Meanwhile, a force is rising after millenniums and threatens mens' existence.",
    name: 'Game of Thrones',
  };

  const thirdFilm = {
    slug: 'avengers-endgame',
    photo:
      'https://firebasestorage.googleapis.com/v0/b/test-project-706e3.appspot.com/o/1642620033769.jpg?alt=media&token=cceacef5-c41a-481b-974d-d183df690e43',
    genre: ['Action', 'Sci-Fi'],
    country: 'USA',
    ticketPrice: 20.4,
    rating: 2,
    releaseDate: new Date('2019-02-01T00:00:00.000Z'),
    description:
      'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
    name: 'Avengers: Endgame',
  };

  const films = [firstFilm, secondFilm, thirdFilm];
  console.log('Inserting new documents...');
  for (let x = 0; x < films.length; x++) {
    const result = await filmCollection.insertOne(films[x]);
    await commentCollection.insertOne({
      comment: 'Nice movie!! Like it',
      name: 'Michael',
      filmId: result.insertedId.toHexString(),
    });
  }
  console.log('DB Seed Complete');
  await mongoose.disconnect();
}

async function truncateDb() {
  console.log('Removing documents...');
  await commentCollection.deleteMany({});
  await filmCollection.deleteMany({});
}
