import { RichTextV2 } from "./autogen";

export interface PreviewFields {
  _site: Site;
  address: Address;
  businessId: number;
  c_awardsReceived: CAward[];
  c_clientFocuses: string[];
  c_color: string;
  c_designations: CDesignation[];
  c_education: CEducation[];
  c_fonts: string;
  c_fullBiography: CFullBiography;
  c_heroBannerImage: CHeroBanner;
  c_organisations: string[];
  c_preferredName: string;
  c_professionalEvents: CProfessionalEvent[];
  c_relatedBlogs: CProfessionalsBlog[];
  c_serviceAreas: string[];
  c_shortDescription: string;
  c_teamDescription: string;
  c_relatedProfessionals: CTeamMember[];
  teamName: string;
  c_template: string;
  c_volunteering: CVolunteering[];
  description: string;
  headshot: Headshot2;
  hobbies: string[];
  hours: Hours;
  id: string;
  interests: string[];
  languages: string[];
  locale: string;
  mainPhone: string;
  meta: Meta3;
  name: string;
  siteDomain: string;
  siteId: number;
  slug: string;
  c_jobTitle: string;
  uid: number;
  yearsOfExperience: number;
  frequentlyAskedQuestions?: FrequentlyAskedQuestions[];
}

export interface FrequentlyAskedQuestions {
  question: string;
  answer?: string;
}

export interface Site {
  c_dashboardCompletionDescription: string;
  c_dashboardCompletionLabel: string;
  c_footer: CFooter;
  c_header: CHeader;
  c_taskGroups: CTaskGroup[];
  c_termsAndConditions: CTermsAndConditions;
  id: string;
  meta: Meta;
  name: string;
  richTextDescriptionV2: RichTextV2;
  uid: number;
}
export interface CTaskGroup {
  description?: string;
  name: string;
  tasks: Task[];
}

export interface Task {
  description?: string;
  field: string;
  name: string;
}

export interface CTermsAndConditions {
  json: Json;
}

export interface Json {
  root: Root2;
}
export interface CFooter {
  height: number;
  url: string;
  width: number;
}

export interface CHeader {
  height: number;
  url: string;
  width: number;
}
export interface Address {
  city: string;
  countryCode: string;
  line1: string;
  localizedCountryName: string;
  localizedRegionName: string;
  postalCode: string;
  region: string;
}

export interface CAward {
  nameOfAwardOrHonor: string;
  yearsReceived: string[];
}

export interface CDesignation {
  abbreviation: string;
  date: string;
  name: string;
}

export interface CEducation {
  degree: string;
  school: string;
}

export interface CFullBiography {
  json: Json;
}

export interface Json {
  root: Root2;
}

export interface Root2 {
  children: Children[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface Children {
  children: Children2[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface Children2 {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
}

export interface CHeroBanner {
  height: number;
  url: string;
  width: number;
}

export interface CProfessionalEvent {
  id: string;
  meta: Meta;
  name: string;
}

export interface Meta {
  entityType: EntityType;
  locale: string;
}

export interface EntityType {
  id: string;
  uid: number;
}

export interface CProfessionalFaq {
  answerV2: AnswerV2;
  id: string;
  question: string;
}

export interface AnswerV2 {
  json: Json2;
}

export interface Json2 {
  root: Root3;
}

export interface Root3 {
  children: Children3[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface Children3 {
  children: Children4[];
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface Children4 {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
}

export interface CProfessionalsBlog {
  c_category: string;
  datePosted: string;
  id: string;
  meta: Meta2;
  name: string;
  shortDescriptionV2: ShortDescriptionV2;
}

export interface Meta2 {
  entityType: EntityType2;
  locale: string;
}

export interface EntityType2 {
  id: string;
  uid: number;
}

export interface ShortDescriptionV2 {
  json: Json3;
}

export interface Json3 {
  root: Root4;
}

export interface Root4 {
  children: Children5[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface Children5 {
  children: Children6[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface Children6 {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
}

export interface CTeamMember {
  c_jobTitle: string;
  description: string;
  headshot: Headshot;
  mainPhone: string;
  name: string;
  slug: string;
}

export interface Headshot {
  height: number;
  url: string;
  width: number;
}

export interface CVolunteering {
  causes: string;
  description: string;
  organization: string;
  role: string;
  startMonthAndYear: string;
}

export interface Headshot2 {
  height: number;
  url: string;
  width: number;
}

export interface Hours {
  friday: Friday;
  monday: Monday;
  saturday: Saturday;
  sunday: Sunday;
  thursday: Thursday;
  tuesday: Tuesday;
  wednesday: Wednesday;
}

export interface Friday {
  openIntervals: OpenInterval[];
}

export interface OpenInterval {
  end: string;
  start: string;
}

export interface Monday {
  openIntervals: OpenInterval2[];
}

export interface OpenInterval2 {
  end: string;
  start: string;
}

export interface Saturday {
  isClosed: boolean;
}

export interface Sunday {
  isClosed: boolean;
}

export interface Thursday {
  openIntervals: OpenInterval3[];
}

export interface OpenInterval3 {
  end: string;
  start: string;
}

export interface Tuesday {
  openIntervals: OpenInterval4[];
}

export interface OpenInterval4 {
  end: string;
  start: string;
}

export interface Wednesday {
  openIntervals: OpenInterval5[];
}

export interface OpenInterval5 {
  end: string;
  start: string;
}

export interface Meta3 {
  entityType: EntityType3;
  locale: string;
}

export interface EntityType3 {
  id: string;
  uid: number;
}
