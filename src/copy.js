import couplePhoto from './assests/vijay-vaishali.png'
import weddingMusic from './assests/aaj-sajya.mpeg'

// ✏️ EDIT HERE — settings + every word of the invitation, in Gujarati (gu) and English (en).

export const CFG = {
  phone: '8980842152',
  // Wedding moment used by the countdown (India time). UPDATE if your date changes.
  weddingISO: '2027-02-02T17:15:00+05:30',
  mapQuery: 'https://goo.gl/maps/248kEm1PeSDG4Gjm7?g_st=aw',
  // The main couple photo and music are loaded from src/assests.
  photos: [couplePhoto],
  musicUrl: weddingMusic,
}

const SH1_GU = 'વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।\nનિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥'
const SH2_GU = 'માંગલ્યં ભગવાન વિષ્ણુ, માંગલ્યં ગરુડધ્વજઃ ।\nમાંગલ્યં પુંડરીકાક્ષો, મંગલાય તનો હરિઃ ॥'
const SH1_EN = 'वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा ॥'
const SH2_EN = 'माङ्गल्यं भगवान् विष्णुः, माङ्गल्यं गरुडध्वजः ।\nमाङ्गल्यं पुण्डरीकाक्षो, मङ्गलायतनो हरिः ॥'

