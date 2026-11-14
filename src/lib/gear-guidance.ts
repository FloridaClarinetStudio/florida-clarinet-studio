export interface GearGuidance {
	instrument: string;
	bestFor: string;
	teachingUse: string;
	checkBeforeBuying: string;
}

function instrumentFor(slug: string): string {
	if (slug.includes('baritone-saxophone')) return 'Baritone saxophone';
	if (slug.includes('tenor-saxophone')) return 'Tenor saxophone';
	if (slug.includes('alto-saxophone') || slug.includes('alto-sax')) return 'Alto saxophone';
	if (slug.includes('bass-clarinet')) return 'Bass clarinet';
	if (slug.includes('saxophone')) return 'Saxophone';
	if (slug.includes('clarinet')) return 'Bb clarinet';
	return 'Clarinet and saxophone';
}

/** Practical, conservative selection guidance shared by every recommendation page. */
export function getGearGuidance(slug: string): GearGuidance {
	const instrument = instrumentFor(slug);

	if (/coffee-mug/.test(slug)) {
		return {
			instrument,
			bestFor: 'Students, teachers, and band families looking for a music-themed gift rather than essential playing equipment.',
			teachingUse: 'Studio gifts can celebrate a milestone or help build community, but they do not replace reeds, maintenance supplies, or assigned music.',
			checkBeforeBuying: 'Confirm the design, capacity, care instructions, and delivery date. Prioritize required lesson supplies first.',
		};
	}

	if (/book/.test(slug)) {
		return {
			instrument,
			bestFor: `Beginning through advancing ${instrument.toLowerCase()} students when this exact book is assigned by a teacher or band director.`,
			teachingUse: 'A consistent method book gives lessons and home practice the same sequence for note reading, rhythm, tone, and technique.',
			checkBeforeBuying: 'Match the instrument, book number, series, and edition on the assignment. Similar covers often belong to different instruments.',
		};
	}

	if (/reed-case|wooden-reed-case|temvox/.test(slug)) {
		return {
			instrument,
			bestFor: `Students who rotate several ${instrument.toLowerCase()} reeds and need to protect them between rehearsals and lessons.`,
			teachingUse: 'Numbering and rotating reeds makes their response easier to compare and helps prevent one reed from being overused.',
			checkBeforeBuying: 'Confirm the slot dimensions, reed capacity, ventilation or humidity design, and compatibility with your reed size.',
		};
	}

	if (/reeds?/.test(slug) && !/reedgeek/.test(slug)) {
		return {
			instrument,
			bestFor: `${instrument} students whose teacher has confirmed the cut and strength for their current mouthpiece and embouchure.`,
			teachingUse: 'A suitable reed lets the student focus on steady air, centered tone, articulation, and response instead of fighting an unsuitable setup.',
			checkBeforeBuying: 'Verify the instrument, reed family, strength, and box quantity. Reed strength is not standardized across different cuts and brands.',
		};
	}

	if (/mouthpiece|mouth-piece/.test(slug)) {
		const developingPlayer = /yamaha-4c|hite/.test(slug);
		return {
			instrument,
			bestFor: developingPlayer
				? `Beginning and developing ${instrument.toLowerCase()} players who need a dependable, teacher-approved setup.`
				: `Intermediate and advanced ${instrument.toLowerCase()} players ready to evaluate a more specialized setup with a teacher.`,
			teachingUse: 'A well-matched mouthpiece can make response and articulation more predictable, allowing lessons to focus on voicing, air support, and musical control.',
			checkBeforeBuying: 'Confirm the exact model and instrument. Mouthpieces should be tested with the player’s reeds and ligature when possible; a new model is not automatically an upgrade.',
		};
	}

	if (/ligature/.test(slug)) {
		return {
			instrument,
			bestFor: `${instrument} students replacing a damaged ligature or refining an otherwise stable mouthpiece-and-reed setup.`,
			teachingUse: 'A secure, repeatable reed position helps students start each practice session with fewer setup variables.',
			checkBeforeBuying: 'Use the manufacturer’s fit guide for your exact mouthpiece. Instrument labels alone do not guarantee that a ligature will fit.',
		};
	}

	if (/tuner-metronome/.test(slug)) {
		return {
			instrument,
			bestFor: 'Students at every level who are learning to practice pulse, subdivision, pitch awareness, and long tones independently.',
			teachingUse: 'The metronome provides an objective pulse while the tuner helps students see pitch tendencies after they first listen and adjust by ear.',
			checkBeforeBuying: 'Confirm that the display, speaker volume, input options, battery type, and control layout work for the student’s practice space.',
		};
	}

	if (/stand/.test(slug)) {
		return {
			instrument,
			bestFor: 'Students at every level building a safe, consistent home-practice setup.',
			teachingUse: slug === 'clarinet-stand'
				? 'A stable instrument stand gives the clarinet a safer resting place during short breaks and reduces hurried assembly and disassembly.'
				: 'A stable music stand supports upright posture, comfortable breathing, and eye-level music during daily practice.',
			checkBeforeBuying: slug === 'clarinet-stand'
				? 'Confirm the stand is designed for clarinet, sits securely on the floor, and fits inside the bell or case as expected.'
				: 'Check height range, desk angle, base stability, storage space, and whether portability or durability matters more.',
		};
	}

	if (/swab|grease|thumb-rest|patch/.test(slug)) {
		return {
			instrument,
			bestFor: `${instrument} students at every level who need a comfortable, reliable daily-care routine.`,
			teachingUse: 'Small setup and maintenance habits protect the instrument and remove distractions that can interfere with posture, response, and focused practice.',
			checkBeforeBuying: 'Confirm the product is made for your instrument and material. Follow the maker’s care directions and ask a repair technician about persistent mechanical problems.',
		};
	}

	if (/reedgeek/.test(slug)) {
		return {
			instrument,
			bestFor: 'Experienced reed players who have learned safe reed-balancing technique directly from a teacher.',
			teachingUse: 'Careful adjustment can help diagnose an uneven reed and teach students to compare response, but removing too much material ruins a reed quickly.',
			checkBeforeBuying: 'This is a precision tool, not a beginner necessity. Use eye protection, work slowly, and get hands-on instruction before altering reeds.',
		};
	}

	return {
		instrument,
		bestFor: `${instrument} students who have identified a specific practice or setup need with their teacher.`,
		teachingUse: 'Robin evaluates accessories by whether they make setup more consistent and help the student spend more time on productive practice.',
		checkBeforeBuying: 'Confirm the exact model, size, instrument compatibility, and return policy. Bring your current setup to a lesson when fit is uncertain.',
	};
}
