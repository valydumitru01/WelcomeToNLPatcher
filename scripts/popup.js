document.addEventListener('DOMContentLoaded', () => {
	const coffeeBtn = document.getElementById('coffeeBtn');
	// On click, open your PayPal.me link in a new tab/window
	coffeeBtn.addEventListener('click', () => {
		window.open('https://paypal.me/valentindmtr115', '_blank');
	});
});