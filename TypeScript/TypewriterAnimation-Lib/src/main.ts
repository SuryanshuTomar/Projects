import "./css/style.css";
import Typewriter from "./Typewriter";

// Typwriter Example -
// create an element for typewriter animation
const div = document.createElement("div");
document.body.append(div);

// Initialize Typewriter
// const typewriter = new Typewriter(div);
const typewriter = new Typewriter(div, {
	loop: true,
	typingSpeed: 10,
	deletingSpeed: 10,
});

// Start Animation
typewriter
	.typeString("Where do I start?")
	.pauseFor(1000)
	.typeString("\n\nfunctio")
	.deleteChars(7)
	.typeString("const temp")
	.pauseFor(150)
	.deleteAll()
	.typeString("Why is this so hard?")
	.pauseFor(1000)
	.typeString("\n\nDoes everyone struggle this much?")
	.pauseFor(1000)
	.typeString("\n\nThere has to be an easier way")
	.pauseFor(1000)
	.deleteAll(50)
	.typeString(
		`\n\n" I'll leave that up to the me of five seconds from now on!!!"`
	)
	.pauseFor(1000)
	.deleteAll(50)
	.start();

// ---------------------------------------------------------------------------------------------------
// Quotes Example -
const div2 = document.createElement("div");
document.body.append(div2);
const quotes = new Typewriter(
	div2
	//   , {
	// 	loop: true,
	// 	typingSpeed: 100,
	// 	deletingSpeed: 100,
	// }
);

const quotesArr = [
	"“I always hated the fact that I was never blessed with any magic. But in place of that, I was blessed with wonderful teammates.” – Asta",
	"“Quit giving up! What you’re doing right now is running away! You just stopped thinking and locked yourself up in darkness because it’s easier that way!” -Asta",
	"“Even if you weren’t chosen, even if you weren’t wanted, even if you aren’t forgiven… You need to stand your ground no matter how pathetic you are!” – Asta",
	"“I’ve been facing adversity from the day I was born! No matter how many of you there are, or what happens, I’ll overcome it all.” – Asta",
	"“If you don’t give up, you’ll get through.” – Asta",
	"“Even if you think you might lose, you’ll be fine as long as you don’t give up! Surpass your limits. Then a path will open up for you!” – Yami",
];

// start animation
quotes.typeStringArr(quotesArr).start();
