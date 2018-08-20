var fs = require('fs');
var faker = require('faker');
var readline = require('linebyline');

// HELPER FUNCTIONS
const randomNumberGen = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
}

const appendLeading = (val) => {
  if(val < 10) {
    return `0${val}`;
  } else {
    return `${val}`
  }
}

const generateDates = () => {
  var arr = [];
  var year = randomNumberGen(2018, 2020);
  var month = randomNumberGen(1,12);
  var day = randomNumberGen(1,18);
  var day2 = day + randomNumberGen(3,10);

  var date1 = `${year}-${appendLeading(month)}-${appendLeading(day)}`;
  var date2 = `${year}-${appendLeading(month)}-${appendLeading(day2)}`;

  arr.push(date1, date2);

  return arr;
}

// node --max-old-space-size=8192 dataGen.js


const generateDate = () => {
  var year = randomNumberGen(2018, 2020);
  var month = randomNumberGen(1,12);
  var day = randomNumberGen(1,28);
  return `${year}-${appendLeading(month)}-${appendLeading(day)}`;
}

// LISTINGS
const generateProperties = () => {
  console.log('generateProperties');
  let cities = ["Ad lanto", "Agoura Hills", "Alameda", "Albany", "Alhambra", "Aliso Viejo", "Alturas", "Amador City", "American Canyon", "Anaheim", "Anderson", "Angels Camp", "Antioch", "Apple Valley", "Arcadia", "Arcata", "Arroyo Grande", "Artesia", "Arvin", "Atascadero", "Atherton", "Atwater", "Auburn", "Avalon", "Avenal", "Azusa", "Bakersfield", "Baldwin Park", "Banning", "Barstow", "Beaumont", "Bell", "Bell Gardens", "Bellflower", "Belmont", "Belvedere", "Benicia", "Berkeley", "Beverly Hills", "Big Bear Lake", "Biggs", "Bishop", "Blue Lake", "Blythe", "Bradbury", "Brawley", "Brea", "Brentwood", "Brisbane", "Buellton", "Buena Park", "Burbank", "Burlingame", "Calabasas", "Calexico", "California City", "Calimesa", "Calipatria", "Calistoga", "Camarillo", "Campbell", "Canyon Lake", "Capitola", "Carlsbad", "Carmel-by-the-Sea", "Carpinteria", "Carson", "Cathedral City", "Ceres", "Cerritos", "Chico", "Chino", "Chino Hills", "Chowchilla", "Chula Vista", "Citrus Heights", "Claremont", "Clayton", "Clearlake", "Cloverdale", "Clovis", "Coachella", "Coalinga", "Colfax", "Colma", "Colton", "Colusa", "Commerce", "Compton", "Concord", "Corcoran", "Corning", "Corona", "Coronado", "Corte Madera", "Costa Mesa", "Cotati", "Covina", "Crescent City", "Cudahy", "Culver City", "Cupertino", "Cypress", "Daly City", "Dana Point", "Danville", "Davis", "Del Mar", "Del Rey Oaks", "Delano", "Desert Hot Springs", "Diamond Bar", "Dinuba", "Dixon", "Dorris", "Dos Palos", "Downey", "Duarte", "Dublin", "Dunsmuir", "East Palo Alto", "Eastvale", "El Cajon", "El Centro", "El Cerrito", "El Monte", "El Segundo", "Elk Grove", "Emeryville", "Encinitas", "Escalon", "Escondido", "Etna", "Eureka", "Exeter", "Fairfax", "Fairfield", "Farmersville", "Ferndale", "Fillmore", "Firebaugh", "Folsom", "Fontana", "Fort Bragg", "Fort Jones", "Fortuna", "Foster City", "Fountain Valley", "Fowler", "Fremont", "Fresno", "Fullerton", "Galt", "Garden Grove", "Gardena", "Gilroy", "Glendale", "Glendora", "Goleta", "Gonzales", "Grand Terrace", "Grass Valley", "Greenfield", "Gridley", "Grover Beach", "Guadalupe", "Gustine", "Half Moon Bay", "Hanford", "Hawaiian Gardens", "Hawthorne", "Hayward", "Healdsburg", "Hemet", "Hercules", "Hermosa Beach", "Hesperia", "Hidden Hills", "Highland", "Hillsborough", "Hollister", "Holtville", "Hughson", "Huntington Beach", "Huntington Park", "Huron", "Imperial", "Imperial Beach", "Indian Wells", "Indio", "Industry", "Inglewood", "Ione", "Irvine", "Irwindale", "Isleton", "Jackson", "Jurupa Valley", "Kerman", "King City", "Kingsburg", "La Cañada Flintridge", "La Habra", "La Habra Heights", "La Mesa", "La Mirada", "La Palma", "La Puente", "La Quinta", "La Verne", "Lafayette", "Laguna Beach", "Laguna Hills", "Laguna Niguel", "Laguna Woods", "Lake Elsinore", "Lake Forest", "Lakeport", "Lakewood", "Lancaster", "Larkspur", "Lathrop", "Lawndale", "Lemon Grove", "Lemoore", "Lincoln", "Lindsay", "Live Oak", "Livermore", "Livingston", "Lodi", "Loma Linda", "Lomita", "Lompoc", "Long Beach", "Loomis", "Los Alamitos", "Los Altos", "Los Altos Hills", "Los Angeles", "Los Banos", "Los Gatos", "Loyalton", "Lynwood", "Madera", "Malibu", "Mammoth Lakes", "Manhattan Beach", "Manteca", "Maricopa", "Marina", "Martinez", "Marysville", "Maywood", "McFarland", "Mendota", "Menifee", "Menlo Park", "Merced", "Mill Valley", "Millbrae", "Milpitas", "Mission Viejo", "Modesto", "Monrovia", "Montague", "Montclair", "Monte Sereno", "Montebello", "Monterey", "Monterey Park", "Moorpark", "Moraga", "Moreno Valley", "Morgan Hill", "Morro Bay", "Mount Shasta", "Mountain View", "Murrieta", "Napa", "National City", "Needles", "Nevada City", "Newark", "Newman", "Newport Beach", "Norco", "Norwalk", "Novato", "Oakdale", "Oakland", "Oakley", "Oceanside", "Ojai", "Ontario", "Orange", "Orange Cove", "Orinda", "Orland", "Oroville", "Oxnard", "Pacific Grove", "Pacifica", "Palm Desert", "Palm Springs", "Palmdale", "Palo Alto", "Palos Verdes Estates", "Paradise", "Paramount", "Parlier", "Pasadena", "Paso Robles", "Patterson", "Perris", "Petaluma", "Pico Rivera", "Piedmont", "Pinole", "Pismo Beach", "Pittsburg", "Placentia", "Placerville", "Pleasant Hill", "Pleasanton", "Plymouth", "Point Arena", "Pomona", "Port Hueneme", "Porterville", "Portola", "Portola Valley", "Poway", "Rancho Cordova", "Rancho Cucamonga", "Rancho Mirage", "Rancho Palos Verdes", "Rancho Santa Margarita", "Red Bluff", "Redding", "Redlands", "Redondo Beach", "Redwood City", "Reedley", "Rialto", "Richmond", "Ridgecrest", "Rio Dell", "Rio Vista", "Ripon", "Riverbank", "Riverside", "Rocklin", "Rohnert Park", "Rolling Hills", "Rolling Hills Estates", "Rosemead", "Roseville", "Ross", "Sacramento", "St. Helena", "Salinas", "San Anselmo", "San Bernardino", "San Bruno", "San Carlos", "San Clemente", "San Diego", "San Dimas", "San Fernando", "San Francisco", "San Gabriel", "San Jacinto", "San Joaquin", "San Jose", "San Juan Bautista", "San Juan Capistrano", "San Leandro", "San Luis Obispo", "San Marcos", "San Marino", "San Mateo", "San Pablo", "San Rafael", "San Ramon", "Sand City", "Sanger", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Fe Springs", "Santa Maria", "Santa Monica", "Santa Paula", "Santa Rosa", "Santee", "Saratoga", "Sausalito"];
  var adjectives = ["cosy", "rustic", "vintage", "traditional", "contemporary", "breath-taking", "charming", "elegant", "luxurious", "picturesque", "minimalistic", "modern", "brand-new", "classic", "cute", "magnificent", "huge", "downtown", "single family", "residential"]
  var nouns =  ["historic landmark", "home", "home warranty", "homeowners insurance", "homestead", "house", "house boat", "property", "ranch", 'house']
  var emotions =  ["a blessing", "a daily joy", "a dream boat", "a dream come true", "a goddess", "a heart throb", "a loving friend", "a real-life fantasy", "accepting", "adorable", "adventurous", "affectionate", "agreeable", "alluring", "always there for me", "amazing", "an angel", "angelic", "artistic", "attentive", "attractive", "awe-inspiring", "beautiful", "beloved", "bewitching", "blessed", "brave", "breathtaking", "bright", "brilliant", "candid", "captivating", "careful", "caring", "charming", "cheeky", "cheerful", "classy", "clever", "committed", "compassionate", "complex", "confident", "considerate", "courageous", "crafty", "creative", "cuddly", "cultured", "curious", "curvy", "cute", "daring", "darling", "dazzling", "dedicated", "delicate", "delightful", "dependable", "disciplined", "down-to-earth", "dreamy", "dynamic", "easy-going", "easy-to-love", "lovable", "loved", "lovely", "loving", "loyal", "luminous", "luscious", "magical", "magnetic", "mature", "mesmerizing", "mischievous", "motivated", "musical", "my baby doll", "my beloved", "my best friend", "my confidante", "my dearest", "my dream girl", "my dream guy", "my everything", "my fantasy", "my favorite person", "my happiness", "my honey", "my joy in life", "my life partner", "my longtime crush", "my main man", "my main squeeze", "my other half", "my partner in crime", "my playmate", "my pride and joy", "my sanity", "my soul mate", "my strength", "my sunshine", "mysterious", "narcotic", "naughty", "no drama", "nurturing", "one-of-a-kind", "open-minded", "opinionated", "passionate", "patient", "perceptive", "perfect", "personable", "petite", "playful", "poetic", "positive", "precious", "pretty", "principled", "provocative"];
  
  let out = fs.createWriteStream('./propertiesData.csv', {flag: 'a'});
  let strIn = 'in'
  let counter = 1;
  for (var i = 0; i < emotions.length; i++) {
    for (var j = 0; j < adjectives.length; j++) {
      for (var k = 0; k < nouns.length; k++) {
        for (var l = 0; l < cities.length; l++) {
          out.write(`${counter},${emotions[i]} ${adjectives[j]} ${nouns[k]} ${strIn} ${cities[l]}\n`, 'utf-8');
          counter ++;
        }
      }
    }
  }
}



const generateUsers = () => {
  console.log('generateUsers');
  let out = fs.createWriteStream('./usersData.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${faker.internet.userName()}\n`, 'utf-8');
  }
  out.end();
}

const generateHosts = () => {
  console.log('generateHosts');
  let out = fs.createWriteStream('./hostsData.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${randomNumberGen(1,10000000)}\n`, 'utf-8');
  }
  out.end();
}

const generateReviews = () => {
  console.log('generateReviews');
  let out = fs.createWriteStream('./reviewsData.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${randomNumberGen(1,118)},${randomNumberGen(1,5)}\n`)
  }
  out.end();
}

const generateListings = () => {
  const rl = readline('./propertiesData.csv', {
    retainBuffer: true
  });
  console.log('generateListings');
  let out = fs.createWriteStream('./listingsData.csv', {flag: 'a'});
  rl.on('line', (line) => {
    const lineStr = line.toString();
    const lineSplit = lineStr.split(',');
    out.write(`${lineSplit[0]},${lineSplit[1]},${randomNumberGen(1,10000000)},${randomNumberGen(1,10000000)},${randomNumberGen(1,250)},${randomNumberGen(1,5)},${randomNumberGen(2,10)},${randomNumberGen(5,25)},${randomNumberGen(1,5)},${randomNumberGen(10,200)}\n`) 
  });
  
}

const generateBookedDates = () => {
  console.log('generateBookedDates');
  let out = fs.createWriteStream('./bookedDatesData.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    let dates = generateDates();
    out.write(`${i},${randomNumberGen(1,10000000)},${dates[0]},${dates[1]}\n`, 'utf-8');
    if(i === 2500000) {
      console.log(25);
    } else if(i === 5000000) {
      console.log(50);
    } else if(i === 7500000) {
      console.log(75);
    } else if (i === 10000000) {
      console.log(100);
    }
  }
  out.end();
}

const generateReservations = () => {
  console.log('generateReservations');
  let out = fs.createWriteStream('./reservationsData.csv', {flag: 'a'});
  for(var i = 1; i < 30000001; i++) {
    out.write(`${i},${randomNumberGen(1,10000000)},${randomNumberGen(1,10000000)},${randomNumberGen(1,5)},${randomNumberGen(1,7)},${40 + randomNumberGen(20,100)},${generateDate()}\n`, 'utf-8')
    if(i === 10000000) {
      console.log(10);
    } else if(i === 20000000) {
      console.log(20);
    } else if(i === 2500000) {
      console.log(25);
    } else if (i === 27000000) {
      console.log(27);
    }
  }
  out.end();
}


// generateProperties();
// generateUsers();
// generateHosts();
// generateReviews();
// generateListings();
// generateBookedDates();
// generateReservations();

// make 10M mongo files x 3. Each one will have the same listing info, but 3 sets of unique resrvations.

const generateJSON = () => {
  let out = fs.createWriteStream('./jsonData.json', {flag: 'a'});
  let counter = 1
  for(var i = 1; i < 100; i++) {
    let dates = generateDates();
    out.write(`{"id":${lineSplit[0]},"property_name":"${lineSplit[1]}","host_id":${randomNumberGen(1,8)},"host_username":"${faker.internet.userName()}","total_reviews":${randomNumberGen(1,118)},"avg_review_rating":${randomNumberGen(1,5)},"weekly_views":${randomNumberGen(1,50)},"min_stay":${randomNumberGen(1,6)},"max_guests":${randomNumberGen(2,9)},"fees":${randomNumberGen(20,40)},"tax_rate":${randomNumberGen(1,7)},"rate":${randomNumberGen(20,70)},"reservation":{"reservation_id":${counter},"guest_id":${1,10000000},"guest_username":"${faker.internet.userName()}","check_in":${dates[0]},"check_out":${dates[1]},"total_adults":${randomNumberGen(1,5)},"total_pups":${randomNumberGen(1,7)},"total_charge":${40 + randomNumberGen(20,100)}}},`, "utf-8");
    counter ++;
  }
  out.end()
}

// generateJSON()
const checkStart = (counter) => {
  if(counter === 1) {
    return '['
  } else {
    return '';
  }
}
const checkEnd = (counter) => {
  if (counter === 10000000) {
    return ']'
  } else {
    return ','
  }
}

const generateMongo = () => {
  const rl = readline('./propertiesData.csv', {
    retainBuffer: true
  });
  console.log('generateMongo');
  let counter = 1
  let out = fs.createWriteStream('./mongoData.json');
  rl.on('line', (line) => {
    const lineStr = line.toString();
    const lineSplit = lineStr.split(',');
    const dates = generateDates();
    out.write(`${checkStart(counter)}{"id":${lineSplit[0]},"property_name":"${lineSplit[1]}","host_id":${randomNumberGen(1,10000000)},"host_username":"${faker.internet.userName()}","total_reviews":${randomNumberGen(1,118)},"avg_review_rating":${randomNumberGen(1,5)},"weekly_views":${randomNumberGen(1,50)},"min_stay":${randomNumberGen(1,6)},"max_guests":${randomNumberGen(2,9)},"fees":${randomNumberGen(20,40)},"tax_rate":${randomNumberGen(1,7)},"rate":${randomNumberGen(20,70)},"reservation":{"reservation_id":${counter},"guest_id":${1,10000000},"guest_username":"${faker.internet.userName()}","check_in":"${dates[0]}","check_out":"${dates[1]}","total_adults":${randomNumberGen(1,5)},"total_pups":${randomNumberGen(1,7)},"total_charge":${40 + randomNumberGen(20,100)}}}${checkEnd(counter)}\n`, "utf-8");
    counter ++;
  });
  rl.on('line', (line) => {
    const lineStr = line.toString();
    const lineSplit = lineStr.split(',');
    const dates = generateDates();
    out.write(`{"id":${lineSplit[0]},"property_name":"${lineSplit[1]}","host_id":${randomNumberGen(1,8)},"host_username":"${faker.internet.userName()}","total_reviews":${randomNumberGen(1,118)},"avg_review_rating":${randomNumberGen(1,5)},"weekly_views":${randomNumberGen(1,50)},"min_stay":${randomNumberGen(1,6)},"max_guests":${randomNumberGen(2,9)},"fees":${randomNumberGen(20,40)},"tax_rate":${randomNumberGen(1,7)},"rate":${randomNumberGen(20,70)},"reservation":{"reservation_id":${counter},"guest_id":${1,10000000},"guest_username":"${faker.internet.userName()}","check_in":"${dates[0]}","check_out":"${dates[1]}","total_adults":${randomNumberGen(1,5)},"total_pups":${randomNumberGen(1,7)},"total_charge":${40 + randomNumberGen(20,100)}}}${checkEnd(counter)}\n`, "utf-8");
    counter ++;
  });
  rl.on('line', (line) => {
    const lineStr = line.toString();
    const lineSplit = lineStr.split(',');
    const dates = generateDates();
    out.write(`{"id":${lineSplit[0]},"property_name":"${lineSplit[1]}","host_id":${randomNumberGen(1,8)},"host_username":"${faker.internet.userName()}","total_reviews":${randomNumberGen(1,118)},"avg_review_rating":${randomNumberGen(1,5)},"weekly_views":${randomNumberGen(1,50)},"min_stay":${randomNumberGen(1,6)},"max_guests":${randomNumberGen(2,9)},"fees":${randomNumberGen(20,40)},"tax_rate":${randomNumberGen(1,7)},"rate":${randomNumberGen(20,70)},"reservation":{"reservation_id":${counter},"guest_id":${1,10000000},"guest_username":"${faker.internet.userName()}","check_in":"${dates[0]}","check_out":"${dates[1]}","total_adults":${randomNumberGen(1,5)},"total_pups":${randomNumberGen(1,7)},"total_charge":${40 + randomNumberGen(20,100)}}}${checkEnd(counter)}\n`, "utf-8");
    counter ++;
  });
  
}

const generateMongoReservations = () => {
  let out = fs.createWriteStream('./mongoReservationsData.json');
  for(var i = 1; i < 30000001; i++) {
    const dates = generateDates();
    out.write(`${checkStart(i)}{"_id":${i},"guest_id":${randomNumberGen(1,10000000)},"guest_username":"${faker.internet.userName()}","check_in":"${dates[0]}","check_out":"${dates[1]}","total_adults":${randomNumberGen(1,5)},"total_pups":${randomNumberGen(1,7)},"total_charge":${40 + randomNumberGen(20,100)}}${checkEnd(i)}\n`, "utf-8")
  }
  out.end();
}

const generateMongoListings = () => {
  const rl = readline('./propertiesData.csv', {
    retainBuffer: true
  });
  let counter = 1;
  let out = fs.createWriteStream('./mongoListingsData.json');
  rl.on('line', (line) => {
    const lineStr = line.toString();
    const lineSplit = lineStr.split(',');
    out.write(`${checkStart(counter)}{"id":${lineSplit[0]},"property_name":"${lineSplit[1]}","host_id":${randomNumberGen(1,10000000)},"host_username":"${faker.internet.userName()}","total_reviews":${randomNumberGen(1,118)},"avg_review_rating":${randomNumberGen(1,5)},"weekly_views":${randomNumberGen(1,50)},"min_stay":${randomNumberGen(1,6)},"max_guests":${randomNumberGen(2,9)},"fees":${randomNumberGen(20,40)},"tax_rate":${randomNumberGen(1,7)},"rate":${randomNumberGen(20,70)},"reservation":[${counter}, ${counter + 10000000}, ${counter + 20000000}]}${checkEnd(counter)}\n`, "utf-8");
    counter ++;
  });
}


generateMongoListings()

// generateMongoReservations();



// generateMongo();

// generateExample()


