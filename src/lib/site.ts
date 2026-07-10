export const site = {
	name: 'Florida Clarinet Studio',
	url: 'https://floridaclarinetstudio.com',
	tagline: 'Clarinet and saxophone lessons for the Space Coast and beyond.',
	description:
		'Tailored clarinet, saxophone, woodwind, and musicianship lessons in Palm Bay, Melbourne, Viera, and online.',
	defaultImage: '/images/original/instruments.jpg',
	phone: '321-615-7285',
	email: 'floridaclarinetstudio@gmail.com',
	address: '998 Boeing St. NE, Palm Bay, FL 32907',
	areas: ['Palm Bay', 'Melbourne', 'Viera', 'Space Coast', 'Online'],
	social: {
		facebook: 'https://www.facebook.com/profile.php?id=61554867575698',
		instagram: 'https://www.instagram.com/floridaclarinetstudio',
		linkedin: 'https://www.linkedin.com/in/robin-ryon-841151285/',
		tiktok: 'https://www.tiktok.com/@floridamusicstudio',
		twitter: 'https://x.com/flclarinetstdio',
		youtube: 'https://www.youtube.com/@floridaclarinetstudio2338',
	},
};

export const navigation = [
	{ href: '/', label: 'Home' },
	{ href: '/about-us/', label: 'About' },
	{ href: '/clarinet-lessons/', label: 'Lessons' },
	{ href: '/faq-page/', label: 'FAQ' },
	{ href: '/meat-the-team/', label: 'Listening List' },
	{ href: '/childrens-music-school/', label: 'Best Gear' },
	{ href: '/blog/', label: 'Blog' },
	{ href: '/contact-us/', label: 'Contact' },
];

export const images = {
	instruments: {
		src: '/images/original/instruments.jpg',
		alt: 'Clarinets, saxophones, and music books inside the Florida Clarinet Studio lesson room',
	},
	studioCase: {
		src: '/images/original/studio-case.jpg',
		alt: 'A clarinet arranged inside a blue-lined instrument case',
	},
	bandListening: {
		src: '/images/original/band-listening.jpg',
		alt: 'A concert band performing on stage',
	},
	haroldWright: {
		src: '/images/original/harold-wright.jpg',
		alt: 'Clarinetist Harold Wright',
	},
	robertMarcellus: {
		src: '/images/original/robert-marcellus.jpg',
		alt: 'Clarinetist Robert Marcellus',
	},
	vandorenReeds: {
		src: '/images/original/vandoren-clarinet-reeds.jpg',
		alt: 'Vandoren clarinet reeds',
	},
	clarinetStand: {
		src: '/images/original/clarinet-stand.jpg',
		alt: 'A folding clarinet stand',
	},
	mrRyon: {
		src: '/images/original/mr-ryon.jpg',
		alt: 'Mr. Robin Ryon smiling with two students',
	},
};

export const pageImages = {
	'about-us': images.instruments,
	'band-director-listening-list': images.bandListening,
	'childrens-music-school': images.vandorenReeds,
	'clarinet-lessons': images.studioCase,
	'contact-us': images.instruments,
	'faq-page': images.studioCase,
	'meat-the-team': images.haroldWright,
	'my-web-site-recommendations': images.instruments,
};

export const blogImages = {
	'al3-alto-saxophone-mouth-piece': images.studioCase,
	'clarinet-stand': images.clarinetStand,
	'daddario-reserve-x10-bb-clarinet-mouthpiece': images.studioCase,
	'hite-alto-saxophone-mouth-piece': images.studioCase,
	'hite-bb-clarinet-mouthpiece': images.studioCase,
	'la-tromba-cork-grease': images.studioCase,
	'manhasset-music-stand': images.clarinetStand,
	'the-amazing-reed-geek': images.vandorenReeds,
	'vandoren-alto-sax-reeds-2': images.vandorenReeds,
	'vandoren-alto-saxophone-reeds': images.vandorenReeds,
	'vandoren-clarinet-reeds': images.vandorenReeds,
};
