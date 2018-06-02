var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:abcd1234@ds245680.mlab.com:45680/group2webproject');

var products = [
    new Product({
        image: '/images/products/D001.jpg',
        name: 'D001',
        desc: 'Khung đồng mang phong cách cung đình.',
        price: 200000,
        material: 'Đồng',
        width: 200,
        height: 300,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/D002.jpg',
        name: 'D002',
        desc: 'Khung đồng có hoạt tiết trang trí bắt mắt.',
        price: 250000,
        material: 'Đồng',
        width: 210,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/D003.jpg',
        name: 'D003',
        desc: 'Khung mang phong cách đơn giản.',
        price: 180000,
        material: 'Đồng',
        width: 230,
        height: 300,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/D004.jpg',
        name: 'D004',
        desc: 'Khung mỏng nhưng vẫn gây được ấn tượng với vẻ ngoài sang trọng.',
        price: 230000,
        material: 'Đồng',
        width: 200,
        height: 300,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/D005.jpg',
        name: 'D005',
        desc: 'Khung đồng đơn giản.',
        price: 210000,
        material: 'Đồng',
        width: 300,
        height: 200,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/D006.jpg',
        name: 'D006',
        desc: 'Khung với các hoạt tiết cầu kì, lộng lẫy.',
        price: 180000,
        material: 'Đồng',
        width: 300,
        height: 210,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/G001.jpg',
        name: 'G001',
        desc: 'Khung gỗ đơn giản với họa tiết bốn góc.',
        price: 160000,
        material: 'Gỗ',
        width: 300,
        height: 240,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/G002.jpg',
        name: 'G002',
        desc: 'Khung gỗ đen đơn giản.',
        price: 140000,
        material: 'Gỗ',
        width: 220,
        height: 300,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/G003.jpg',
        name: 'G003',
        desc: 'Khung gỗ rộng đơn giản.',
        price: 180000,
        material: 'Gỗ',
        width: 400,
        height: 210,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/G004.jpg',
        name: 'G004',
        desc: 'Khung gỗ phong cách thiên nhiên.',
        price: 140000,
        material: 'Gỗ',
        width: 330,
        height: 230,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/G005.jpg',
        name: 'G005',
        desc: 'Khung gỗ nâu đơn giản.',
        price: 170000,
        material: 'Gỗ',
        width: 240,
        height: 310,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/G006.jpg',
        name: 'G006',
        desc: 'Khung gỗ họa tiết.',
        price: 150000,
        material: 'Gỗ',
        width: 310,
        height: 220,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K001.jpg',
        name: 'K001',
        desc: 'Khung kính thường.',
        price: 240000,
        material: 'Kính',
        width: 300,
        height: 200,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K002.jpg',
        name: 'K002',
        desc: 'Khung kính với chốt cố định.',
        price: 220000,
        material: 'Kính',
        width: 250,
        height: 140,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K003.jpg',
        name: 'K003',
        desc: 'Khung kính dạng ép.',
        price: 210000,
        material: 'Kính',
        width: 300,
        height: 200,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K004.jpg',
        name: 'K004',
        desc: 'Khung kính rộng có chốt.',
        price: 280000,
        material: 'Kính',
        width: 400,
        height: 190,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K005.jpg',
        name: 'K005',
        desc: 'Khung kính đơn giản.',
        price: 260000,
        material: 'Kính',
        width: 250,
        height: 220,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K006.jpg',
        name: 'K006',
        desc: 'Khung kính 2 viền sang trọng.',
        price: 310000,
        material: 'Kính',
        width: 210,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/K007.jpg',
        name: 'K007',
        desc: 'Khung kính cách tân.',
        price: 360000,
        material: 'Kính',
        width: 250,
        height: 350,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N001.jpg',
        name: 'N001',
        desc: 'Khung nhựa đơn giản.',
        price: 140000,
        material: 'Nhựa',
        width: 210,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N002.jpg',
        name: 'N002',
        desc: 'Khung nhựa xanh họa tiết bốn góc.',
        price: 160000,
        material: 'Nhựa',
        width: 230,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N003.jpg',
        name: 'N003',
        desc: 'Khung nhựa đen đơn giản.',
        price: 140000,
        material: 'Nhựa',
        width: 200,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N004.jpg',
        name: 'N004',
        desc: 'Khung nhựa đơn giản.',
        price: 120000,
        material: 'Nhựa',
        width: 200,
        height: 260,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N005.jpg',
        name: 'N005',
        desc: 'Khung nhựa đen đơn giản.',
        price: 170000,
        material: 'Nhựa',
        width: 270,
        height: 200,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N006.jpg',
        name: 'N006',
        desc: 'Khung nhựa hoạt tiết.',
        price: 180000,
        material: 'Nhựa',
        width: 270,
        height: 210,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/N007.jpg',
        name: 'N007',
        desc: 'Khung nhựa xanh đơn giản.',
        price: 150000,
        material: 'Nhựa',
        width: 280,
        height: 220,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/S001.jpg',
        name: 'S001',
        desc: 'Khung sắt họa tiết bốn góc.',
        price: 240000,
        material: 'Sắt',
        width: 180,
        height: 260,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/S002.jpg',
        name: 'S002',
        desc: 'Khung sắt họa tiết hoa hồng.',
        price: 310000,
        material: 'Sắt',
        width: 220,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/S003.jpg',
        name: 'S003',
        desc: 'Sang trọng và đơn giản.',
        price: 210000,
        material: 'Sắt',
        width: 300,
        height: 230,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/S004.jpg',
        name: 'S004',
        desc: 'Khung sắt họa tiết viền.',
        price: 270000,
        material: 'Sắt',
        width: 280,
        height: 220,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/S005.jpg',
        name: 'S005',
        desc: 'Khung sắt sơn vàng.',
        price: 190000,
        material: 'Sắt',
        width: 210,
        height: 270,
        added: new Date(),
        status: true
    }),
    new Product({
        image: '/images/products/S006.jpg',
        name: 'S006',
        desc: 'Khung sắt được sơn màu gỗ.',
        price: 240000,
        material: 'Sắt',
        width: 210,
        height: 270,
        added: new Date(),
        status: true
    }),
];

var done = 0;
for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if (err)
        console.log(err);
        if (done === products.length){
            exit();
        }
    });
    
}
function exit(){
    mongoose.disconnect();
}
