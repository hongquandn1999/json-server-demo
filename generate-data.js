const faker = require('faker');
const fs = require('fs');

// Set locale to use Vietnamese
faker.locale = 'vi';

const randomCategoryList = (n) => {
	if (n <= 0) return;
	const categoryList = [];
	// loop and push category
	Array.from(new Array(n)).forEach(() => {
		const category = {
			id: faker.datatype.uuid(),
			name: faker.commerce.department(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		categoryList.push(category);
	});
	// return
	return categoryList;
};

const randomProductList = (categoryList, numberOfProduct) => {
	if (numberOfProduct <= 0) return [];
	const productList = [];
	// random data
	for (const category of categoryList) {
		Array.from(new Array(numberOfProduct)).forEach(() => {
			const product = {
				categoryId: category.id,
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: faker.commerce.price(),
				description: faker.commerce.productDescription(),
				image: faker.image.imageUrl(400, 400),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};

			productList.push(product);
		});
	}

	return productList;
};

// Random data
(() => {
	// random data
	const categoryList = randomCategoryList(5);
	const productList = randomProductList(categoryList, 5);
	// prepare db object
	const db = {
		categories: categoryList,
		products: productList,
		profile: [
			{
				id: 1,
				role: 'user',
			},
			{
				id: 2,
				role: 'admin',
			},
		],
	};
	// write data to db.json
	fs.writeFile('db.json', JSON.stringify(db), () => {
		console.log('Generate data successfully');
	});
})();