export const COPY = {
  gu: {
    intro: {
      lines: ['દરેક મહાન પ્રેમકથા રાતની શાંતિમાં શરૂ થાય છે…', '…અને પ્રભાતના પહેલા કિરણની રાહ જુએ છે'],
      hint: 'સૂર્યને ઉપર તરફ ખેંચો', keep: 'થોડું વધુ… પ્રકાશ નજીક છે', back: 'સૂર્યને છોડશો નહીં… ઉદય થવા દો',
      risen: 'નવી સવાર, નવી શરૂઆત', enter: 'કંકોતરીમાં પ્રવેશ કરો', skip: 'છોડો',
    },
    hero: {
      initials: 'V & V', eyebrow: 'શુભ વિવાહ', g: 'ચિ. વિજય', and: 'સંગ', b: 'ચિ. વૈશાલી',
      date: 'તા. ૦૨/૦૨/૨૦૨૭, બુધવાર', place: '', cdTitle: 'શુભ ઘડીને બાકી',
      units: ['દિવસ', 'કલાક', 'મિનિટ', 'સેકન્ડ'], cdDone: 'શુભ ઘડી આવી ગઈ છે 🎉', scroll: 'નીચે સ્ક્રોલ કરો',
    },
    invite: {
      ganesh: '॥ શ્રી ગણેશાય નમઃ ॥', sh1: SH1_GU, sh2: SH2_GU, title: 'વિવાહ સંસ્કાર',
      intro: 'સ્નેહીશ્રી, આપ સર્વેને જણાવતાં અત્યંત હર્ષ થાય છે કે અમારા પરિવારના ચિરંજીવી',
      blessing: 'ના શુભ વિવાહ પ્રસંગે આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપી અમારા આનંદમાં વધારો કરશો એવી નમ્ર વિનંતી.',
      quote: 'બે હૃદયનું મિલન, બે પરિવારનો સંગમ… આપની હાજરી અમારા આનંદનો ઉત્સવ બનાવશે.',
    },
    schedule: {
      title: 'ઉત્સવ કાર્યક્રમ',
      days: [
        { label: 'પ્રથમ દિવસ', date: 'મંગળવાર, તા. ૦૧/૦૨/૨૦૨૭', items: [
          { time: 'સવારે ૯:૧૫', icon: '🪔', title: 'મંડપ મુહૂર્ત' },
          { time: 'સવારે ૧૦:૦૦', icon: '🌼', title: 'હલ્દી રસમ', desc: 'હળદરના રંગે રંગાવાની આનંદમય રસમ.' },
          { time: 'બપોરે ૧૧:૩૦', icon: '🍽️', title: 'સ્વરુચી ભોજન', desc: 'સ્નેહીજનો સાથે સ્વાદિષ્ટ ભોજનનો આનંદ.' },
          { time: 'રાત્રે ૯:૩૦', icon: '🪕', title: 'રાસ-ગરબા', desc: 'સંગીતના તાલે રાસ-ગરબાની રંગત માણીએ.' },
        ] },
        { label: 'બીજો દિવસ', date: 'બુધવાર, તા. ૦૨/૦૨/૨૦૨૭', items: [
          { time: 'વહેલી સવારે ૭:૦૦', icon: '🎺', title: 'જાન પ્રસ્થાન', desc: 'ત્રંબોડાથી' },
          { time: 'સવારે ૧૦:૦૦', icon: '💍', title: 'હસ્ત મેળાપ', desc: 'શુભ ચોઘડિયે' },
          { time: 'બપોરે ૧૧:૩૦', icon: '🍽️', title: 'ભોજન સમારંભ' },
        ] },
      ],
    },
    kalrav: { title: 'મધુર કલરવ', msg: 'લગ્નના શુભ પ્રસંગે પ્રેમ અને સ્નેહની લાગણીઓ સાથે આપ સૌની હાજરી અમારા માટે આશીર્વાદ સમાન છે. પધારશો જ, એવી અપેક્ષા સહ.', sender: '– સાદર, સૌ સ્નેહીજનો' },
    venue: { title: 'શુભ સ્થળ', name: 'ત્રંબોડા', lines: ['તા. ચોટીલા', 'સુરેન્દ્રનગર.'], btnMap: 'ગૂગલ મેપ પર લોકેશન જુઓ' },
    venue2: { title: 'લગ્ન સ્થળ', name: 'મોકાસર', lines: ['તા. ચોટીલા', 'સુરેન્દ્રનગર.'], btnMap: 'ગૂગલ મેપ પર લોકેશન જુઓ' },
    family: {
      title: 'પરિવારજનો',
      cards: [
        { t: 'નિમંત્રક', list: ['શ્રી દલસુખભાઈ મોહનભાઈ ઓળકિયા', 'સરનામું: ત્રંબોડા, તા. ચોટીલા, સુરેન્દ્રનગર'] },
        { t: 'લિ. સ્નેહાધીન', list: ['શ્રી મનસુખભાઈ મોહનભાઈ ઓળકિયા', 'શ્રી રઘુભાઈ મોહનભાઈ ઓળકિયા', 'શ્રી દલસુખભાઈ મોહનભાઈ ઓળકિયા'] },
        { t: 'લિ. દર્શનાભિલાષી', list: ['શ્રી સંજયભાઈ મનસુખભાઈ ઓળકિયા ', 'શ્રી દિનેશભાઈ મનસુખભાઈ ઓળકિયા ', 'શ્રી રોહિતભાઈ રઘુભાઈ ઓળકિયા ', 'શ્રી સુનિલભાઈ દલસુખભાઈ ઓળકિયા ', 'શ્રી સમસ્ત મિત્ર મંડળ'] },
        { t: 'મોસાળ પક્ષ', list: ['શ્રી સવજીભાઈ નાથાભાઈ વાસાણી', 'શ્રી રમેશભાઈ નાથાભાઈ વાસાણી', 'શ્રી અશોકભાઈ નાથાભાઈ વાસાણી', 'શ્રી જેસિંગભાઈ નાથાભાઈ વાસાણી', 'શ્રી અરવિંદભાઈ નાથાભાઈ વાસાણી', 'શ્રી અમિતભાઈ નાથાભાઈ વાસાણી'] },
        { t: 'બાણેજ પક્ષ', list: ['જિયાંશ, ખ્યાતી, કાયરા'] },
        // { t: 'ફર્મ', list: ['ઓનસ્ટ મોબાઈલ, સણોસરા', 'એ. જે. ઈન્વિટેશન'] },
      ],
    },
    rsvp: {
      title: 'આપની રાહ જોઈએ છીએ', sub: 'આપની હાજરી જ અમારા માટે સૌથી મોટી ભેટ છે.',
      wa: 'વોટ્સએપ પર શુભેચ્છા પાઠવો (RSVP)', call: 'સંપર્ક',
      msg: 'નમસ્તે, ચિ. કિશન સંગ ચિ. પુરન ના શુભ લગ્ન પ્રસંગે હાર્દિક શુભેચ્છાઓ!',
    },
    nav: ['હોમ', 'આમંત્રણ', 'કાર્યક્રમ', 'સ્થળ', 'RSVP'],
    ch: ['૧', '૨', '૩', '૪', '૫'],
    cal: { btn: 'કેલેન્ડરમાં ઉમેરો', title: 'ચિ. કિશન સંગ ચિ. પુરન – શુભ લગ્ન' },
    form: {
      name: 'આપનું નામ', guests: 'મહેમાનોની સંખ્યા', attend: ['જરૂર પધારીશું', 'કદાચ', 'પધારી શકીશું નહીં'],
      note: 'શુભેચ્છા સંદેશ (વૈકલ્પિક)', send: 'વોટ્સએપ પર RSVP મોકલો', need: 'કૃપા કરીને આપનું નામ લખો',
      compose: (n, g, a, m) => `નમસ્તે, હું ${n}. ${a}. મહેમાનોની સંખ્યા: ${g}.${m ? ' ' + m : ''}`,
    },
    gallery: { title: 'સુંદર ક્ષણો', cap: ['પ્રેમની શરૂઆત', 'સાથે હંમેશા', 'શુભ સંગમ', 'આપણી વાર્તા', 'ખુશીની પળો', 'નવી સફર'] },
    share: { btn: 'આમંત્રણ શેર કરો', text: 'ચિ. કિશન સંગ ચિ. પુરન ના શુભ વિવાહની કંકોતરી', copied: 'લિંક કૉપી થઈ ✓' },
    footer: 'પ્રેમ અને આશીર્વાદ સહ',
  },

  en: {
    intro: {
      lines: ['Every great love story begins in the quiet of the night…', '…and waits for the first light of dawn.'],
      hint: 'Drag the sun upward', keep: 'A little more… the light is near', back: "Don't let go — let the sun rise",
      risen: 'A new morning, a new beginning', enter: 'Enter the invitation', skip: 'Skip',
    },
    hero: {
      initials: 'V & V', eyebrow: 'The Wedding Of', g: 'Vijay', and: '&', b: 'Vaishali',
      date: 'Wednesday, 02 February 2027', place: 'Mokasar', cdTitle: 'Counting down to the big moment',
      units: ['Days', 'Hours', 'Minutes', 'Seconds'], cdDone: 'The celebration has begun 🎉', scroll: 'Scroll down',
    },
    invite: {
      ganesh: '॥ Shri Ganeshaya Namah ॥', sh1: SH1_EN, sh2: SH2_EN, title: 'Vivah Sanskar',
      intro: 'Dear family and friends, it gives us immense joy to announce the wedding of our beloved',
      blessing: 'We humbly request you to join us with your family, bless the newlyweds, and make our happiness complete.',
      quote: 'The union of two hearts, the coming together of two families… your presence will turn our joy into a celebration.',
    },
    schedule: {
      title: 'Celebration Schedule',
      days: [
        { label: 'Day One', date: 'Tuesday, 01 February 2027', items: [
          { time: '9:15 AM', icon: '🪔', title: 'Mandap Muhurat' },
          { time: '10:00 AM', icon: '🌼', title: 'Haldi Ceremony', desc: 'A joyful celebration in hues of turmeric.' },
          { time: '11:30 AM', icon: '🍽️', title: 'Lunch', desc: 'Enjoy a delicious meal with family and friends.' },
          { time: '9:30 PM', icon: '🪕', title: 'Raas-Garba', desc: 'Join us for an evening of music, dance, and Raas-Garba.' },
        ] },
        { label: 'Day Two', date: 'Wednesday, 02 February 2027', items: [
        { time: '7:00 AM', icon: '🎺', title: 'Jaan Prasthan', desc: 'Departing from Tramboda' },
          { time: '10:00 AM', icon: '💍', title: 'Hast Melap', desc: 'At the auspicious Choghadiya' },
          { time: '11:30 AM', icon: '🍽️', title: 'Wedding Lunch' },
        ] },
      ],
    },
    kalrav: { title: 'Sweet Words', msg: 'On this auspicious occasion, your presence — filled with love and affection — is a blessing to us. We eagerly await you.', sender: '– With warm regards, all our loved ones' },
    venue: { title: 'The Venue', name: 'Tramboda', lines: ['Ta. Chotila', 'Surendranagar.'], btnMap: 'View location on Google Maps' },
    venue2: { title: 'The Wedding Venue', name: 'Mokasar', lines: ['Ta. Chotila', 'Surendranagar.'], btnMap: 'View location on Google Maps' },
    family: {
      title: 'With Love From',
      cards: [
         { t: 'Hosts', list: ['Mr. Dalsukhbhai Mohanbhai Olakiya', 'Address: Tramboda, Ta. Chotila, Surendranagar'] },
        { t: 'Affectionately Yours', list: ['Mr. Mansukhbhai Mohanbhai Olakiya', 'Mr. Raghubhai Mohanbhai Olakiya', 'Mr. Dalsukhbhai Mohanbhai Olakiya'] },
        { t: 'Eager to Welcome You', list: ['Sanjaybhai Mansukhbhai Olakiya', 'Dineshbhai Mansukhbhai Olakiya', 'Rohitbhai Raghubhai Olakiya', 'Sunilbhai Dalsukhbhai Olakiya', 'All our friends'] },
        { t: "Maternal Family (Mosal)", list: ['Savjibhai Nathabhai Vasani', 'Rameshbhai Nathabhai Vasani', 'Ashokbhai Nathabhai Vasani', 'Jesingbhai Nathabhai Vasani', 'Arvindbhai Nathabhai Vasani', 'Amitbhai Nathabhai Vasani'] },
        { t: 'Banej Side', list: ['Jiyansh, Khyati, Kyara'] },
      ],
    },
    rsvp: {
      title: 'We Await You', sub: 'Your presence is the greatest gift for us.',
      wa: 'Send your wishes on WhatsApp (RSVP)', call: 'Call',
      msg: 'Namaste, heartfelt wishes on the auspicious wedding of Vijay & Vaishali!',
    },
    nav: ['Home', 'Invitation', 'Events', 'Venue', 'RSVP'],
    ch: ['I', 'II', 'III', 'IV', 'V'],
    cal: { btn: 'Add to calendar', title: 'Vijay & Vaishali – Wedding' },
    form: {
      name: 'Your name', guests: 'Number of guests', attend: ['Will attend', 'Maybe', "Can't make it"],
      note: 'A message for the couple (optional)', send: 'Send RSVP on WhatsApp', need: 'Please enter your name',
      compose: (n, g, a, m) => `Namaste, this is ${n}. ${a}. Guests: ${g}.${m ? ' ' + m : ''}`,
    },
    gallery: { title: 'Beautiful Moments', cap: ['Where it began', 'Always together', 'Two become one', 'Our story', 'Happy times', 'The new journey'] },
    share: { btn: 'Share invitation', text: 'Wedding invitation of Vijay & Vaishali', copied: 'Link copied ✓' },
    footer: 'With love & blessings',
  },
}
