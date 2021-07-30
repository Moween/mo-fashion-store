const products =  [
  {
    id:'P01',
    productName: 'The stripe gown',
    brandName: 'Orbie Wears',
    imageUrl: 'https://i.pinimg.com/564x/ec/54/c1/ec54c127c55603a90c7fc06440a6f84b.jpg',
    images: [
      {
        id: 'striped-gown1',
        src: 'https://i.pinimg.com/564x/ec/54/c1/ec54c127c55603a90c7fc06440a6f84b.jpg',
      },
      {
        id: 'striped-gown2',
        src: 'http://ladyfashioniser.com/wp-content/uploads/2019/08/Yelllow-White-Striped-Dresses-3.jpg',
      },
      {
        id: 'striped-gown3',
        src: 'http://ladyfashioniser.com/wp-content/uploads/2019/08/Yelllow-White-Striped-Dresses-2.jpg',
      },
    ],
    carouselId: 'FirstSeller',
    price: '$100.00',
    prevPrice: '$130.00',
    productDetails: 'The stripe gown is made of pure cotton',
    quantity: 1,
  },

  {
    id: 'P02',
    productName: 'Chiffon-top',
    brandName: 'Chinhu fashion',
    imageUrl: 'https://image.made-in-china.com/44f3j00PRNUYQjshpcJ/2021-New-Fashion-Spring-Ladies-Tops-Women-Long-Sleeves-Chiffon-Blouse.jpg',
    images: [
      {
        id: 'chiffon-top1',
        src: 'https://image.made-in-china.com/44f3j00PRNUYQjshpcJ/2021-New-Fashion-Spring-Ladies-Tops-Women-Long-Sleeves-Chiffon-Blouse.jpg',
      },
      {
        id: 'chiffon-top2',
        src: 'https://ae01.alicdn.com/kf/Hd4dff263c7624ab9b02d6c1f59784f58v/Women-Love-Printed-Chiffon-Shirt-Long-Sleeve-Chiffon-Peplum-Shirts-Female-Heart-Print-Peplum-Tops-Lady.jpg_q50.jpg',
      },
      {
        id: 'chiffon-top3',
        src: 'https://ae01.alicdn.com/kf/Hd38de711724e4b598ec5237a30120887f.jpg_350x350.jpg',
      }
    ],
    carouselId: 'SecondSeller',
    price: '$56.00',
    prevPrice: '$100.00',
    productDetails: 'A stylish chiffon-top that is cofortable on skin',
    quantity: 1,
  },

  {
    id: 'P03',
    productName: 'Bootcut-jean',
    brandName: 'Lorem collection',
    imageUrl: 'https://ae01.alicdn.com/kf/H6542a9ea0b5e4462b6801dbe3acf9239F/Women-Bootcut-Jeans-Stretch-Denim-Ladies-High-Waist-Casual-Trouser-Ladies-Jeans-Female-Lace-up-Bow.jpg',
    images: [
      {
        id: 'bootcut-jean1',
        src: 'https://ae01.alicdn.com/kf/H6542a9ea0b5e4462b6801dbe3acf9239F/Women-Bootcut-Jeans-Stretch-Denim-Ladies-High-Waist-Casual-Trouser-Ladies-Jeans-Female-Lace-up-Bow.jpg' 
      },
      {
        id: 'bootcut-jean2',
        src:'https://ae01.alicdn.com/kf/H6542a9ea0b5e4462b6801dbe3acf9239F/Women-Bootcut-Jeans-Stretch-Denim-Ladies-High-Waist-Casual-Trouser-Ladies-Jeans-Female-Lace-up-Bow.jpg'
      },
      {
        id: 'bootcut-jean3',
        src:'https://www.dhresource.com/0x0/f2/albu/g10/M01/F8/55/rBVaWV6q7k6AZr0_AAFSVf8FGBE221.jpg/jaycosin-women-bootcut-jeans-stretch-denim.jpg'
      }
    ],
    carouselId: 'ThirdSeller',
    price: '$176.00',
    prevPrice: '$350.00',
    productDetails: 'All things booty',
    quantity: 1,
  },

  {
    id:'P04',
    productName: 'Denim Jacket',
    brandName: 'Ipsum Fashion',
    imageUrl: 'https://ae01.alicdn.com/kf/H4b22e1078d1d400a8ebf86a78d273b65d/Denim-Jacket-Female-Korean-College-Students-Short-Jacket-New-Spring-And-Autumn-Casual-Light-Blue-Dark.jpg',
    images: [
      {
        id: 'Denim jacket1',
        src: 'https://ae01.alicdn.com/kf/H4b22e1078d1d400a8ebf86a78d273b65d/Denim-Jacket-Female-Korean-College-Students-Short-Jacket-New-Spring-And-Autumn-Casual-Light-Blue-Dark.jpg',
      },
      {
        id: 'Denim jacket2',
        src: 'https://images-na.ssl-images-amazon.com/images/I/71%2BrH87ilWL._UY741_.jpg',
      },
      {
        id: 'Denim Jacket3',
        src: 'https://pyxis.nymag.com/v1/imgs/d4c/d2a/36b51051c6f4b1e1db578dcc1a3e4fc340-14-gigi-hadid-denim.rhorizontal.w700.jpg',
      }
    ],
    carouselId: 'FourthSeller',
    price: '$220.00',
    prevPrice: '$270.00',
    productDetails: 'Casual Denim Jacket',
    quantity: 1
  },
  
  {
    id: 'P05',
    productName: 'Wrist Watch',
    brandName: 'The Jewel',
    imageUrl: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/L/a/Ladies-Casual-Wrist-Watch---Dark-Green-4800014.jpg',
    images: [
      {
        id: 'wrist-watch1', 
        src: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/L/a/Ladies-Casual-Wrist-Watch---Dark-Green-4800014.jpg'
      },
      {
        id: 'wrist-watch2', 
        src: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/B/O/142248_1601521842.jpg'
      },
      {
        id:'wrist-watch3', 
        src: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/S/P/56974_1544465731.jpg'
      }
    ],
    carouselId: 'FiFthSeller',
    price: '$50.00',
    prevPrice: '$80.00',
    productDetails: 'Imagine a timeless world',
    quantity: 1
  },

  {
    id: 'P06',
    productName: 'Shoe',
    brandName: 'Chihun fashion',
    imageUrl: 'https://image.made-in-china.com/202f0j00eSAtCTQJgLGU/Ladies-Shoes-High-Heels-Women-Shoe-Heels-High-Heels-Platform-Shoes-Girls-Shoes.webp',
    images: [
      {
        id: 'shoe_img1',
        src: 'https://image.made-in-china.com/202f0j00eSAtCTQJgLGU/Ladies-Shoes-High-Heels-Women-Shoe-Heels-High-Heels-Platform-Shoes-Girls-Shoes.webp'
      },
      {
        id: 'shoe2',
        src: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/B/H/169158_1583144615.jpg'
      },
      {
        id: 'shoe3',
        src: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/O/L/169158_1583170292.jpg'
      }
    ],
    carouselId: 'SixthSeller',
    price: '$56.00',
    prevPrice: '$150.00',
    productDetails: 'Walk the part of life',
    quantity: 1
  },

  {
    id: 'P07',
    productName: 'Bag',
    brandName: 'Lorem collection',
    imageUrl: 'https://d3re0f381bckq9.cloudfront.net/67275984_MzAwLTMwMC04ODE2NjhmMWY3.webp',
    images: [
      {
        id: 'bag1', 
        src: 'https://d3re0f381bckq9.cloudfront.net/67275984_MzAwLTMwMC04ODE2NjhmMWY3.webp'
      },
      {
        id: 'bag2', 
        src: 'https://d3re0f381bckq9.cloudfront.net/68394699_MzAwLTQwMC1kYjdmYWI5NDdl.webp'
      },
      {
        id: 'bag3', 
        src: 'https://d3re0f381bckq9.cloudfront.net/67292548_MzAwLTMwMC1lNWVjYmZhMzc0.webp'
      }
    ],
    carouselId: 'SeventhSeller',
    price: '$176.00',
    prevPrice: '$350.00',
    productDetails: 'Let your bags speak for you',
    quantity: 1
  },

  {
    id: 'P08',
    productName: 'Sports Wear',
    brandName: 'Ipsum Fashion',
    imageUrl: 'https://i.pinimg.com/564x/ac/08/92/ac0892d616e53e723ebdf866015709d0.jpg',
    images: [
      {
        id: 'sports-wear1',
        src: 'https://i.pinimg.com/564x/ac/08/92/ac0892d616e53e723ebdf866015709d0.jpg'
      },
      {
        id: 'sports-wear2',
        src: 'https://i.pinimg.com/236x/97/a3/c0/97a3c0d1bfbb3c38ebde80c07bf11d21.jpg' 
      },
      {
        id: 'sports-wear3', 
        src: 'https://i.pinimg.com/236x/d1/e4/dc/d1e4dc4189af285a7c0a4353e279ec57.jpg'
      }
    ],
    carouselId: 'EightSeller',
    price: '$220.00',
    prevPrice: '$270.00', 
    productDetails: 'Get up every morning and remind yourself. how fit you are. ',
    quantity: 1
  },
];