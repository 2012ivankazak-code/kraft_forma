const fs = require('fs');
const path = require('path');

const b64 = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/opt/images_b64.json'), 'utf8'));

let html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Replace hero image in template
const heroKey = 'hero_scandinavian_craft_1792703705775.jpg';
const valetKey = 'product_concrete_oak_valet_1792703706861.jpg';
const planterKey = 'product_concrete_planter_1792703707239.jpg';
const lampKey = 'product_steel_lamp_1792703707989.jpg';
const boardKey = 'product_magnetic_board_1792703707927.jpg';

// Define global image map in script
const imgConstants = `
      // EMBEDDED HIGH-RESOLUTION IMAGES (Self-contained in single HTML file)
      const IMAGES = {
        hero: '${b64[heroKey]}',
        valet: '${b64[valetKey]}',
        planter: '${b64[planterKey]}',
        lamp: '${b64[lampKey]}',
        board: '${b64[boardKey]}',
      };
`;

// Inject into script
html = html.replace('// PRODUCT DATA', imgConstants + '\n      // PRODUCT DATA');

// Replace image references in PRODUCTS and REELS
html = html.replace("image: './assets/images/product_concrete_oak_valet_1792703706861.jpg'", 'image: IMAGES.valet');
html = html.replace("image: './assets/images/product_concrete_planter_1792703707239.jpg'", 'image: IMAGES.planter');
html = html.replace("image: './assets/images/product_steel_lamp_1792703707989.jpg'", 'image: IMAGES.lamp');
html = html.replace("image: './assets/images/product_magnetic_board_1792703707927.jpg'", 'image: IMAGES.board');

html = html.replace("thumbnail: './assets/images/product_concrete_oak_valet_1792703706861.jpg'", 'thumbnail: IMAGES.valet');
html = html.replace("thumbnail: './assets/images/product_magnetic_board_1792703707927.jpg'", 'thumbnail: IMAGES.board');
html = html.replace("thumbnail: './assets/images/product_magnetic_board_1792703707927.jpg'", 'thumbnail: IMAGES.board');
html = html.replace("thumbnail: './assets/images/product_steel_lamp_1792703707989.jpg'", 'thumbnail: IMAGES.lamp');

// Replace inline HTML src attributes
html = html.replace('src="./assets/images/hero_scandinavian_craft_1792703705775.jpg"', `src="${b64[heroKey]}"`);
html = html.replace('src="./assets/images/product_concrete_oak_valet_1792703706861.jpg"', `src="${b64[valetKey]}"`);
html = html.replace('src="./assets/images/product_concrete_oak_valet_1792703706861.jpg"', `src="${b64[valetKey]}"`);

fs.writeFileSync(path.join(__dirname, '../index.html'), html, 'utf8');
console.log('index.html updated successfully. Size:', (fs.statSync(path.join(__dirname, '../index.html')).size / 1024).toFixed(1) + ' KB');
