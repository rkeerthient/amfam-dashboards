export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Interval {
	start: any,
	end: any,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface RichTextV2 {
	json: Record<string, any>,
}


export enum C_clientFocuses {
	COLLEGE_EDUCATION_PLANNING = "College Education Planning",
	CORPORATE_BENEFITS = "Corporate Benefits",
	CORPORATE_EXECUTIVE_SERVICES = "Corporate Executive Services",
	CORPORATE_RETIREMENT_PLAN_SERVICES = "Corporate Retirement Plan Services",
	DIVORCE_TRANSITION_PLANNING = "Divorce Transition Planning",
	EDUCATION_PLANNING = "Education Planning",
	EMPLOYEE_BENEFITS_PLANNING = "Employee Benefits Planning",
	EXECUTIVE_COMPENSATION = "Executive Compensation",
	EQUITY_COMPENSATION_SERVICES = "Equity Compensation Services",
	FAMILY_WEALTH_MANAGEMENT_STRATEGIES = "Family Wealth Management Strategies",
	INSTITUTIONAL_AND_CORPORATE_BENEFIT_SERVICES = "Institutional and Corporate Benefit Services",
	INSTITUTIONAL_CONSULTING = "Institutional Consulting",
	INSTITUTIONAL_INVESTMENT_CONSULTING = "Institutional Investment Consulting",
	SERVICES_FOR_ENDOWMENTS_FOUNDATIONS_AND_NONPROFITS = "Services for Endowments, Foundations, and Non-profits",
	SERVICES_FOR_DEFINED_BENEFIT_PLANS = "Services for Defined Benefit Plans",
	INVESTMENT_CONSULTING_FOR_DEFINED_CONTRIBUTION_PLANS = "Investment Consulting for Defined Contribution Plans",
	EMPLOYEE_FINANCIAL_HEALTH = "Employee Financial Health",
	INTERNATIONAL_WEALTH_MANAGEMENT = "International Wealth Management",
	LEGACY_PLANNING = "Legacy Planning",
	LGBT_WEALTH_PLANNING = "LGBT Wealth Planning",
	LIQUIDITY_MANAGEMENT = "Liquidity Management",
	MANAGING_NEW_WEALTH = "Managing New Wealth",
	PERSONAL_RETIREMENT_PLANNING = "Personal Retirement Planning",
	PHILANTHROPIC_PLANNING = "Philanthropic Planning",
	PORTFOLIO_MANAGEMENT_SERVICES = "Portfolio Management Services",
	SMALL_BUSINESS_STRATEGIES = "Small Business Strategies",
	SOCIALLY_RESPONSIBLE_VALUES_BASED_AND_ESG_INVESTING = "Socially Responsible, Values Based, and ESG Investing",
	SPECIAL_NEEDS_PLANNING_STRATEGIES = "Special Needs Planning Strategies",
	WOMEN_AND_WEALTH = "Women and Wealth",
	SPORTS_AND_ENTERTAINMENT = "Sports & Entertainment",
	INDIVIDUAL_AND_CORPORATE_INVESTMENT_STRATEGY = "Individual and Corporate Investment Strategy",
	TAX_MINIMIZATION = "Tax Minimization",
	RETIREMENT_INCOME = "Retirement Income",
}

export enum C_serviceAreas {
	AL = "Alabama",
	AK = "Alaska",
	AZ = "Arizona",
	AR = "Arkansas",
	CA = "California",
	CO = "Colorado",
	CT = "Connecticut",
	DE = "Delaware",
	FL = "Florida",
	GA = "Georgia",
	HI = "Hawaii",
	ID = "Idaho",
	IL = "Illinois",
	IN = "Indiana",
	IA = "Iowa",
	KS = "Kansas",
	KY = "Kentucky",
	LA = "Louisiana",
	ME = "Maine",
	MD = "Maryland",
	MA = "Massachusetts",
	MI = "Michigan",
	MN = "Minnesota",
	MS = "Mississippi",
	MO = "Missouri",
	MT = "Montana",
	NE = "Nebraska",
	NV = "Nevada",
	NH = "New Hampshire",
	NJ = "New Jersey",
	NM = "New Mexico",
	NY = "New York",
	NC = "North Carolina",
	ND = "North Dakota",
	OH = "Ohio",
	OK = "Oklahoma",
	OR = "Oregon",
	PA = "Pennsylvania",
	RI = "Rhode Island",
	SC = "South Carolina",
	SD = "South Dakota",
	TN = "Tennessee",
	TX = "Texas",
	UT = "Utah",
	VT = "Vermont",
	VA = "Virginia",
	WA = "Washington",
	WV = "West Virginia",
	WI = "Wisconsin",
	WY = "Wyoming",
}

export enum YearsReceived {
	_2025 = "2025",
	_2024 = "2024",
	_2023 = "2023",
	_2022 = "2022",
	_2021 = "2021",
	_2020 = "2020",
	_2019 = "2019",
	_2018 = "2018",
	_2017 = "2017",
	_2016 = "2016",
	_2015 = "2015",
	_2014 = "2014",
	_2013 = "2013",
	_2012 = "2012",
	_2011 = "2011",
	_2010 = "2010",
	_2009 = "2009",
	_2008 = "2008",
	_2007 = "2007",
	_2006 = "2006",
	_2005 = "2005",
}

export interface c_awardsReceived {
	nameOfAwardOrHonor?: string,
	yearsReceived?: YearsReceived[],
}

export interface C_designations {
	abbreviation?: string,
	date?: string,
	name?: string,
}

export interface C_education {
	school?: string,
	degree?: string,
}

export interface C_volunteering {
	organization?: string,
	role?: string,
	causes?: string,
	description?: string,
	startMonthAndYear?: string,
}

export enum C_fonts {
	EB_GARAMOND = "EB Garamond",
	INTER = "Inter",
	LATO = "Lato",
	MERRIWEATHER = "Merriweather",
	NUNITO = "Nunito",
	PLAYFAIR_DISPLAY = "Playfair Display",
	ROBOTO = "Roboto",
	SERIF = "Serif",
	SOFIA_SANS = "Sofia Sans",
	WORK_SANS = "Work Sans",
}

export enum C_template {
	TEMPLATE_1 = "Template 1",
	TEMPLATE_2 = "Template 2",
}

export interface C_professionalEvents {
	id?: any,
	name?: string,
	meta?: any,
}

export interface c_relatedBlogs {
	id?: any,
	name?: string,
	meta?: any,
	c_category?: string,
}

export interface C_teamMembers {
	name?: string,
	headshot?: Image,
	mainPhone?: any,
	slug?: string,
	emails?: string[],
	c_jobTitle?: string,
}

export interface MyStreamProfDashboard {
	id?: string,
	uid?: string,
	slug?: string,
	name?: string,
	meta?: any,
	address?: Address,
	mainPhone?: any,
	hours?: Hours,
	headshot?: Image,
	c_preferredName?: string,
	c_jobTitle?: string,
	c_shortDescription?: string,
	c_fullBiography?: RichTextV2,
	hobbies?: string[],
	interests?: string[],
	languages?: string[],
	c_clientFocuses?: C_clientFocuses[],
	c_serviceAreas?: C_serviceAreas[],
	c_awardsReceived?: c_awardsReceived[],
	c_designations?: C_designations[],
	c_education?: C_education[],
	c_organisations?: string[],
	c_volunteering?: C_volunteering[],
	c_heroBannerImage?: Image,
	teamName?: string,
	c_teamDescription?: string,
	c_color?: string,
	c_fonts?: C_fonts,
	c_template?: C_template,
	c_professionalEvents?: C_professionalEvents[],
	c_relatedBlogs?: c_relatedBlogs[],
	c_teamMembers?: C_teamMembers[],
}

export interface Tasks {
	name?: string,
	description?: string,
	field?: string,
}

export interface C_taskGroups {
	name?: string,
	description?: string,
	tasks?: Tasks[],
	shouldScore?: boolean,
}

export interface SiteEntity {
	name?: string,
	richTextDescriptionV2?: RichTextV2,
	c_taskGroups?: C_taskGroups[],
	c_dashboardCompletionLabel?: string,
	c_dashboardCompletionDescription?: string,
	c_termsAndConditions?: RichTextV2,
}
