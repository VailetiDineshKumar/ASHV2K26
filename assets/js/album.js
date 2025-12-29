function createFlippingBook(albumData, containerId) {
	const container = document.getElementById(containerId);
	if (!container) {
		console.error("Container not found:", containerId);
		return;
	}

	const prevBtn = document.querySelector(".albprev-btn");
	const nextBtn = document.querySelector(".albnext-btn");

	container.style.setProperty("--total-pages", albumData.length * 2); // Set total pages

	albumData.forEach((page, index) => {
		const pageDiv = document.createElement("div");
		pageDiv.className = "page";
		pageDiv.style.setProperty("--i", index); // Set index

		const frontDiv = document.createElement("div");
		frontDiv.className = "front";
		const frontImg = document.createElement("img");
		frontImg.src = page.front;
		frontImg.alt = page.frontAlt || `Page ${index + 1} Front`;
		frontImg.loading = "lazy"; // Lazy loading
		frontDiv.appendChild(frontImg);
		pageDiv.appendChild(frontDiv);

		const backDiv = document.createElement("div");
		backDiv.className = "back";
		const backImg = document.createElement("img");
		backImg.src = page.back;
		backImg.alt = page.backAlt || `Page ${index + 1} Back`;
		backImg.loading = "lazy"; // Lazy loading
		backDiv.appendChild(backImg);
		pageDiv.appendChild(backDiv);

		container.appendChild(pageDiv);
	});

	const flipBook = (elBook) => {
		elBook.style.setProperty("--c", 0); // Set current page
		elBook.querySelectorAll(".page").forEach((page, idx) => {
			page.style.setProperty("--i", idx);
			page.addEventListener("click", (evt) => {
				if (evt.target.closest("a")) return;
				const curr = evt.target.closest(".back") ? idx : idx + 1;
				elBook.style.setProperty("--c", curr);
				console.log(`Page clicked: ${idx}, Current page: ${curr}`);
			});
		});
	};

	flipBook(container);

	let currentPage = 0;
	const totalPages = albumData.length * 2; // Each albumData entry has a front and back

	nextBtn.addEventListener("click", () => {
		if (currentPage < totalPages - 1) {
			currentPage++;
			container.style.setProperty("--c", currentPage);
			console.log(`Next button clicked, Current page: ${currentPage}`);
		}
	});

	prevBtn.addEventListener("click", () => {
		if (currentPage > 0) {
			currentPage--;
			container.style.setProperty("--c", currentPage);
			console.log(
				`Previous button clicked, Current page: ${currentPage}`
			);
		}
	});
}

const myAlbumData = [
	{ front: "assets/images/1.jpg", back: "assets/images/2.jpg" },
	{ front: "assets/images/3.jpg", back: "assets/images/4.jpg" },
	{ front: "assets/images/5.jpg", back: "assets/images/6.jpg" },
	{ front: "assets/images/7.jpg", back: "assets/images/8.jpg" },
	{ front: "assets/images/9.jpg", back: "assets/images/10.jpg" },
	{ front: "assets/images/11.jpg", back: "assets/images/12.jpg" },
	{ front: "assets/images/13.jpg", back: "assets/images/14.jpg" },
	{ front: "assets/images/15.jpg", back: "assets/images/16.jpg" },
	{ front: "assets/images/17.jpg", back: "assets/images/18.jpg" },
	{ front: "assets/images/19.jpg", back: "assets/images/20.jpg" },
];

createFlippingBook(myAlbumData, "flipbook");

function isElementVisible(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom  <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <=
			(window.innerWidth || document.documentElement.clientWidth) + 5
	);
}

function nextClick() {
	if (isElementVisible(document.querySelector(".album-section"))) {
		const nextBtn = document.querySelector(".albnext-btn");
		nextBtn.click();
		window.removeEventListener("scroll", nextClick);
	}
}

window.addEventListener("scroll", nextClick);
