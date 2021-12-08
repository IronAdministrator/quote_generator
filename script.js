const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Store Quotes from API in an Array:
let apiQuotes = [];

// Showing the Loader:
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
// Hiding the Loader:
const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Get New Quote:
const newQuote = () => {
  showLoadingSpinner();
  // Picking a random Quote from apiQuotes array:
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author is Blank & replace it with Unknown:
  !randomQuote.author
    ? (authorText.textContent = "Author is Unknown")
    : (authorText.textContent = randomQuote.author);

  // Check for Quote length & determine a styling:
  randomQuote.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  // Set Quote & Hide Loader:
  quoteText.textContent = randomQuote.text;
  removeLoadingSpinner();
};

// Get Quotes from API:
const getQuotes = async () => {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
    // complete();
  } catch (error) {
    getQuotes();
    console.log("No Quotes Found...", error);
  }
};

// Tweet a quote:
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Adding Event listeners:

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load:
getQuotes();

// Get localQuotes from local "quotes.js" file:

// const newQuote = () => {
//   // Picking a random Quote from apiQuotes array:
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// };
// newQuote();
