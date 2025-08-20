import { getArrayObjByLabel } from "../../utils";

export const SnackBarType = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
}

export const ComingSoonPage = [
  // '/testimonial',
  // '/product'
]


export const shopStatusArray =  [
  { value: 1, label: 'Pending Verify' },
  { value: 2, label: 'Pending Payment' },
  { value: 3, label: 'Processing' },
  // { value: 4, label: 'Delivered' },
  { value: 5, label: 'Completed' },
 ];

export const CountryList: any = [
  {
    label: "-",
    value: 0,
  },
  {
    label: "Malaysia",
    value: 1,
  },
  {
    label: "Singapore",
    value: 2,
  },
];

export const ShippingMethod: any = [
  {
    label: "Delivery",
    value: 1,
  },
  {
    label: "Pick Up",
    value: 2,
  },
];

export const PaymentMethod: any = [
  {
    label: "ipay88",
    value: 1,
  },
  {
    label: "Bank Transfer",
    value: 2,
  },
  {
    label: "eWallet",
    value: 3,
  },
  {
    label: "Credit Card",
    value: 4,
  },
];

export const MemberAccountStatus: any = [
  {
    label: "Active",
    value: 1,
  },
  {
    label: "Pending Approve",
    value: 2,
  },
  {
    label: "Pending Register",
    value: 3,
  },
  {
    label: "Suspended",
    value: 4,
  },
];

export const ColorStatus: any = [
  {
    label: "Green",
    value: 1,
  },
  {
    label: "Yellow",
    value: 2,
  },
  {
    label: "Red",
    value: 3,
  },
  {
    label: "Purple",
    value: 4,
  },
]

export const PaymentStatus: any = [
  {
    label: "To Pay",
    value: 1,
    color: getArrayObjByLabel(ColorStatus, 'Yellow').value
  },
  {
    label: "Pending",
    value: 2,
    color: getArrayObjByLabel(ColorStatus, 'Purple').value
  },
  {
    label: "Paid",
    value: 3,
    color: getArrayObjByLabel(ColorStatus, 'Green').value
  },
  {
    label: "Refunded",
    value: 4,
    color: getArrayObjByLabel(ColorStatus, 'Red').value
  },
  {
    label: "Voided",
    value: 4,
    color: getArrayObjByLabel(ColorStatus, 'Red').value
  },
]

export const OrderStatus: any = [
  {
    label: "Open",
    value: 1,
  },
  {
    label: "Cancelled",
    value: 2,
  },
  {
    label: "Completed",
    value: 3,
  }
]


export const OrderType: any = [
  {
    label: "Initial Order",
    value: 1,
  },
  {
    label: "Standard Order",
    value: 2,
  },
  {
    label: "Tier Order",
    value: 3,
  },
  {
    label: "Order By Credits",
    value: 4,
  }
]


export const ShippingStatus: any = [
  {
    label: "Unfulfilled",
    value: 1,
    color: getArrayObjByLabel(ColorStatus, 'Red').value
  },
  {
    label: "Fulfilled",
    value: 2,
    color: getArrayObjByLabel(ColorStatus, 'Green').value
  }
]

export const MissionItems: any = [
  {
    value: 1,
    title: '60 Days Up Tier Challenge',
    description: 'Get in 3 members in 60 days from registration, to earn the extra commission value from 120PV point.',
    target: 'Target member'
  },
  {
    value: 2,
    title: 'Monthly Sales Target Challenge',
    description: 'Minimum 25PV purchase for every month to maintain the member benefits.',
    target: 'Target PV Point'
  },
  {
    value: 3,
    title: 'Monthly Bonus Challenge',
    description: '10 individual direct account with purchase 1 set as individual sales within 1 month to get extra commission rates.',
    target: 'Target member'
  },
  {
    value: 4,
    title: 'Shop Monthly Target Challenge',
    description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Veniam',
    target: 'Target member'
  },
  {
    value: 5,
    title: 'Monthly Team Target Challenge',
    description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Veniam',
    target: 'Target Points'
  },
]

