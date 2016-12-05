var mysql = require('../data/dbconnection.js');
var cheerio = require("cheerio");
var request = require("request");

var stopwords=["able","about","above","according","accordingly","across","actually","after","afterwards","again","against","ain’t","all","allow","allows","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren’t","around","as","aside","ask","asking","associated","at","available","away","awfully","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c’mon","c’s","came","can","can’t","cannot","cant","cause","causes","certain","certainly","changes","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn’t","course","currently","definitely","described","despite","did","didn’t","different","do","does","doesn’t","doing","don’t","done","down","downwards","during","each","edu","eg","eight","either","else","elsewhere","enough","entirely","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","far","few","fifth","first","five","followed","following","follows","for","former","formerly","forth","four","from","further","furthermore","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","had","hadn’t","happens","hardly","has","hasn’t","have","haven’t","having","he","he’s","hello","help","hence","her","here","here’s","hereafter","hereby","herein","hereupon","hers","herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i’d","i’ll","i’m","i’ve","ie","if","ignored","immediate","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","into","inward","is","isn’t","it","it’d","it’ll","it’s","its","itself","just","keep","keeps","kept","know","knows","known","last","lately","later","latter","latterly","least","less","lest","let","let’s","like","liked","likely","little","look","looking","looks","ltd","mainly","many","may","maybe","me","mean","meanwhile","merely","might","more","moreover","most","mostly","much","must","my","myself","name","namely","nd","near","nearly","necessary","need","needs","neither","never","nevertheless","new","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","particular","particularly","per","perhaps","placed","please","plus","possible","presumably","probably","provides","que","quite","qv","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","shouldn’t","since","six","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t’s","take","taken","tell","tends","th","than","thank","thanks","thanx","that","that’s","thats","the","their","theirs","them","themselves","then","thence","there","there’s","thereafter","thereby","therefore","therein","theres","thereupon","these","they","they’d","they’ll","they’re","they’ve","think","third","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","to","together","too","took","toward","towards","tried","tries","truly","try","trying","twice","two","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","value","various","very","via","viz","vs","want","wants","was","wasn’t","way","we","we’d","we’ll","we’re","we’ve","welcome","well","went","were","weren’t","what","what’s","whatever","when","whence","whenever","where","where’s","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","who’s","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","won’t","wonder","would","would","wouldn’t","yes","yet","you","you’d","you’ll","you’re","you’ve","your","yours","yourself","yourselves","zero","a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount", "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as", "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
module.exports.getScrapingData = function(req,res){
	
	var url = "https://www.google.com/search?q=";
	var text="";
	var corpus = {},
	totalResults = 0,
	resultsDownloaded = 0;
	
	text=req.params.text;
	text = text.split(' ').join('+');
	if(text==''){
		url=url+"health+care";
	}
	else{
		url=url+text;
	}
	console.log(url);
	
	
	// Ftch data
	request(url, function (error, response, body) {
		if (error) {
			console.log("Couldn’t get page because of error: " + error);
			return;
		}
		
		// load the body of the page into Cheerio so we can traverse the DOM
		var $ = cheerio.load(body),
			links = $(".r a");
			
		links.each(function (i, link) {
			// get the href attribute of each link
			var url = $(link).attr("href");
			
			// strip out unnecessary junk
			url = url.replace("/url?q=", "").split("&")[0];
			
			if (url.charAt(0) === "/") {
				return;
			}
			
			// this link counts as a result, so increment results
			totalResults++;
			
			// download that page
			request(url, function (error, response, body) {
				if (error) {
					console.log("Couldn’t get page because of error: " + error);
					return;
				}
				
				// load the page into cheerio
				var $page = cheerio.load(body),
					text = $page("body").text();
					
				// throw away extra whitespace and non-alphanumeric characters
				text = text.replace(/\s+/g, " ")
						   .replace(/[^a-zA-Z ]/g, "")
						   .toLowerCase();
				
				// split on spaces for a list of all the words on that page and 
				// loop through that list
				text.split(" ").forEach(function (word) {
					// we don't want to include very short or long words, as they're 
					// probably bad data
					if (word.length <= 4 || word.length >= 20) {
						return;
					}
					var found = false;
					for (var i = 0; i < stopwords.length && !found; i++) {
					  if (stopwords[i] === word) {
					    found = true;
					  }
					}
					if(found==true){return;}
					else{
					if (corpus[word]) {
						// if this word is already in our "corpus", our collection
						// of terms, increase the count by one
						corpus[word]++;
					} else {
						// otherwise, say that we've found one of that word so far
						corpus[word] = 1;
					}
					}
				});
				
				// and when our request is completed, call the callback to wrap up!
				resultsDownloaded++;
				if (resultsDownloaded !== totalResults) {
					return;
				}	
				var words = [];
				// stick all words in an array
				for (prop in corpus) {
					
					words.push({
						word: prop,
						count: corpus[prop]
					});
				}
				// sort array based on how often they occur
				words.sort(function (a, b) {
					return b.count - a.count;
				});
				// finally, log the first fifty most popular words
				console.log(words.slice(0, 50));
				res
				.status(200)
				.json(words.slice(0, 50));

			});
		});
	});
	
};
