export const site = {
	name: 'Florida Music Studio',
	url: 'https://floridaclarinetstudio.com',
	tagline: 'Clarinet and saxophone lessons for the Space Coast and beyond.',
	description:
		'Tailored clarinet, saxophone, woodwind, and musicianship lessons in Palm Bay, Melbourne, Viera, and online.',
	logo: '/images/florida-clarinet-studio-logo.png',
	defaultImage: '/images/original/instruments.jpg',
	primaryCta: 'Schedule Your First Lesson',
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
	{ href: '/about-us/', label: 'About Robin' },
	{ href: '/clarinet-lessons/', label: 'Clarinet Lessons' },
	{ href: '/saxophone-lessons/', label: 'Saxophone Lessons' },
	{ href: '/band-directors/', label: 'Band Directors' },
	{ href: '/gear/', label: 'Gear' },
	{ href: '/contact-us/', label: 'Contact' },
];

export const footerNavigation = [
	{ href: '/listening-list/', label: 'Listening List' },
	{ href: '/recs/', label: 'Recommendations' },
];

export const images = {
	instruments: {
		src: '/images/original/instruments.jpg',
		alt: 'Clarinets, saxophones, and music books used in lessons with Robin Ryon',
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
		src: '/images/original/mr-robin-ryon.png',
		alt: 'Robin Ryon smiling with two students',
	},
};

export const pageImages = {
	'about-us': {
		src: '/images/original/mr-ryon.jpg',
		alt: 'Robin Ryon smiling with two students',
	},
	'band-directors': images.bandListening,
	'clarinet-lessons': images.studioCase,
	'contact-us': images.instruments,
	'faq-page': images.studioCase,
	'listening-list': images.haroldWright,
	'listening-list/harold-wright': images.haroldWright,
	'listening-list/robert-marcellus': images.robertMarcellus,
	'listening-list/ignatius-gennusa': images.haroldWright,
	'recs': images.instruments,
	'saxophone-lessons': images.instruments,
};

export const gearImages = {
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