export const ReviewsItem: any = [
  {
    img: '/assets/customerpic/1.jpg',
    name: 'Jaz',
    yearOld: '55 years old',
    content: 'I have used many expensive products but my skin has never improved. Even after aesthetic beauty treatment, my skin back to original in a short period of time, which made my very helpless. After I followed Shilla\'s suggestion to try the VOSE Concentrated Booster, and I was surprised by the result! I feel my skin has become very healthy, my pigmentation are more lighter, and my sunken contours are starting to plump up! My eye bags also improved, and my look become more energetic! My friends also say that my skin look different, and I also started sharing VOSE Concentrated Booster to them to become more beautiful with me.',
    cnContent: '我用过无数昂贵的产品，但一直都没有得到改善。就算做了医美护理，在短短的时间里皮肤又回到原点，让我很是无奈。后来我跟随Shilla的建议尝试使用VOSE调肤小瓶子，没想到结果让我非常惊讶！我觉得我的肤质变得非常健康，斑浅了，而且本来凹陷的轮廓也开始饱满了！眼袋也改善了，人也看起来精神多了！身边的朋友都说我有了很大的改变，我也开始分享VOSE调肤小瓶子给她们，和我一起变美。'
  },
  {
    img: '/assets/customerpic/3.jpg',
    name: 'Sharon Liew',
    yearOld: '18 years old',
    content: 'Since primary school, my skin has become very sensitive and dehydrated due to staying up late and having an irregular lifestyle. I never dared to show my face, and I felt very insecure. After using VOSE Concentrated Booster for 1 month, I found that my skin\'s pH balance and has gradually stabilized, and acne marks and sensitivity have been improved. My skin has become more stable and no more acne. After using it for 3 months. my skin looks radiant like I have never experienced before! I\'m so glad to know VOSE and my skin is still improving and getting better to this day.',
    cnContent: '从小学开始，由于熬夜和不规律的生活习惯，我的皮肤变得非常敏感和严重脱水。我从来不敢露脸，也感到非常不自信。在使用VOSE调肤小瓶子1个月后，我发现我皮肤的水油平衡逐渐变稳定，痘印和敏感度得到很好的改善。我的皮肤变得更加稳定，不再长粉刺。我用了3个月的小瓶子后，我的皮肤看起来容光焕发，这是我以前从未经历过的！很庆幸我认识了VOSE，直到今天我的皮肤还一直在改善和变得更好！'
  },
  {
    img: '/assets/customerpic/4.jpg',
    name: 'Yuki Chong',
    yearOld: '44 years old',
    content: 'Before I used VOSE Concentrated Booster, I have used many brands of skin care product and didn\'t get good results. After Shilla shared this product to me, she explained to me how the product work and I choose to giving it a try. Until week 10, there were 12 effects on my skin: 1.Eye bag firmer 2.Clean and less acne 3.Elastic 4.Skin tone become white and fair  5.Pores minimize 6.Skin smoother 7.Look young and vitality 8.Less wrinkles 9.Firming 10.Reduce nasolabial lines 11.Reduce puppet lines 12.Reduce neck lines     What surprised me the most was that in addition to the skin\'s better, even my appearance became spiritual, small bottle big power.',
    cnContent: '还没用VOSE调肤小瓶子之前我用了很多牌子的护肤品都没有得到很好的效果，直到Shilla和我分享了小瓶子后，讲解了它的原理，抱着试试看的心态，直到第10个星期我算了算，共在我皮肤产生了12种效果:  1. 眼袋和皮肤结实了  2.皮肤干净没那么容易生暗疮  3.皮肤有弹性了  4.白而细皙了  5.毛孔收缩了  6.皮肤光滑  7.样子有精神     8.细纹減少  9.脸部提升  10.減轻法令纹  11.減轻木偶纹  12.颈纹减少 最令我惊讶的是，除了皮肤变好以外，连我的样子也变精神了，小瓶子大力量。'
  },
  {
    img: '/assets/customerpic/5.jpg',
    name: 'Chaire Zhuang',
    yearOld: '28 years old',
    content: 'Since using the VOSE Concentrated Booster, I have noticed that not only my skin texture has improved, but even the most obvious eye dark circles and eye bags have improved! And my friends say that my eyes not look so edema like before, the eye dark circles that had troubled me for so many years were finally improved, and I have saved the money for buying concealers! I am very satisfied and happy!',
    cnContent: '自从使用了VOSE调肤小瓶子，我发现到不止我的皮肤肤质改善了，就连最明显的黑眼圈和眼袋都改善了！而且朋友都说我眼睛看起来没有那么水肿了，困扰我多年的黑眼圈终于得到了改善，买遮瑕的钱都省下来了，我非常的满意和开心！'
  },
]
