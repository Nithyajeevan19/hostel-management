export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  initials: string
  stayDuration: string
  type: 'resident' | 'parent'
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Software Engineer at Infosys',
    content: 'I moved from Lucknow two years ago. The biometric entry, the quality of food, and the fact that maintenance is handled the same day — this is exactly what working women need in a new city.',
    rating: 5,
    initials: 'PS',
    stayDuration: '2 years',
    type: 'resident',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    role: 'MBA Student, SPJIMR Mumbai',
    content: "As a student, I needed fast Wi-Fi, a quiet study corner, and meals I don't have to think about. SURYA PG nails all three. My GPA has actually improved since I moved here.",
    rating: 5,
    initials: 'RV',
    stayDuration: '1.5 years',
    type: 'resident',
  },
  {
    id: '3',
    name: 'Sneha Patel',
    role: 'UX Designer at TCS',
    content: 'I toured five PGs before choosing this one. The cleanliness, the natural light in the rooms, and the fact that they actually listen to feedback — it felt different from the first visit.',
    rating: 5,
    initials: 'SP',
    stayDuration: '8 months',
    type: 'resident',
  },
  {
    id: '4',
    name: 'Amit Kumar',
    role: 'Research Scholar, IIT Bombay',
    content: 'The peaceful environment is perfect for my research. When I need to work late, I use the study lounge. The management understands academic life.',
    rating: 5,
    initials: 'AK',
    stayDuration: '1 year',
    type: 'resident',
  },
  {
    id: '5',
    name: 'Anjali Reddy',
    role: 'Medical Intern, Apollo Hospital',
    content: 'With unpredictable hospital hours, having meals ready and a spotless room waiting for me is a blessing. The 24/7 security also means I can come back at any hour safely.',
    rating: 5,
    initials: 'AR',
    stayDuration: '6 months',
    type: 'resident',
  },
  {
    id: '6',
    name: 'Mrs. Sunita Devi',
    role: 'Parent — Son stays at SURYA PG',
    content: "My son moved from Patna for his first job. As a parent, I was very anxious. But after visiting SURYA PG, I felt completely reassured. The CCTV, the biometric access, and the warden's responsiveness — my son is safe, and I sleep peacefully.",
    rating: 5,
    initials: 'SD',
    stayDuration: 'Son staying 1 year',
    type: 'parent',
  },
]
